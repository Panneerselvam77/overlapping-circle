import React, { useEffect, useState } from "react";

export default function Circles() {
  const [circles, setCircles] = useState([
    {
      id: "left",
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      backgroundColor: "red",
    },
    {
      id: "right",
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      backgroundColor: "red",
    },
  ]);

  const [currentCircleId, setCurrentCircleId] = useState(null);

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (e) => {
    const { button } = e;
    const currentId = button === 0 ? "left" : "right";
    setCurrentCircleId(currentId);
    setCircles((prev) =>
      prev.map((circle) =>
        circle.id === currentId
          ? {
              ...circle,
              startX: e.clientX,
              startY: e.clientY,
              width: 0,
              height: 0,
              x: e.clientX,
              y: e.clientY,
            }
          : circle
      )
    );
  };

  const handleMouseMove = (e) => {
    if (currentCircleId === null) return;

    setCircles((prevCircles) => {
      const updatedCircles = prevCircles.map((circle) => {
        if (circle.id === currentCircleId) {
          const width = e.clientX - circle.startX;
          const height = e.clientY - circle.startY;
          const size = Math.max(Math.abs(width), Math.abs(height));
          const newX = width < 0 ? circle.startX - size : circle.startX;
          const newY = height < 0 ? circle.startY - size : circle.startY;
          return {
            ...circle,
            width: size,
            height: size,
            x: newX,
            y: newY,
          };
        }
        return circle;
      });

      const doCirclesOverlap = doElementsOverlap(
        updatedCircles[0],
        updatedCircles[1]
      );

      return updatedCircles.map((circle) => ({
        ...circle,
        backgroundColor: doCirclesOverlap ? "blue" : "red",
      }));
    });
  };

  const handleMouseUp = () => {
    setCircles((prev) =>
      prev.map((circle) =>
        circle.id === currentCircleId &&
        circle.width === 0 &&
        circle.height === 0
          ? { ...circle, x: 0, y: 0 }
          : circle
      )
    );
    setCurrentCircleId(null);
  };

  const doElementsOverlap = (leftCircle, rightCircle) => {
    if (!leftCircle || !rightCircle) return false;

    const leftRadius = leftCircle.width / 2;
    const rightRadius = rightCircle.width / 2;

    const leftCenter = {
      x: leftCircle.x + leftRadius,
      y: leftCircle.y + leftRadius,
    };
    const rightCenter = {
      x: rightCircle.x + rightRadius,
      y: rightCircle.y + rightRadius,
    };

    const distance = Math.sqrt(
      Math.pow(leftCenter.x - rightCenter.x, 2) +
        Math.pow(leftCenter.y - rightCenter.y, 2)
    );

    return distance < leftRadius + rightRadius;
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="board"
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "#f0f0f0",
      }}
    >
      {circles.map((circle) => (
        <div
          key={circle.id}
          style={{
            position: "absolute",
            top: `${circle.y}px`,
            left: `${circle.x}px`, // Fixed issue
            width: `${circle.width}px`,
            height: `${circle.height}px`,
            backgroundColor: circle.backgroundColor, // Use dynamic background color
            borderRadius: "50%",
          }}
        ></div>
      ))}
    </div>
  );
}
