"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart, formatMoney } from "@/lib/CartContext";

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, setQty, removeItem } = useCart();

  // Close on Escape, lock scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? " is-open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
      >
        <div className="cart-drawer__head">
          <h2>
            Your <em>cart</em>
          </h2>
          <button
            className="cart-drawer__close"
            onClick={closeCart}
            type="button"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>
              Nothing here yet. The 2025 pressing
              <br />
              won&apos;t wait forever.
            </p>
            <button className="cart-drawer__browse" onClick={closeCart} type="button">
              Back to the shop
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li className="cart-line" key={item.id}>
                  <div className="cart-line__info">
                    <h3>{item.name}</h3>
                    <p className="cart-line__unit">{item.price}</p>
                    <div className="cart-line__qty" aria-label={`Quantity of ${item.name}`}>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-line__end">
                    <span className="cart-line__total">
                      {formatMoney(item.amount * item.qty)}
                    </span>
                    <button
                      type="button"
                      className="cart-line__remove"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-drawer__foot">
              <div className="cart-drawer__subtotal">
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal)}</strong>
              </div>
              <p className="cart-drawer__note">Ships worldwide, weekly · from the estate</p>
              <Link className="cart-drawer__checkout" href="/checkout" onClick={closeCart}>
                Proceed to checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
