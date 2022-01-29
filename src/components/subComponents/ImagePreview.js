import React from "react";
import defaultImage from "../../assests/default.png";

export default function ImagePreview({ button, handleClick, imageSrc }) {
  return (
    <div
      style={{
        position: "relative",
        margin: "-10px auto",
        marginBottom: "5px",
        width: "140px",
        height: "140px",
      }}
    >
      <img
        alt="preview"
        src={imageSrc ?? defaultImage}
        style={{
          width: "100%",
          height: "100%",
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
