"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleMouseOver = (e) => {
      const target = e.target

      // Check if the element or its parent has specific classes or attributes
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-hover") ||
        target.closest(".cursor-hover")
      ) {
        setCursorVariant("hover")
      } else {
        setCursorVariant("default")
      }
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(220, 38, 38, 0.1)",
      border: "1px solid rgba(220, 38, 38, 0.5)",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
  }

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden lg:block"
      variants={variants}
      animate={cursorVariant}
    />
  )
}

export default CursorEffect
