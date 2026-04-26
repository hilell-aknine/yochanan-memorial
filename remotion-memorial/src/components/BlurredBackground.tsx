import React from "react";
import { AbsoluteFill, Img } from "remotion";

// Fills empty bars (from object-fit:contain photos) with a blurred copy of
// the same image — avoids hard black bars on portrait-orientation photos.
export const BlurredBackground: React.FC<{ src: string }> = ({ src }) => {
  return (
    <AbsoluteFill
      style={{
        filter: "blur(60px) saturate(1.1) brightness(0.6)",
        transform: "scale(1.2)", // hide blur edge artifacts
        overflow: "hidden",
      }}
    >
      <Img
        src={src}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};
