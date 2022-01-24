import { Box } from "@mui/material";

const Image = ({ alt = "", className = "", src = "", sx = {} }) => {
  return (
    <Box className={className} component={"img"} alt={alt} src={src} sx={sx} />
  );
};

export default Image;
