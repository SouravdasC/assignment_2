"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const ScrollReveal = ({ children, threshold = 0.1, delay = 0, duration = 0.5, direction = "up", className = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold })

  // Set initial and animate values based on direction
  let initial = {}

  switch (direction) {
    case "up":
      initial = { opacity: 0, y: 50 }
      break
    case "down":
      initial = { opacity: 0, y: -50 }
      break
    case "left":
      initial = { opacity: 0, x: 50 }
      break
    case "right":
      initial = { opacity: 0, x: -50 }
      break
    case "scale":
      initial = { opacity: 0, scale: 0.9 }
      break
    default:
      initial = { opacity: 0, y: 50 }
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : initial}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
