import { useEffect, useRef } from "react";

export function useOnDraw(onDraw) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const isDrawingRef = useRef(false);
  const prevPointRef = useRef(null);

  const mouseMoveRef = useRef(null);
  const mouseUpRef = useRef(null);

  function setCanvasRef(ref) {
    canvasRef.current = ref;
  }
  function setAudioRef(ref) {
    audioRef.current = ref;
  }

  function onCanvasMouseDown() {
    isDrawingRef.current = true;
  }

  useEffect(() => {
    function pointInCanvas(clientX, clientY) {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top,
        };
      } else {
        return null;
      }
    }

    function initMouseMove() {
      const listener = (e) => {
        if (
          isDrawingRef.current &&
          canvasRef.current &&
          e.button == 0 &&
          audioRef.current
        ) {
          const point = pointInCanvas(e.clientX, e.clientY + 25);
          const ctx = canvasRef.current.getContext("2d");
          audioRef.volume = 2;
          audioRef.current.play();
          if (onDraw) onDraw(ctx, point, prevPointRef.current);
          prevPointRef.current = point;
        } else isDrawingRef.current = false;
      };
      mouseMoveRef.current = listener;
      window.addEventListener("mousedown", listener);
      window.addEventListener("mousemove", listener);
    }

    function initMouseUp() {
      const listener = () => {
        isDrawingRef.current = false;
        prevPointRef.current = null;
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
      mouseUpRef.current = listener;
      window.addEventListener("mouseup", listener);
    }

    function cleanup() {
      if (mouseMoveRef.current) {
        window.removeEventListener("mousemove", mouseMoveRef.current);
        window.removeEventListener("mousedown", mouseMoveRef.current);
      }
      if (mouseUpRef.current) {
        window.removeEventListener("mouseup", mouseUpRef.current);
      }
    }
    initMouseMove();
    initMouseUp();
    return () => cleanup();
  }, [onDraw]);

  return {
    setCanvasRef,
    setAudioRef,
    onCanvasMouseDown,
  };
}
