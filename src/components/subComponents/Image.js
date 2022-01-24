import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const Image = ({ alt = "", className = "", src = "", sx = {} }) => {
  return (
    <Card>
      <CardMedia className={className} image={src} title={alt} />
    </Card>
  );
};

export default Image;
