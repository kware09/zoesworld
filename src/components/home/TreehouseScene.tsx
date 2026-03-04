'use client';

export default function TreehouseScene() {
  return (
    <div className="relative mx-auto h-[200px] w-full max-w-md overflow-hidden md:h-[300px]">
      {/* Sky background */}
      <div className="absolute inset-0 bg-sky-light rounded-b-3xl" />

      {/* Sun */}
      <div className="absolute top-4 right-6 h-12 w-12 rounded-full bg-star shadow-[0_0_20px_var(--color-star-glow)] md:h-16 md:w-16" />

      {/* Clouds */}
      <div className="absolute top-6 left-8 animate-float">
        <div className="flex">
          <div className="h-4 w-8 rounded-full bg-white" />
          <div className="-ml-2 h-6 w-10 rounded-full bg-white" />
          <div className="-ml-2 h-4 w-8 rounded-full bg-white" />
        </div>
      </div>
      <div
        className="absolute top-10 left-[60%] animate-float"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="flex">
          <div className="h-3 w-6 rounded-full bg-white" />
          <div className="-ml-1.5 h-5 w-8 rounded-full bg-white" />
          <div className="-ml-1.5 h-3 w-6 rounded-full bg-white" />
        </div>
      </div>

      {/* Tree trunk */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 bg-bark rounded-sm md:w-10"
        style={{ height: '45%' }}
      />

      {/* Tree branches (left and right) */}
      <div className="absolute bottom-[45%] left-1/2 -translate-x-[130%] w-12 h-2 bg-bark-light rounded-full -rotate-12 md:w-16" />
      <div className="absolute bottom-[45%] left-1/2 translate-x-[30%] w-12 h-2 bg-bark-light rounded-full rotate-12 md:w-16" />

      {/* Treehouse platform */}
      <div className="absolute bottom-[42%] left-1/2 -translate-x-1/2 w-40 h-3 bg-sunset-dark rounded-lg shadow-soft md:w-52 md:h-4" />

      {/* Treehouse body */}
      <div className="absolute bottom-[48%] left-1/2 -translate-x-1/2 w-32 h-16 bg-sunset rounded-xl md:w-44 md:h-20">
        {/* Windows */}
        <div className="flex items-center justify-center gap-4 h-full md:gap-6">
          <div className="h-4 w-4 rounded-sm bg-star/70 md:h-5 md:w-5" />
          <div className="h-5 w-4 rounded-t-full bg-bark-light md:h-6 md:w-5" />
          <div className="h-4 w-4 rounded-sm bg-star/70 md:h-5 md:w-5" />
        </div>
      </div>

      {/* Roof (larger on md) - hidden on mobile, shown on md */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-0 h-0 hidden md:block"
        style={{
          bottom: 'calc(48% + 80px)',
          borderLeft: '110px solid transparent',
          borderRight: '110px solid transparent',
          borderBottom: '50px solid var(--color-blossom)',
        }}
      />
      {/* Roof (smaller) - shown on mobile, hidden on md */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-0 h-0 block md:hidden"
        style={{
          bottom: 'calc(48% + 64px)',
          borderLeft: '80px solid transparent',
          borderRight: '80px solid transparent',
          borderBottom: '40px solid var(--color-blossom)',
        }}
      />

      {/* Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-meadow rounded-t-lg" />

      {/* Small flowers on grass */}
      <div className="absolute bottom-2 left-[15%] text-sm">🌸</div>
      <div className="absolute bottom-3 left-[30%] text-xs">🌼</div>
      <div className="absolute bottom-2 right-[20%] text-sm">🌸</div>
      <div className="absolute bottom-3 right-[35%] text-xs">🌼</div>

      {/* Placeholder for unlocked animals */}
      {/* Animals will be rendered here when unlocked */}
    </div>
  );
}
