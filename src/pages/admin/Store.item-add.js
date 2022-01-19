import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import ImageIcon from "@mui/icons-material/Image";
import { CameraAlt, PhotoCamera, DeleteRounded } from "@mui/icons-material";

//component
import Dropdown from "../../components/subComponents/Dropdown";

//context
import { TranslationContext } from "../../contexts/TranslationContext";
import { AuthContext } from "../../contexts/AuthContext";
import ImagePreview from "../../components/subComponents/ImagePreview";
import PopOver from "../../components/subComponents/PopOver";

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "black",
    width: "100px",
  },
  form: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    margin: "auto",
    maxWidth: "350px",

    padding: "20px",
    color: "#B3B3B3",
    borderRadius: "3px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "105px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "105px",
    },
  },
}));

export default function StoreAdd() {
  const { t } = useContext(TranslationContext);
  const { user } = useContext(AuthContext);

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState();

  const [item, setItem] = React.useState({
    name: "",
    family: "",
    category: "",
    cost: "",
    prices: [],
    imageUrl: "",
    commissionAmount: "",
    commissionRatio: "",
    companyCode: user.company.code,
    storeId: user.workUnit.storeId,
    quantity: "",
    MeasureUnitPlural: "",
    MeasureUnit: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!item.name) {
      setLoading(false);
      return setError("Invalid Name");
    }
    if (!item.family) {
      setLoading(false);
      return setError("Invalid Family");
    }
    if (!item.category) {
      setLoading(false);
      return setError("Invalid Category");
    }
    if (!item.cost) {
      setLoading(false);
      return setError("Invalid Cost Price");
    }
    if (!item.commissionAmount) {
      setLoading(false);
      return setError("Invalid commission Amount");
    }
    if (!item.commissionRatio) {
      setLoading(false);
      return setError("Invalid commission Ratio");
    }
    if (!item.MeasureUnitPlural) {
      setLoading(false);
      return setError("Invalid Measure Unit Plural");
    }
    if (!item.MeasureUnit) {
      setLoading(false);
      return setError("Invalid Measure Unit ");
    }
    if (!item.quantity || item.quantity < 0) {
      setLoading(false);
      return setError("Invalid Quantity");
    }

    setLoading(false);
    console.log(item);
  };

  const toBase64 = async (file) => {
    return new Promise((reslove, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => reslove(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const Photo = async (e) => {
    if (!e) return "";

    setError("");

    const extension = e.target.files[0].type.split("/");

    if (!["jpg", "png", "jpeg"].includes(extension[1]))
      return setError("Invalid Image Format");
    let base64 = await toBase64(e.target.files[0]);

    console.log(e);
    setImage(base64);
  };

  const RemoveImage = () => {
    setImage("");
  };

  const popMenu = [
    {
      name: "Image",
      color: "#04A5E0",
      Icon: <PhotoCamera />,
      action: (e) => Photo(e),
      type: "image",
    },

    {
      name: "Remove",
      color: "#FF0000",
      Icon: <DeleteRounded />,
      action: (user) => RemoveImage(user),
    },
  ];

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h2
        style={{
          color: "#001D42",
          marginTop: "15px",
          alignSelf: "center",
        }}
      >
        {"Add Item"}
      </h2>
      <ImagePreview
        button={<PopOver items={popMenu} Icon={<CameraAlt />} event={user} />}
        imageSrc={image}
      />

      {error && <div className="formError"> {error}</div>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          maxHeight: "160px",
          overflowY: "auto",
        }}
      >
        <TextField
          // fullWidth
          type="text"
          name="family"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Family"
        />
        <TextField
          // fullWidth
          type="text"
          name="category"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Category"
        />
        <TextField
          required
          type="text"
          variant="standard"
          name="name"
          inputProps={{
            className: classes.inputText,
          }}
          label="Name"
          style={{ color: "black", marginBottom: "5px", marginTop: "0px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
        />
        <TextField
          // fullWidth
          type="number"
          name="cost"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Cost"
        />
        <TextField
          // fullWidth
          type="number"
          name="commissionAmount"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Commission Amount"
        />
        <TextField
          // fullWidth
          type="number"
          name="quantity"
          variant="standard"
          inputProps={{
            className: classes.inputText,
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Quantity"
        />
        <TextField
          // fullWidth
          type="number"
          name="commissionRatio"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Commission Ratio"
          required
        />
        <TextField
          name="MeasureUnitPlural"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label=" Measure Unit Plural"
          required
        />{" "}
        <TextField
          // fullWidth

          name="MeasureUnit"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label=" Measure Unit"
          required
        />
      </div>

      {/* <Dropdown
        values={item.prices}
        label="Consumption Point"
        variant="standard"
        value={orderInfo.consumptionPoint}
        handleChange={(val) => setItem({ ...item, consumptionPoint: val })}
        sx={{ margin: 0 }}
        textColor={"black"}
      /> */}

      <LoadingButton
        loading={loading}
        variant="contained"
        type="submit"
        style={{ marginTop: "20px", marginBottom: "25px" }}
      >
        {"Add"}
      </LoadingButton>
    </form>
  );
}
