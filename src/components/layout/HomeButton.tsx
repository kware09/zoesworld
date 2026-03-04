'use client';

import Link from 'next/link';

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 rounded-full bg-sunset-light px-4 py-2 font-display text-bark shadow-soft transition-transform hover:scale-105 active:scale-95"
      style={{ minWidth: 48, minHeight: 48 }}
    >
      <span className="text-xl" aria-hidden="true">
        🏠
      </span>
      <span className="text-sm font-semibold">Home</span>
    </Link>
  );
}
