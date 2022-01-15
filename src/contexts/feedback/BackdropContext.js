import { createContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const BackdropContext = createContext();

export default function BackdropProvider({ children }) {
  const [open, setOpen] = useState(false);

  const toggleBackdrop = (value) => setOpen(Boolean(value) ?? !open);

  const context = { toggleBackdrop };

  return (
    <BackdropContext.Provider value={context}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={() => toggleBackdrop(false)}
      >
        <div
          style={{
            backgroundColor: "black",
            opacity: ".3",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      </Backdrop>
      {children}
    </BackdropContext.Provider>
  );
}
