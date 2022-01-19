import { Suspense } from "react";
import { useImage } from "react-image";

const Image = ({ className = "", src: _src, sx = {} }) => {
  const { src } = useImage({ srcList: _src });

  return (
    <Suspense>
      <img src={src} className={className} style={{ ...sx }} loading="lazy" />
    </Suspense>
  );
};

export default Image;
