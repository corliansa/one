import { useContext, useMemo } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { Base, Card, Protected } from "../../Components";
import { trpc } from "../../utils/trpc";
import { PPICabangGraph } from "./PPICabangGraph";
import { GeoVis } from "./Geovis";
import { UserStatistics } from "./Statistics";
import { FederalStateContext } from "./FederalStateContext";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export const Dashboard: NextPage = () => {
  const federalState = useContext(FederalStateContext);
  const { data } = trpc.internal.getStatistics.useQuery({
    bundesland: federalState,
  });
  const { data: ppiCabangStats } = trpc.internal.getPPICabangStats.useQuery();

  const statsAdmin = [
    { name: "Total Pengguna", count: data?.users },
    { name: "Pengguna Terverifikasi", count: data?.verified },
    { name: "Belum Terverifikasi", count: data?.unverified },
    { name: "Info belum lengkap", count: data?.updated },
  ];
  const stats = [
    { name: "Ausbildung / Vokasi", count: data?.vocation },
    { name: "Bachelor / S1", count: data?.bachelor },
    { name: "Master / S2", count: data?.master },
    { name: "PhD / S3", count: data?.doctorand },
    { name: "Profesor", count: data?.professor },
  ];

  const graphStats = [
    { name: "Laki-laki", value: data?.male, fill: "#0336FF" },
    { name: "Perempuan", value: data?.female, fill: "#FF0266" },
    { name: "Tidak disebut", value: data?.unspecified, fill: "gray" },
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
          <div className="mt-4 flex w-full flex-col gap-10 2xl:flex-row">
            <div className="flex flex-wrap justify-between gap-y-5 2xl:basis-2/3">
              <Protected roles={["ADMIN"]}>
                <Card className=" basis-full">
                  <UserStatistics stats={statsAdmin} />
                </Card>
                <Card className="flex basis-full md:basis-[300px]">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={graphStats}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          fill="#8884d8"
                          label
                        />
                        <Tooltip />
                        <Legend align="center" verticalAlign="bottom" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Protected>
              <Card className="basis-full md:basis-[calc(100%-320px)]">
                <UserStatistics stats={stats} />
              </Card>
              {!federalState && (
                <Card className="basis-full">
                  <PPICabangGraph ppiCabangStats={ppiCabangStats} />
                </Card>
              )}
            </div>
            <Card className="flex flex-col items-center 2xl:basis-1/3">
              <h1 className="mb-5 text-2xl font-semibold">
                {federalState ?? "Demografi Mahasiswa Indonesia di Jerman"}
              </h1>
              <GeoVis width="100%" />
            </Card>
          </div>
        </Protected>
      </Base>
    </>
  );
};
