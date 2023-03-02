import { useOnDraw } from "@/components/Drawing/useonDraw";
import React, { useEffect, useRef, useState } from "react";
const colorArray = ["#1F45FC", "#228B22", "#7E191B", "#E30B5D"];
const DrawingApp = () => {
  const canvasRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [context, setContext] = useState();
  const [amount, setAmount] = useState(3);
  const [intensity, setIntensity] = useState(3);

  const handleSize = (e) => {
    const value = e.target.value;
    if (value > 5) {
      setAmount(5);
    } else if (value < 1) {
      setAmount(1);
    } else setAmount(value);
  };
  const handleIntensity = (e) => {
    const value = e.target.value;
    if (value > 5) {
      setIntensity(5);
    } else if (value < 1) {
      setIntensity(1);
    } else setIntensity(value);
  };

  const [color, setColor] = useState(colorArray[0]);
  useEffect(() => {
    if (canvasRef.current) {
      setX(canvasRef.current.clientWidth);
      setY(canvasRef.current.clientHeight);
    }
  }, []);
  const { setCanvasRef, onCanvasMouseDown, setAudioRef } = useOnDraw(onDraw);
  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, color);
    setContext(ctx);
  }

  function drawLine(start, end, ctx, color) {
    start = start ?? end;
    RandomizeParticles(
      start.x,
      start.y,
      ctx,
      color,
      amount * 15,
      intensity * 50
    );
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
        <div className="size">
          <div>
            Width :
            <input
              type="number"
              min={1}
              max={5}
              value={amount}
              onChange={handleSize}
            />{" "}
          </div>

          <div>
            Intensity:
            <input
              type="number"
              min={1}
              max={5}
              value={intensity}
              onChange={handleIntensity}
            />
          </div>
        </div>
        <div className="clear" onClick={() => clear()}>
          Clear
        </div>
      </div>
      <audio ref={setAudioRef}>
        <source
          src={
            "https://cdn.discordapp.com/attachments/1072488517017550868/1080789282572218418/continous_spray_spund.mp3"
          }
          type="audio/mp3"
        />
      </audio>
      <canvas
        width={x}
        height={y}
        ref={setCanvasRef}
        onMouseDown={onCanvasMouseDown}
      />
    </div>
  );
};

function RandomizeParticles(stageX, stageY, ctx, color, amount, intensity) {
  for (var i = 0; i < intensity; i++) {
    var x = stageX + (Math.random() - 0.5) * Math.random() * amount * 3;
    var y = stageY + (Math.random() - 0.5) * Math.random() * amount * 3;
    var alpha = Math.random();

    if (
      x > stageX + (amount - 20) ||
      x < stageX - (amount - 20) ||
      y > stageY + (amount - 20) ||
      y < stageY - (amount - 20)
    ) {
      var rad = (Math.random() * amount) / 20;
    } else if (
      x > stageX + (amount - 25) ||
      x < stageX - (amount - 25) ||
      y > stageY + (amount - 25) ||
      y < stageY - (amount - 25)
    ) {
      var rad = (Math.random() * amount) / 25;
    } else if (
      x > stageX + (amount - 30) ||
      x < stageX - (amount - 30) ||
      y > stageY + (amount - 30) ||
      y < stageY - (amount - 30)
    ) {
      var rad = (Math.random() * amount) / 30;
    } else if (
      x > stageX + (amount - 15) ||
      x < stageX - (amount - 15) ||
      y > stageY + (amount - 15) ||
      y < stageY - (amount - 15)
    ) {
      var rad = Math.random() * 1;
    } else {
      var rad = (Math.random() * amount) / 10;
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
