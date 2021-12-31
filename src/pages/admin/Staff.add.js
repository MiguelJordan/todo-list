import { useContext, useState } from "react";
import { TrContext } from "../../contexts/TranslationContext";

import { Button, Typography } from "@mui/material";
import { TextField } from "@material-ui/core";

export default function Drinks() {
  const { t } = useContext(TrContext);

  const [error, setError] = useState("");

  const [personInfo, setPersonInfo] = useState({
    firstName: "",
    lastName: "",
    role: "",
    workUnit: [],
    email: "",
    tel: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !personInfo.email ||
      !personInfo.firstName ||
      !personInfo.lastName ||
      !personInfo.role ||
      !personInfo.tel ||
      !personInfo.workUnit
    )
      return setError("Invalid Value(s)");
    setError("");
    console.log(personInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "500px",
        backgroundColor: "#FFFFFF",
        minWidth: "330px",
        borderRadius: "3px",
      }}
    >
      {/* <h1 className="center">{t("Add Staff Page")}</h1> */}
      <Typography style={{ color: "#001D42", marginTop: "15px" }}>
        Ajouter Un Personel
      </Typography>
      <form
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          margin: "15px",
          color: "#B3B3B3",
          width: "70%",
        }}
        onSubmit={handleSubmit}
      >
        {error !== "" && (
          <div
            style={{
              border: "2px solid red",
              color: "#001D42",
              margin: "5px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {error}
          </div>
        )}

        <TextField
          type="text"
          variant="standard"
          name="firstName"
          fullWidth
          label="First Name"
          style={{ color: "#B3B3B3" }}
          onChange={(e) =>
            setPersonInfo({
              ...personInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          required
        />
        <TextField
          type="text"
          variant="standard"
          name="lastName"
          fullWidth
          color=""
          label="Last Name"
          style={{ color: "#B3B3B3" }}
          onChange={(e) =>
            setPersonInfo({
              ...personInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          required
        />
        <TextField
          fullWidth
          type="number"
          name="tel"
          variant="standard"
          style={{ color: "#B3B3B3" }}
          onChange={(e) =>
            setPersonInfo({
              ...personInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Tel"
          required
        />
        <TextField
          type="text"
          variant="standard"
          fullWidth
          label="role"
          name="role"
          onChange={(e) =>
            setPersonInfo({
              ...personInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          style={{ color: "#B3B3B3" }}
          required
        />
        <TextField
          variant="standard"
          fullWidth
          label="Post"
          name="workUnit"
          onChange={(e) =>
            setPersonInfo({
              ...personInfo,
              [e.target.name]: [...personInfo.workUnit, e.target.value.trim()],
            })
          }
          style={{ color: "#B3B3B3" }}
          required
        />
        <TextField
          variant="standard"
          type="email"
          fullWidth
          label="Email"
          name="email"
          onChange={(e) =>
            setPersonInfo({
              ...personInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          style={{ color: "#B3B3B3" }}
          required
        />

        <Button variant="contained" type="submit" style={{ marginTop: "15px" }}>
          Ajouter
        </Button>
      </form>
    </div>
  );
}
