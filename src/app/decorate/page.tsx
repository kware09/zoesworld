'use client';

import { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useWorld } from '@/context/WorldContext';
import HomeButton from '@/components/layout/HomeButton';
import StarCounter from '@/components/layout/StarCounter';
import PageTransition from '@/components/layout/PageTransition';
import DecorationShop from '@/components/decorate/DecorationShop';

export default function DecoratePage() {
  const { availableStars } = useGame();
  const { decorations, purchaseDecoration, lockedDecorations } = useWorld();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  function handlePurchase(id: string) {
    const decoration = decorations.find((d) => d.id === id);
    if (!decoration) return;

    const success = purchaseDecoration(id);
    if (success) {
      setToast(`You unlocked ${decoration.name}!`);
    }
  }

  const allUnlocked = lockedDecorations.length === 0;

  return (
    <PageTransition>
      <main className="min-h-screen bg-cream p-4 pb-12">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <HomeButton />
          <h1 className="font-display text-2xl font-bold text-bark">
            Decorate My World
          </h1>
          <StarCounter />
        </header>

        {/* Toast */}
        {toast && (
          <div className="animate-slide-up mb-4 rounded-2xl bg-meadow-light p-3 text-center font-body font-semibold text-bark shadow-soft">
            {toast}
          </div>
        )}

        {/* Content */}
        {allUnlocked ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <span className="text-6xl">🎉</span>
            <p className="font-display text-xl font-bold text-bark">
              You&apos;ve unlocked everything!
            </p>
          </div>
        ) : (
          <DecorationShop
            decorations={decorations}
            onPurchase={handlePurchase}
            availableStars={availableStars}
          />
        )}
      </main>
    </PageTransition>
  );
}
