"use client";

import { useCart } from "@/components/cart/CartProvider";

interface Props {
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function NewsletterForm({
  className = "news",
  placeholder = "Join the newsletter",
  style,
}: Props) {
  const { toast } = useCart();
  return (
    <form
      className={className}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
        toast("You're on the list — welcome to the club");
      }}
    >
      <input type="email" placeholder={placeholder} required aria-label="Email address" />
      <button type="submit">Join</button>
    </form>
  );
}
