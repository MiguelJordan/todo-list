import { IconButton } from "@mui/material";
import React from "react";
import image from "../../default.png";

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
        src={imageSrc ?? image}
        style={{
          width: "105px",
          height: "105px",
          borderRadius: "300px",
          backgroundColor: "#B3B3B3",
          border: 0,
          borderImage: "none",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: -3,
          marginLeft: "50px",
          width: "40px",
          height: "40px",
          borderRadius: "30px",
          backgroundColor: "black",
          marginTop: "5px",
        }}
        onClick={handleClick}
      >
        {button}
      </span>
    </div>
  );
}
