import React, { Suspense } from "react";
import Date from "../components/date";

export default function Header() {
  return (
    <section className="w-full top-0 left-0 border-b border-white">
      <Suspense fallback={<div>Loading...</div>}>
        <Date />
      </Suspense>
    </section>
  );
}
