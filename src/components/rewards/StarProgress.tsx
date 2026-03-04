'use client';

interface StarProgressProps {
  totalStars: number;
  nextMilestone: number;
  label: string;
}

export default function StarProgress({
  totalStars,
  nextMilestone,
  label,
}: StarProgressProps) {
  const percentage = Math.min((totalStars / nextMilestone) * 100, 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-6 overflow-hidden rounded-full bg-bark/10">
        <div
          className="h-full rounded-full bg-star transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="font-body text-sm text-bark-light">
        {totalStars}/{nextMilestone} &mdash; {label}
      </p>
    </div>
  );
}
