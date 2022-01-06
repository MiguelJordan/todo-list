import { useContext, useState } from "react";
import { TrContext } from "../../contexts/TranslationContext";
import { AuthContext } from "../../contexts/AuthContext";

import { Button, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  inputText: {
    color: "black",
  },
});

export default function AddStaff() {
  const { t } = useContext(TrContext);
  const { user } = useContext(AuthContext);

  const classes = useStyles();

  const [error, setError] = useState("");

  const [personInfo, setPersonInfo] = useState({
    firstName: "",
    lastName: "",
    role: "",
    companyCode: user.company.code,
    email: "",
    tel: "",
    unitCode: user.workUnit.code,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !personInfo.email ||
      !personInfo.firstName ||
      !personInfo.lastName ||
      !personInfo.role ||
      !personInfo.tel
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
        margin: "auto",
        position: "relative",
        top: "25%",
      }}
    >
      {/* <h1 className="center">{t("Add Staff Page")}</h1> */}

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
        <h2 style={{ color: "#001D42", marginTop: "10px" }}>
          Ajouter Un Personel
        </h2>
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
          inputProps={{
            className: classes.inputText,
          }}
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
          inputProps={{
            className: classes.inputText,
          }}
          fullWidth
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
          inputProps={{
            className: classes.inputText,
          }}
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
          inputProps={{
            className: classes.inputText,
          }}
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
          type="email"
          inputProps={{
            className: classes.inputText,
          }}
          fullWidth
          label="Email"
          name="email"
          onChange={(e) =>
            setPersonInfo({
              ...personInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          required
        />

        <Button variant="contained" type="submit" style={{ marginTop: "15px" }}>
          Ajouter
        </Button>
      </form>
    </div>
  );
}
