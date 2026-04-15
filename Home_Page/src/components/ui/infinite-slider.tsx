"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"

interface InfiniteSliderProps {
  children: React.ReactNode
  gap?: number
  duration?: number
  durationOnHover?: number
  direction?: "horizontal" | "vertical"
  reverse?: boolean
  className?: string
}

export function InfiniteSlider({
  children,
  gap = 32,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    
    if (!container || !content) return

    const containerWidth = container.offsetWidth
    const contentWidth = content.scrollWidth

    if (contentWidth > containerWidth) {
      setShouldAnimate(true)
    }
  }, [])

  useEffect(() => {
    if (!shouldAnimate) return

    const container = containerRef.current
    const content = contentRef.current
    
    if (!container || !content) return

    const containerWidth = container.offsetWidth
    const contentWidth = content.scrollWidth

    const animate = async () => {
      if (direction === "horizontal") {
        await controls.start({
          x: reverse ? [0, -contentWidth / 2] : [-contentWidth / 2, 0],
          transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
          },
        })
      } else {
        await controls.start({
          y: reverse ? [0, -contentWidth / 2] : [-contentWidth / 2, 0],
          transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
          },
        })
      }
    }

    animate()
  }, [shouldAnimate, duration, direction, reverse, controls])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className || ""}`}
      style={{ gap: `${gap}px` }}
      onMouseEnter={() => {
        if (durationOnHover && controls) {
          controls.set({
            transition: { duration: durationOnHover, ease: "linear" },
          })
        }
      }}
      onMouseLeave={() => {
        if (durationOnHover && controls) {
          controls.set({
            transition: { duration, ease: "linear" },
          })
        }
      }}
    >
      <motion.div
        ref={contentRef}
        animate={controls}
        className="flex"
        style={{
          gap: `${gap}px`,
          width: "max-content",
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}
