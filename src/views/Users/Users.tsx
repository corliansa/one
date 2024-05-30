import { type NextPage } from "next";
import Head from "next/head";
import { Base, Protected } from "../../Components";
import { trpc } from "../../utils/trpc";
// import { Filter } from "./FilterMenu";
// import { UserCard } from "./UserCard";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import type { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ClimbingBoxLoader } from "react-spinners";

export const Users: NextPage = () => {
  const { data: session } = useSession();
  const { data: users, isLoading } = trpc.user.getUsers.useQuery();
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    // { field: "role", headerName: "Role", width: 100 },
    { field: "occupation", headerName: "Status Pendidikan", width: 100 },
    { field: "location", headerName: "Domisili", width: 150 },
    { field: "address", headerName: "Alamat", width: 200 },
    { field: "zipCode", headerName: "Kode Pos", width: 100 },

    { field: "bundesland", headerName: "Negara Bagian", width: 150 },
    { field: "ppicabang", headerName: "PPI Cabang", width: 200 },
    { field: "fieldOfStudy", headerName: "Field Of Study", width: 200 },
    { field: "verification", headerName: "Verified", width: 100 },
    {
      field: "studySpecialization",
      headerName: "Study Specialization",
      width: 200,
    },
    {
      field: "updatedAt",
      headerName: "Last Updated",
      width: 200,
    },
  ];

  // grid row params type (refer docs)
  // MUI https://mui.com/x/react-data-grid/row-selection/
  // https://mui.com/x/react-data-grid/events/
  const handleRowClick = (row: GridRowParams) => {
    if (session?.user?.role === "ADMIN") {
      router.push(`/users/${row.id}`);
    } else {
    }
  };

  return (
    <>
      <Head>
        <title>ONE | Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Data Sensus">
        <div className="py-4">
          <Protected roles={["ADMIN"]} redirectTo="/dashboard">
            {/* <Filter /> */}
            {isLoading ? (
              <div className="flex h-1/2 items-center justify-center">
                <p>Fetching users...</p>
                <ClimbingBoxLoader />
              </div>
            ) : users ? (
              <div className="flex min-h-screen flex-col">
                <DataGrid
                  rows={users}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 20,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  onRowClick={handleRowClick}
                  slots={{
                    toolbar: GridToolbar,
                  }}
                />
              </div>
            ) : (
              <p>User Not Found</p>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};
