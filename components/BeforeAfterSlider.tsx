"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal } from "lucide-react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200" id="promeny">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
            Skutečné proměny bytů
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
            Porovnání: Původní stav vs. Po rekonstrukci
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Podívejte se, jak dokážeme starý a nevyhovující byt proměnit v moderní, čistý a prosvětlený domov.
          </p>
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-white shadow-xl select-none cursor-ew-resize bg-slate-200"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* After Image (Full background) */}
            <div className="absolute inset-0">
              <Image
                src="/images/nove/obyvak-po-rekonstrukci.webp"
                alt="Po rekonstrukci - moderní byt HANSBAU"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PO REKONSTRUKCI</span>
              </div>
            </div>

            {/* Before Image (Clipped with width) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full min-w-[100%]">
                <Image
                  src="/images/nove/balthasar-byt.webp"
                  alt="Před rekonstrukcí - původní stav"
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover filter grayscale contrast-125 brightness-95"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-lg">
                  PŘED REKONSTRUKCÍ
                </div>
              </div>
            </div>

            {/* Drag Handle Divider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-red-600 border-2 border-white shadow-xl flex items-center justify-center text-white cursor-grab active:cursor-grabbing">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Helper caption below */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-2 font-medium">
            <span>← Přetažením posuvníku porovnejte proměnu</span>
            <span className="text-slate-800 font-semibold">Projekt: Kompletní byt 3+1 (Cheb)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
