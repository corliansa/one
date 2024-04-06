import { capitalize } from "../../utils/capitalize";

type StatisticOutput = {
  stats: {
    name: string;
    count: number;
  }[];
};

export const UserStatistics: React.FC<StatisticOutput> = ({
  stats,
}: StatisticOutput) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-col items-center justify-center rounded-lg bg-white/20 p-4"
        >
          <div className="text-xl font-bold">
            {capitalize(stat.name).replace(/(users)/, " $1")}
          </div>
          <div className="text-4xl font-bold">{stat.count}</div>
        </div>
      ))}
    </div>
  );
};
