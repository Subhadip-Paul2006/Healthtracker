"use client"

import { cn } from "@/src/lib/utils"

interface ProgressiveBlurProps {
  className?: string
  direction?: "top" | "bottom" | "left" | "right"
  blurLayers?: number
  blurIntensity?: number
}

export function ProgressiveBlur({
  className,
  direction = "top",
  blurLayers = 5,
  blurIntensity = 8,
}: ProgressiveBlurProps) {
  const layers = Array.from({ length: blurLayers }, (_, i) => i)
  
  const getDirectionStyles = (index: number) => {
    const progress = index / blurLayers
    const blur = blurIntensity * (1 - progress)
    
    switch (direction) {
      case "top":
        return {
          top: 0,
          left: 0,
          right: 0,
          height: `${(index + 1) * (100 / blurLayers)}%`,
          filter: `blur(${blur}px)`,
        }
      case "bottom":
        return {
          bottom: 0,
          left: 0,
          right: 0,
          height: `${(index + 1) * (100 / blurLayers)}%`,
          filter: `blur(${blur}px)`,
        }
      case "left":
        return {
          top: 0,
          left: 0,
          bottom: 0,
          width: `${(index + 1) * (100 / blurLayers)}%`,
          filter: `blur(${blur}px)`,
        }
      case "right":
        return {
          top: 0,
          right: 0,
          bottom: 0,
          width: `${(index + 1) * (100 / blurLayers)}%`,
          filter: `blur(${blur}px)`,
        }
    }
  }

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {layers.map((index) => (
        <div
          key={index}
          className="absolute bg-gradient-to-b from-transparent to-coffee-black"
          style={getDirectionStyles(index)}
        />
      ))}
    </div>
  )
}
