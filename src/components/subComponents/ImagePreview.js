import React from "react";
import defaultImage from "../../assests/default.png";

export default function ImagePreview({ button, handleClick, imageSrc }) {
  return (
    <div
      style={{
        position: "relative",
        margin: "-10px auto",
        marginBottom: "5px",
        width: "fit-content",
      }}
    >
      <img
        src={imageSrc ?? defaultImage}
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "300px",
          border: 0,
          objectFit: "cover",
        }}
      />
      <span
        style={{
          position: "absolute",
          right: 5,
          bottom: 0,
          width: "40px",
          height: "40px",
          borderRadius: "30px",
          backgroundColor: "#001d42",
          border: "3px solid white",
        }}
        onClick={handleClick}
      >
        {button}
      </span>
    </div>
  );
}
