import { useMemo } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { Base, Card, Protected } from "../../Components";
import { trpc } from "../../utils/trpc";
import { PPICabangGraph } from "./PPICabangGraph";
import { GeoVis } from "./Geovis";
import { UserStatistics } from "./Statistics";

export const Dashboard: NextPage = () => {
  const { data } = trpc.internal.getStatistics.useQuery();
  const { data: ppiCabangStats } = trpc.internal.getPPICabangStats.useQuery();

  const stats = [
    { name: "Total Pengguna", count: data?.users },
    { name: "Pengguna Terverifikasi", count: data?.verified },
    { name: "Belum Terverifikasi", count: data?.unverified },
    // { name: "rejectedUsers", count: data?.[3]  },
    // { name: "activeUsers", count: data?.[4]  },
    // { name: "inactiveUsers", count: data?.[5]  },
    { name: "Info belum lengkap", count: data?.updated },
    { name: "Ausbildung / Vokasi", count: data?.vocation },
    { name: "Bachelor / S1", count: data?.bachelor },
    { name: "Master / S2", count: data?.master },
    { name: "PhD / S3", count: data?.doctorand },
    { name: "Profesor", count: data?.professor },
    { name: "Laki-laki", count: data?.male },
    { name: "Perempuan", count: data?.female },
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
              <Protected roles={["ADMIN"]}>
                <Card className="">
                  <UserStatistics stats={stats} />
                </Card>
              </Protected>
              <Card>
                <PPICabangGraph ppiCabangStats={ppiCabangStats} />
              </Card>
            </div>
            <Card className="flex flex-col items-center">
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
