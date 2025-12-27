import React from "react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-3 cursor-pointer group">
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          className="transition-transform group-hover:scale-110"
        >
          <circle cx="50" cy="50" r="40" fill="#ff6b6b" />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
          >
            PM
          </text>
        </svg>
        <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text">
          PolloMundo
        </span>
      </div>
    </Link>
  );
}
