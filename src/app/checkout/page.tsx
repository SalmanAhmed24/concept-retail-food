"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, formatMoney } from "@/lib/CartContext";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  const set =
    (key: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map(({ id, qty }) => ({ id, qty })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        // Stripe-hosted payment page (or demo success page)
        window.location.assign(data.url);
      } else {
        router.push("/checkout/success");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="checkout">
      <div className="checkout__head">
        <p className="checkout__kicker">Verdale · Harvest 2025</p>
        <h1>
          Check<em>out</em>
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="checkout__empty">
          <p>Your cart is empty — the shop is a scroll away.</p>
          <Link className="checkout__back" href="/#shop">
            Back to the shop
          </Link>
        </div>
      ) : (
        <div className="checkout__grid">
          <form className="checkout__form" onSubmit={handleSubmit}>
            <label>
              Your name
              <input
                required
                value={form.name}
                onChange={set("name")}
                placeholder="Alexis Papadopoulos"
              />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Delivery notes (optional)
              <textarea
                rows={3}
                value={form.notes}
                onChange={set("notes")}
                placeholder="Leave with the neighbor if we're out."
              />
            </label>

            {status === "error" && (
              <p className="checkout__error" role="alert">
                {error}
              </p>
            )}

            <button className="checkout__pay" disabled={status === "submitting"}>
              {status === "submitting"
                ? "Taking you to payment…"
                : `Pay ${formatMoney(subtotal)}`}
            </button>
            <p className="checkout__secure">Secured by Stripe Checkout</p>
          </form>

          <aside className="checkout__summary" aria-label="Order summary">
            <h2>Your order</h2>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>{formatMoney(item.amount * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout__total">
              <span>Total</span>
              <strong>{formatMoney(subtotal)}</strong>
            </div>
            <Link href="/#shop" className="checkout__edit">
              ← Keep shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
