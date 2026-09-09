"use client";

import Link from "next/link";
import { byId, rs } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { cart, subtotal, isOpen, closeCart, changeQty, remove } = useCart();

  return (
    <>
      <div
        className={"scrim" + (isOpen ? " open" : "")}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside className={"cart-drawer" + (isOpen ? " open" : "")} aria-label="Shopping bag">
        <div className="cart-head">
          <h3>Your Bag</h3>
          <button className="cart-close" onClick={closeCart} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="cart-items" id="cartItems">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="script">Nothing here yet</span>
              <p className="muted">Your bag is empty. Find a craft you love.</p>
              <Link href="/shop" className="btn btn-ghost" onClick={closeCart}>
                Shop kits
              </Link>
            </div>
          ) : (
            cart.map((i) => {
              const p = byId(i.id);
              if (!p) return null;
              return (
                <div className="ci" key={p.id} data-id={p.id}>
                  <div className="ph">
                    <span>{p.cat}</span>
                  </div>
                  <div>
                    <div className="ci-cat">{p.cat}</div>
                    <div className="ci-name">{p.name}</div>
                    <div className="qty">
                      <button onClick={() => changeQty(p.id, -1)} aria-label="Decrease">
                        &minus;
                      </button>
                      <span>{i.qty}</span>
                      <button onClick={() => changeQty(p.id, 1)} aria-label="Increase">
                        +
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="ci-price">{rs(p.price * i.qty)}</div>
                    <button className="ci-remove" onClick={() => remove(p.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-foot" id="cartFoot">
            <div className="cart-sub">
              <span>Subtotal</span>
              <span className="amt">{rs(subtotal)}</span>
            </div>
            <p className="cart-note">
              Shipping &amp; taxes calculated at checkout. Free delivery over Rs. 5,000.
            </p>
            <Link href="/checkout" className="btn btn-primary btn-block" onClick={closeCart}>
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
