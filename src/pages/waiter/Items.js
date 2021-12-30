import { Select } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import ItemList from "../../components/storeItems/ItemList";
import { TrContext } from "../../contexts/TranslationContext";
import { alpha, makeStyles } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "absolute",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "2%",
  width: "20%",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "70%",
    marginTop: "35px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    //marginLeft: "0%",
    width: "38%",
    marginTop: "20px",
    //marginRight: "5%",
  },
  [theme.breakpoints.up("md")]: {
    // marginLeft: "50%",
    // marginRight: "15%",
    width: "23%",
    marginTop: "15px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "20%",
    marginTop: 0,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("xs")]: {},
    [theme.breakpoints.up("md")]: {
      marginTop: "1%",
    },
    filters: {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.up("xs")]: {
        flexFlow: "column",
      },
    },
  },
}));

export default function Drinks() {
  const [searchVal, setSearchVal] = useState("");
  const classes = useStyles();
  const { t } = useContext(TrContext);

  const list = {
    drinks: {
      whisky: [{ id: "1", name: "Label", prices: [1000, 2000], stock: 50 }],
      Beer: [
        {
          id: "2",
          name: "Castel",
          prices: [1000, 2000],
          stock: 50,
          image: "",
        },
        {
          id: "3",
          name: "Boster",
          prices: [1000, 1500],
          stock: 150,
          image: "",
        },
        {
          id: "6",
          name: "Castel",
          prices: [1000, 2000],
          stock: 50,
          image: "",
        },
        {
          id: "7",
          name: "Boster",
          prices: [1000, 1500],
          stock: 150,
          image: "",
        },
        {
          id: "8",
          name: "Castel",
          prices: [1000, 2000],
          stock: 50,
          image: "",
        },
        {
          id: "9",
          name: "Boster",
          prices: [1000, 1500],
          stock: 150,
          image: "",
        },
      ],
    },
  };

  const familly = Object.keys(list);

  const [fam, setFam] = useState(familly[0]);
  const category = Object.keys(list[fam]);
  const [cat, setCat] = useState(category[0]);
  console.log(category, cat);

  return (
    <>
      {/* <h1>{t("pages.waiter.drinks")}</h1> */}
      <div className={classes.filters}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            //marginLeft: "3%",
            marginTop: "12px",
          }}
        >
          Familly:
          <Select
            native
            variant="standard"
            style={{ color: "#B3B3B3", marginLeft: "1%", marginTop: "-0.5%" }}
            defaultValue={fam}
            onChange={(e) => {
              setFam(e.target.value);
            }}
          >
            {familly.map((fam) => (
              <option value={fam} key={fam}>
                {fam}
              </option>
            ))}
          </Select>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Category:
          <Select
            native
            variant="standard"
            style={{ color: "#B3B3B3", marginLeft: "1%", marginTop: "-1%" }}
            defaultValue={category[0]}
            onChange={(e) => setCat(e.target.value)}
          >
            {category.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className={classes.search}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(event) => setSearchVal(event.target.value)}
          />
        </Search>
      </div>

      <ItemList
        list={list[fam][cat].filter((val) => {
          if (!searchVal) return val;
          if (
            val.name
              .toString()
              .toLocaleLowerCase()
              .includes(searchVal.toString().toLocaleLowerCase().trim())
          )
            return val;
          return "";
        })}
        preview={false}
      />
    </>
  );
}
