'use client';

import type { Decoration, DecorationCategory } from '@/lib/types';
import DecorationItem from '@/components/decorate/DecorationItem';

interface DecorationShopProps {
  decorations: Decoration[];
  onPurchase: (id: string) => void;
  availableStars: number;
}

const CATEGORY_INFO: Record<DecorationCategory, { label: string; emoji: string }> = {
  treehouse: { label: 'Treehouse', emoji: '🏠' },
  garden: { label: 'Garden', emoji: '🌻' },
  animals: { label: 'Animals', emoji: '🐾' },
};

const CATEGORY_ORDER: DecorationCategory[] = ['treehouse', 'garden', 'animals'];

export default function DecorationShop({
  decorations,
  onPurchase,
  availableStars,
}: DecorationShopProps) {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    info: CATEGORY_INFO[category],
    items: decorations.filter((d) => d.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col gap-6">
      {grouped.map((group) => (
        <section key={group.category}>
          <h2 className="mb-3 font-display text-xl font-bold text-bark">
            {group.info.emoji} {group.info.label}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {group.items.map((decoration) => (
              <DecorationItem
                key={decoration.id}
                decoration={decoration}
                onPurchase={onPurchase}
                canAfford={availableStars >= decoration.cost}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
