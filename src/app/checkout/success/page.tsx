"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/CartContext";

function SuccessContent() {
  const { clearCart } = useCart();
  const params = useSearchParams();
  const isDemo = params.get("demo") === "1";
  const total = params.get("total");

  // Payment finished — empty the cart
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="success">
      <p className="checkout__kicker">Verdale · Harvest 2025</p>
      <h1>
        Order <em>confirmed</em>
      </h1>
      <p className="success__copy">
        Efcharistó. A confirmation email is on its way, and your order ships with the
        next weekly dispatch from the estate. Unfiltered means a little sediment —
        that&apos;s the point.
      </p>
      {isDemo && (
        <p className="success__demo">
          Demo mode: no payment was actually taken{total ? ` (order total $${total})` : ""}.
          Set <code>STRIPE_SECRET_KEY</code> to enable real payments.
        </p>
      )}
      <div className="success__links">
        <Link className="checkout__back" href="/">
          Concept 01
        </Link>
        <Link className="checkout__back" href="/v2">
          Concept 02
        </Link>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
