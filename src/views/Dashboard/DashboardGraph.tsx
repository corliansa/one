import { useState } from "react";
import { Button } from "evergreen-ui";

// recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Stat {
  ppiCabangStats:
    | {
        label: string;
        value: string;
        count: number;
      }[]
    | undefined;
}

export const DashboardGraph: React.FC<Stat> = ({ ppiCabangStats }: Stat) => {
  const [showAll, setShowAll] = useState(false);
  const displayedStats = showAll ? ppiCabangStats : ppiCabangStats?.slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center">
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={displayedStats}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" barSize={50} fill="#8CB9BD" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center">
        <Button appearance="default" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
};
