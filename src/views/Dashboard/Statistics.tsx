import CountUp from "react-countup";

type StatisticOutput = {
  stats: {
    name: string;
    count: number | undefined;
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
          className="flex flex-col items-center justify-center rounded-lg bg-white/20 p-4 text-center"
        >
          <div className="text-xl font-bold">{stat.name}</div>
          <div className="text-4xl font-bold">
            <CountUp end={stat.count ?? 0} duration={2} />
          </div>
        </div>
      ))}
    </div>
  );
};
