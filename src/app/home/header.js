

// import React, { Suspense, useState, useEffect } from "react";
import Date from "../components/date";
import SpotifyWrapper from "../components/spotifywrapper";
// import action from "../components/actions";

export default function Header() {

  return (
    <section className="w-full top-0 left-0 border-b border-white">
      <Date />
      <SpotifyWrapper />
    </section>
  );
}
