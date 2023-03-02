import { useOnDraw } from "@/components/Drawing/useonDraw";
import React, { useEffect, useRef, useState } from "react";
const DrawingApp = ({
  amount,
  intensity,
  color,
  setContext,
  x,
  y,
  setX,
  setY,
}) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      setX(canvasRef.current.clientWidth);
      setY(canvasRef.current.clientHeight);
    }
  }, []);
  const { setCanvasRef, onCanvasMouseDown, setAudioRef } = useOnDraw(onDraw);
  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx);
    setContext(ctx);
  }

  function drawLine(start, end, ctx) {
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

  return (
    <div className="canvas" ref={canvasRef}>
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
