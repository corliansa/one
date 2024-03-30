import { useMemo } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { Base, Card, Protected } from "../../Components";

import { capitalize } from "../../utils/capitalize";
import { trpc } from "../../utils/trpc";
import { PPICabangGraph } from "./PPICabangGraph";
import { GeoVis } from "./Geovis";

export const Dashboard: NextPage = () => {
  const { data } = trpc.internal.getStatistics.useQuery();
  const { data: ppiCabangStats } = trpc.internal.getPPICabangStats.useQuery();

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

  //TODO: Add more visualizations for the dashboard.

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
          <div className="mt-4 flex w-full flex-col gap-10 lg:flex-row">
            <div className="flex flex-col gap-6">
              <Card className="">
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
              <Card>
                <PPICabangGraph ppiCabangStats={ppiCabangStats} />
              </Card>
            </div>
            <Card className="">
              <h1 className="mb-5 text-2xl font-semibold">
                Demografi Mahasiswa Indonesia di Jerman
              </h1>
              <GeoVis width="100%" />
            </Card>
          </div>
        </Protected>
      </Base>
    </>
  );
};
