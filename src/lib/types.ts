export interface Product {
  id: string;
  cat: string;
  name: string;
  price: number;
  was: number | null;
  tag: string | null;
  blurb: string;
  makes: string;
  time: string;
  level: string;
  includes: string[];
}

export interface CartLine {
  id: string;
  qty: number;
}
