import React, { useState } from "react";
import { motion } from "framer-motion";

const Circle = ({ id, x, y, size, onDrag, isOverlapping }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={(event, info) => onDrag(id, info)}
      style={{
        position: "absolute",
        top: y - size / 2,
        left: x - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: isOverlapping ? "red" : "blue",
        cursor: "grab",
      }}
    />
  );
};

const InteractiveCircles = () => {
  const [circles, setCircles] = useState([]);

  const addCircle = (e) => {
    const newCircle = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      size: 50,
    };
    setCircles([...circles, newCircle]);
  };

  const handleDrag = (id, info) => {
    setCircles((prevCircles) =>
      prevCircles.map((circle) =>
        circle.id === id
          ? {
              ...circle,
              x: info.point.x,
              y: info.point.y,
              size: circle.size + 1,
            }
          : circle
      )
    );
  };

  const checkOverlap = (circle1, circle2) => {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (circle1.size + circle2.size) / 2;
  };

  return (
    <div
      onClick={addCircle}
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
      {circles.map((circle) => (
        <Circle
          key={circle.id}
          {...circle}
          onDrag={handleDrag}
          isOverlapping={circles.some(
            (c) => c.id !== circle.id && checkOverlap(circle, c)
          )}
        />
      ))}
    </div>
  );
};

export default InteractiveCircles;
