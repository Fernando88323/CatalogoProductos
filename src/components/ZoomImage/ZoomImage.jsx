import { useState } from "react";

function ZoomImage({ src, alt }) {
  const [style, setStyle] = useState({
    backgroundPosition: "center",
    backgroundSize: "contain",
  });

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%", // nivel de zoom
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      backgroundPosition: "center",
      backgroundSize: "contain", // vuelve al tamaño normal mostrando la imagen completa
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-[400px] rounded-lg border"
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: style.backgroundSize,
        backgroundPosition: style.backgroundPosition,
        cursor: "zoom-in",
      }}
      aria-label={alt}
    ></div>
  );
}

export default ZoomImage;
