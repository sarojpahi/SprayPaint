import { useOnDraw } from "@/components/Drawing/useonDraw";
import React, { useEffect, useRef, useState } from "react";
const colorArray = ["#1F45FC", "#228B22", "#7E191B", "#E30B5D"];
const DrawingApp = () => {
  const canvasRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [context, setContext] = useState();

  const [color, setColor] = useState(colorArray[0]);
  useEffect(() => {
    if (canvasRef.current) {
      setX(canvasRef.current.clientWidth);
      setY(canvasRef.current.clientHeight);
    }
  }, []);
  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);
  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, color);
    setContext(ctx);
  }

  function drawLine(start, end, ctx, color) {
    start = start ?? end;
    RandomizeParticles(start.x, start.y, ctx, color);
  }
  const clear = () => {
    context.clearRect(0, 0, x, y);
  };
  return (
    <div className="canvas" ref={canvasRef}>
      <div className="colorPicker">
        {colorArray.map((el, i) => (
          <div
            key={i}
            onClick={() => setColor(el)}
            style={{
              background: el,
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          ></div>
        ))}
        <div className="clear" onClick={() => clear()}>
          Clear
        </div>
      </div>
      <canvas
        width={x}
        height={y}
        ref={setCanvasRef}
        onMouseDown={onCanvasMouseDown}
      />
    </div>
  );
};

function RandomizeParticles(stageX, stageY, ctx, color) {
  for (var i = 0; i < 50; i++) {
    var x = stageX + (Math.random() - 0.5) * Math.random() * 150;
    var y = stageY + (Math.random() - 0.5) * Math.random() * 150;
    var alpha = Math.random();

    if (
      x > stageX + 30 ||
      x < stageX - 30 ||
      y > stageY + 30 ||
      y < stageY - 30
    ) {
      var rad = Math.random() * 4;
    } else if (
      x > stageX + 35 ||
      x < stageX - 35 ||
      y > stageY + 35 ||
      y < stageY - 35
    ) {
      var rad = Math.random() * 2;
    } else {
      var rad = Math.random() * 10;
    }

    new Particle(x, y, rad, alpha, ctx, color);
  }
}

function Particle(x, y, rad, alpha, ctx, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(x, y);
  ctx.arc(x, y, rad, alpha, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}
export default DrawingApp;