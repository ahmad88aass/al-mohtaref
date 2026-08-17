import { Star } from 'lucide-react';

export function Rating({
  value,
  reviews,
  size = 'sm',
}: {
  value: number;
  reviews?: number;
  size?: 'xs' | 'sm' | 'md';
}) {
  const star = size === 'xs' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const text = size === 'xs' ? 'text-[10px]' : size === 'md' ? 'text-sm' : 'text-xs';
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.min(Math.max(value - (i - 1), 0), 1);
          return (
            <span key={i} className="relative inline-block" style={{ width: '1em', height: '1em' }}>
              <Star className={`${star} text-slate-600 absolute inset-0`} />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className={`${star} text-amber-400 fill-amber-400`} />
              </span>
            </span>
          );
        })}
      </div>
      <span className={`${text} font-semibold text-amber-300 tabular-nums`}>
        {value.toFixed(1)}
      </span>
      {reviews !== undefined && (
        <span className={`${text} text-slate-500`}>({reviews.toLocaleString('en-US')})</span>
      )}
    </div>
  );
}
