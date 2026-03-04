'use client';

import Link from 'next/link';

interface HomeMenuButtonProps {
  label: string;
  emoji: string;
  href: string;
  colorClass: string;
}

export default function HomeMenuButton({
  label,
  emoji,
  href,
  colorClass,
}: HomeMenuButtonProps) {
  return (
    <Link
      href={href}
      className={`flex min-h-[80px] w-full max-w-sm items-center gap-4 rounded-2xl px-8 py-6 shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98] ${colorClass}`}
    >
      <span className="text-3xl" aria-hidden="true">
        {emoji}
      </span>
      <span className="font-display text-xl font-semibold text-bark">
        {label}
      </span>
    </Link>
  );
}
