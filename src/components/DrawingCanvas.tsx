import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from './Button'; // I will create this next
import { Undo, RotateCcw, Download } from 'lucide-react';
import { cn } from '../utils';

type Point = { x: number; y: number };
type Stroke = Point[];

interface DrawingCanvasProps {
  onDrawEnd?: (strokes: Stroke[]) => void;
  readOnly?: boolean;
  initialStrokes?: Stroke[];
  className?: string;
}

export function DrawingCanvas({ onDrawEnd, readOnly = false, initialStrokes = [], className }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>(initialStrokes);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawStrokes = useCallback((ctx: CanvasRenderingContext2D, allStrokes: Stroke[], activeStroke: Stroke | null) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw Grid
    // Background grid is handled via CSS now
    
    // Draw lines
    ctx.strokeStyle = '#E53935';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 12;

    const renderStroke = (stroke: Stroke) => {
      if (stroke.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      if (stroke.length === 1) {
        ctx.lineTo(stroke[0].x, stroke[0].y);
      } else {
        for (let i = 1; i < stroke.length - 1; i++) {
          const xc = (stroke[i].x + stroke[i + 1].x) / 2;
          const yc = (stroke[i].y + stroke[i + 1].y) / 2;
          ctx.quadraticCurveTo(stroke[i].x, stroke[i].y, xc, yc);
        }
        ctx.lineTo(stroke[stroke.length - 1].x, stroke[stroke.length - 1].y);
      }
      ctx.stroke();
    };

    allStrokes.forEach(renderStroke);
    if (activeStroke) renderStroke(activeStroke);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Use a fixed logical size to keep coordinate space consistent,
    // but scale display using CSS.
    // Actually, responsive drawing is tricky. Let's make the internal resolution fixed to 400x400
    // and let CSS handle the display.
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawStrokes(ctx, strokes, currentStroke);
  }, [strokes, currentStroke, drawStrokes]);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (readOnly) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const point = getCoordinates(e);
    setCurrentStroke([point]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || readOnly || !currentStroke) return;
    const point = getCoordinates(e);
    setCurrentStroke((prev) => (prev ? [...prev, point] : [point]));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || readOnly) return;
    setIsDrawing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (currentStroke && currentStroke.length > 0) {
      const newStrokes = [...strokes, currentStroke];
      setStrokes(newStrokes);
      setCurrentStroke(null);
      if (onDrawEnd) {
        onDrawEnd(newStrokes);
      }
    }
  };

  const undo = () => {
    const newStrokes = strokes.slice(0, -1);
    setStrokes(newStrokes);
    if (onDrawEnd) onDrawEnd(newStrokes);
  };

  const clear = () => {
    setStrokes([]);
    if (onDrawEnd) onDrawEnd([]);
  };
  
  const download = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "hiragana-practice.png";
      link.href = dataUrl;
      link.click();
  }

  return (
    <div className={cn("flex flex-col items-center w-full max-w-[400px]", className)} ref={containerRef}>
      <div className="relative touch-none w-full aspect-square bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-t-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-full h-px bg-white/10"></div>
           <div className="h-full w-px bg-white/10"></div>
        </div>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="relative z-10 w-full h-full cursor-crosshair touch-none select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      </div>
      {!readOnly ? (
        <div className="h-16 bg-white/5 border border-t-0 border-white/10 w-full rounded-b-3xl flex items-center justify-center gap-2 px-4 backdrop-blur-md">
          <Button variant="ghost" onClick={undo} disabled={strokes.length === 0} icon={<Undo size={16} />} className="text-xs py-1.5">
            Undo
          </Button>
          <Button variant="ghost" onClick={clear} disabled={strokes.length === 0} icon={<RotateCcw size={16} />} className="text-xs py-1.5">
            Clear
          </Button>
          <Button variant="ghost" onClick={download} disabled={strokes.length === 0} icon={<Download size={16} />} className="text-xs py-1.5">
            Save
          </Button>
        </div>
      ) : (
        <div className="h-4 w-full bg-white/5 border border-t-0 border-white/10 rounded-b-3xl backdrop-blur-md"></div>
      )}
    </div>
  );
}
