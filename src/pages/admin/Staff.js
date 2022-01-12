import { useContext, useState } from "react";
import { TrContext } from "../../contexts/TranslationContext";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function Staff() {
  const { t } = useContext(TrContext);

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 130,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 140,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
    },
  ];

  const users = [
    { id: 1, lastName: "Snow", firstName: "Jon", role: "waiter" },
    { id: 2, lastName: "Lannister", firstName: "Cersei", role: "cashier" },
    { id: 3, lastName: "Lannister", firstName: "Jaime", role: "waiter" },
    { id: 4, lastName: "Stark", firstName: "Arya", role: "cashier" },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", role: "barman" },
    { id: 6, lastName: "Melisandre", firstName: "John", role: "waiter" },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", role: "cashier" },
    { id: 8, lastName: "Frances", firstName: "Rossini", role: "waiter" },
    { id: 9, lastName: "Roxie", firstName: "Harvey", role: "cashier" },
  ];

  return (
    <div
      style={{
        height: 450,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[6]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={(params) => console.log(params)}
        sx={{
          color: "#B3B3B3",
          svg: { color: "#B3B3B3" },
          maxWidth: "500px",
          "& p": { color: "#B3B3B3" },
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}
