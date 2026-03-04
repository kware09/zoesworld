'use client';

import TreehouseScene from '@/components/home/TreehouseScene';
import HomeMenuButton from '@/components/home/HomeMenuButton';
import HiddenAccessTrigger from '@/components/parent/HiddenAccessTrigger';
import StarCounter from '@/components/layout/StarCounter';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-cream px-4 pb-8">
      {/* Treehouse illustration */}
      <TreehouseScene />

      {/* Title */}
      <h1 className="mt-4 font-display text-4xl font-bold text-bark md:text-5xl">
        Zoe&apos;s World
      </h1>

      {/* Star counter status bar */}
      <div className="mt-3">
        <StarCounter />
      </div>

      {/* Menu buttons */}
      <div className="mt-6 flex w-full flex-col items-center gap-4">
        <HomeMenuButton
          label="Play a Game"
          emoji="🎮"
          href="/games"
          colorClass="bg-sky-light"
        />
        <HomeMenuButton
          label="Decorate My World"
          emoji="🎨"
          href="/decorate"
          colorClass="bg-meadow-light"
        />
        <HomeMenuButton
          label="My Rewards"
          emoji="⭐"
          href="/rewards"
          colorClass="bg-sunset-light"
        />
      </div>

      {/* Hidden parent access trigger */}
      <HiddenAccessTrigger />
    </main>
  );
}
