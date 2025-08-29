import React from "react";

const BlurCircle = ({ top, left, bottom, translateX, opacity, className }) => {
  return (
    <div
      className={`absolute rounded-full blur-3xl bg-gradient-to-r pointer-events-none from-primary/70 to-secondary/70 ${className}`}
      style={{
        top,
        left,
        bottom,
        transform: translateX ? `translateX(${translateX})` : undefined,
        opacity,
      }}
    />
  );
};

export default BlurCircle;


// 