import { IconButton } from "@mui/material";
import React from "react";

export default function ImagePreview({ button, handleClick, imageSrc }) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <img
        src={imageSrc}
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "300px",
          backgroundColor: "#B3B3B3",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 0,
          marginLeft: "30px",
          width: "40px",
          height: "40px",
          borderRadius: "30px",
          backgroundColor: "black",
        }}
        onClick={handleClick}
      >
        {button}
      </span>
    </div>
  );
}
