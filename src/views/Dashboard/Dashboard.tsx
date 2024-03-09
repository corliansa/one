import { useState, useMemo } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { Base, Card, Protected } from "../../Components";

// recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { capitalize } from "../../utils/capitalize";
import { trpc } from "../../utils/trpc";

export const Dashboard: NextPage = () => {
  const { data } = trpc.internal.getStatistics.useQuery();
  const { data: ppiCabangStats } = trpc.internal.getPPICabangStats.useQuery();
  const [showAll, setShowAll] = useState(false);
  const stats = [
    { name: "users", count: data?.[0] ?? 0 },
    { name: "verifiedUsers", count: data?.[1] ?? 0 },
    { name: "unverifiedUsers", count: data?.[2] ?? 0 },
    { name: "rejectedUsers", count: data?.[3] ?? 0 },
    { name: "activeUsers", count: data?.[4] ?? 0 },
    { name: "inactiveUsers", count: data?.[5] ?? 0 },
  ];

  useMemo(() => {
    return ppiCabangStats?.sort((a, b) => b.count - a.count);
  }, [ppiCabangStats]);

  const displayedStats = showAll ? ppiCabangStats : ppiCabangStats?.slice(0, 5);

  return (
    <>
      <Head>
        <title>ONE | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Dashboard">
        <Protected verification="UNVERIFIED">
          {/* added a warning verification if user is unverified */}
        </Protected>
        <Protected redirectTo="/">
          <Card className="mt-4">
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
          </Card>

          <div className="flex flex-col items-center justify-center">
            <div className="h-full">
              <ResponsiveContainer height={400}>
                <BarChart data={displayedStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" angle={-45} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="mt-4 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          </div>
        </Protected>
      </Base>
    </>
  );
};
