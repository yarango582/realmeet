import React from "react";
import CreateRoom from "./create-room";

export default function Hero() {
  return (
    <div className="p-4 py-32 text-center hero">
      <h1 className="mb-8 text-5xl sm:text-6xl font-extrabold tracking-tight">
        Realmeet
      </h1>
      <h2 className="mb-24 text-slate-300 text-2xl sm:text-3xl font-extrabold tracking-tight">
        <div className="inline-block">
          Meetings, multiple languages and more{" "}
        </div>
        &nbsp;
      </h2>
      <CreateRoom />
      <div></div>
    </div>
  );
}
