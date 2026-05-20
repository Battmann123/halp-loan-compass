import type { LucideIcon } from "lucide-react";

export interface GuideStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface GuideStatsBarProps {
  stats: GuideStat[];
}

/**
 * A horizontal strip of 3–4 stat tiles with icons. Used near the top of
 * guide pages to break up dense text with a quick visual summary.
 */
const GuideStatsBar = ({ stats }: GuideStatsBarProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-2">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={i}
            className="rounded-xl border bg-gradient-to-br from-primary/5 to-accent/5 p-4 flex flex-col items-start gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground leading-tight">
              {s.value}
            </div>
            <div className="text-xs text-muted-foreground leading-snug">
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GuideStatsBar;
