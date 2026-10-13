import type { Statistic } from '@/types';

/** Big green number + label, as in the About section. Render inside a <dl>. */
export function StatisticCard({ value, label }: Statistic) {
  return (
    // Label comes first in the DOM (valid <dl> order) but is shown below the number.
    <div className="flex min-w-0 flex-col-reverse">
      <dt className="mt-2 text-[0.8125rem] leading-snug sm:text-sm">{label}</dt>
      <dd className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-none font-bold text-primary-700">{value}</dd>
    </div>
  );
}
