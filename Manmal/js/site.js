/* ============================================================
   THE MANMAL CLUB — site behaviour
   Cart (localStorage) + drawer, mobile nav, toast, scroll reveal.
   Loaded on every page after products.js.
   ============================================================ */
(function(){
  "use strict";
  var KEY="manmal_cart_v1";
  var PRODUCTS=window.MANMAL_PRODUCTS||[];

  /* ---------- helpers ---------- */
  function rs(n){return "Rs. "+Number(n).toLocaleString("en-PK");}
  window.MANMAL_rs=rs;
  function byId(id){return PRODUCTS.find(function(p){return p.id===id;});}
  window.MANMAL_byId=byId;

  // product card markup (shared by home + shop)
  function cardHTML(p){
    var price='<span class="card-price">'+(p.was?'<span class="was">'+rs(p.was)+'</span>':'')+rs(p.price)+'</span>';
    return '<article class="card reveal">'+
      '<a href="product.html?id='+p.id+'" aria-label="'+p.name+'">'+
        '<div class="card-img">'+(p.tag?'<span class="card-tag">'+p.tag+'</span>':'')+
          '<div class="ph"><span>'+p.cat+'</span></div>'+
          '<span class="quick" data-add="'+p.id+'">Add to bag</span>'+
        '</div>'+
        '<div class="card-body">'+
          '<div class="card-cat">'+p.cat+'</div>'+
          '<h3 class="card-name">'+p.name+'</h3>'+price+
        '</div>'+
      '</a></article>';
  }
  window.MANMAL_cardHTML=cardHTML;

  function load(){
    try{return JSON.parse(localStorage.getItem(KEY))||[];}catch(e){return [];}
  }
  function save(c){localStorage.setItem(KEY,JSON.stringify(c));}
  var cart=load();

  function count(){return cart.reduce(function(a,i){return a+i.qty;},0);}
  function subtotal(){
    return cart.reduce(function(a,i){var p=byId(i.id);return a+(p?p.price*i.qty:0);},0);
  }

  /* ---------- shared chrome injection ---------- */
  function injectChrome(){
    if(document.getElementById("manmal-chrome"))return;
    var d=document.createElement("div");
    d.id="manmal-chrome";
    d.innerHTML=
      '<div class="scrim" data-cart-close></div>'+
      '<aside class="cart-drawer" aria-label="Shopping bag">'+
        '<div class="cart-head"><h3>Your Bag</h3><button class="cart-close" data-cart-close aria-label="Close">&times;</button></div>'+
        '<div class="cart-items" id="cartItems"></div>'+
        '<div class="cart-foot" id="cartFoot" hidden>'+
          '<div class="cart-sub"><span>Subtotal</span><span class="amt" id="cartSub">Rs. 0</span></div>'+
          '<p class="cart-note">Shipping &amp; taxes calculated at checkout. Free delivery over Rs. 5,000.</p>'+
          '<button class="btn btn-primary btn-block" id="checkoutBtn">Checkout</button>'+
        '</div>'+
      '</aside>'+
      '<div class="toast" id="toast"><span class="dot"></span><span id="toastMsg"></span></div>';
    document.body.appendChild(d);
    d.querySelectorAll("[data-cart-close]").forEach(function(el){
      el.addEventListener("click",closeCart);
    });
    document.getElementById("checkoutBtn").addEventListener("click",function(){
      toast("Checkout is a demo — connect a payment provider to go live");
    });
  }

  /* ---------- render ---------- */
  function render(){
    // badges
    document.querySelectorAll(".cart-count").forEach(function(b){
      b.textContent=count();
      b.classList.toggle("show",count()>0);
    });
    var items=document.getElementById("cartItems");
    var foot=document.getElementById("cartFoot");
    if(!items)return;
    if(cart.length===0){
      items.innerHTML='<div class="cart-empty"><span class="script">Nothing here yet</span>'+
        '<p class="muted">Your bag is empty. Find a craft you love.</p>'+
        '<a href="shop.html" class="btn btn-ghost">Shop kits</a></div>';
      foot.hidden=true;
      return;
    }
    foot.hidden=false;
    items.innerHTML=cart.map(function(i){
      var p=byId(i.id); if(!p)return "";
      return '<div class="ci" data-id="'+p.id+'">'+
        '<div class="ph"><span>'+p.cat+'</span></div>'+
        '<div><div class="ci-cat">'+p.cat+'</div>'+
          '<div class="ci-name">'+p.name+'</div>'+
          '<div class="qty"><button data-act="dec">&minus;</button><span>'+i.qty+'</span><button data-act="inc">+</button></div>'+
        '</div>'+
        '<div style="text-align:right"><div class="ci-price">'+rs(p.price*i.qty)+'</div>'+
          '<button class="ci-remove" data-act="rm">Remove</button></div>'+
      '</div>';
    }).join("");
    document.getElementById("cartSub").textContent=rs(subtotal());
    items.querySelectorAll(".ci").forEach(function(row){
      var id=row.getAttribute("data-id");
      row.querySelector('[data-act="inc"]').onclick=function(){changeQty(id,1);};
      row.querySelector('[data-act="dec"]').onclick=function(){changeQty(id,-1);};
      row.querySelector('[data-act="rm"]').onclick=function(){removeItem(id);};
    });
  }

  /* ---------- mutations ---------- */
  function add(id,qty){
    qty=qty||1;
    var line=cart.find(function(i){return i.id===id;});
    if(line)line.qty+=qty; else cart.push({id:id,qty:qty});
    save(cart);render();
    var p=byId(id);
    toast((p?p.name:"Item")+" added to bag");
    openCart();
  }
  function changeQty(id,delta){
    var line=cart.find(function(i){return i.id===id;});
    if(!line)return;
    line.qty+=delta;
    if(line.qty<=0)cart=cart.filter(function(i){return i.id!==id;});
    save(cart);render();
  }
  function removeItem(id){cart=cart.filter(function(i){return i.id!==id;});save(cart);render();}
  window.MANMAL_add=add;

  /* ---------- drawer ---------- */
  function openCart(){
    var dr=document.querySelector(".cart-drawer"),sc=document.querySelector(".scrim");
    if(dr)dr.classList.add("open");
    if(sc)sc.classList.add("open");
    document.body.style.overflow="hidden";
  }
  function closeCart(){
    var dr=document.querySelector(".cart-drawer"),sc=document.querySelector(".scrim");
    if(dr)dr.classList.remove("open");
    if(sc)sc.classList.remove("open");
    document.body.style.overflow="";
  }
  window.MANMAL_openCart=openCart;

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg){
    var t=document.getElementById("toast"),m=document.getElementById("toastMsg");
    if(!t)return;
    m.textContent=msg;t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer=setTimeout(function(){t.classList.remove("show");},2600);
  }
  window.MANMAL_toast=toast;

  /* ---------- mobile nav ---------- */
  function initMobileNav(){
    var burger=document.querySelector(".burger");
    var mnav=document.querySelector(".mobile-nav");
    if(!burger||!mnav)return;
    burger.addEventListener("click",function(){mnav.classList.add("open");document.body.style.overflow="hidden";});
    var close=mnav.querySelector(".mclose");
    if(close)close.addEventListener("click",function(){mnav.classList.remove("open");document.body.style.overflow="";});
    mnav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click",function(){mnav.classList.remove("open");document.body.style.overflow="";});
    });
  }

  /* ---------- cart triggers (delegated, works for dynamic cards) ---------- */
  function initCartTriggers(){
    document.addEventListener("click",function(e){
      var openEl=e.target.closest("[data-open-cart]");
      if(openEl){e.preventDefault();openCart();return;}
      var addEl=e.target.closest("[data-add]");
      if(addEl){
        e.preventDefault();e.stopPropagation();
        add(addEl.getAttribute("data-add"),parseInt(addEl.getAttribute("data-qty")||"1",10));
      }
    });
  }

  /* ---------- scroll reveal ---------- */
  function initReveal(){
    function reveal(el){
      el.classList.add("in");
      // safety: snap to final state in case the rendering clock is throttled
      setTimeout(function(){el.classList.add("lock");},760);
    }
    function checkNow(){
      var vh=window.innerHeight||document.documentElement.clientHeight;
      document.querySelectorAll(".reveal:not(.in)").forEach(function(el){
        var r=el.getBoundingClientRect();
        if(r.top<vh*0.94&&r.bottom>0)reveal(el);
      });
    }
    if("IntersectionObserver" in window){
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(en){if(en.isIntersecting){reveal(en.target);io.unobserve(en.target);}});
      },{threshold:0,rootMargin:"0px 0px -6% 0px"});
      document.querySelectorAll(".reveal:not(.in)").forEach(function(e){io.observe(e);});
    }
    // immediate + scroll fallback so above-fold content is never stuck hidden
    checkNow();
    window.addEventListener("scroll",checkNow,{passive:true});
    window.addEventListener("resize",checkNow);
    window.addEventListener("load",checkNow);
  }
  window.MANMAL_initReveal=initReveal;

  /* ---------- newsletter (demo) ---------- */
  function initForms(){
    document.querySelectorAll("[data-newsletter]").forEach(function(f){
      f.addEventListener("submit",function(e){
        e.preventDefault();
        f.reset();
        toast("You're on the list — welcome to the club");
      });
    });
  }

  /* ---------- escape closes drawer / nav ---------- */
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){
      closeCart();
      var mnav=document.querySelector(".mobile-nav.open");
      if(mnav){mnav.classList.remove("open");document.body.style.overflow="";}
    }
  });

  /* ---------- boot ---------- */
  function boot(){
    injectChrome();
    initMobileNav();
    initCartTriggers();
    initReveal();
    initForms();
    render();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);
  else boot();
})();
