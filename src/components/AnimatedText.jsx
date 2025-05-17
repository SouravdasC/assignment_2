"use client"

import { motion } from "framer-motion"

const AnimatedText = ({ text, className, delay = 0, duration = 0.05, staggerChildren = 0.03 }) => {
  // Split text into an array of letters
  const letters = Array.from(text)

  // Variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay * i },
    }),
  }

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.h1 className={className} variants={container} initial="hidden" animate="visible" aria-label={text}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block" }}
          className={letter === " " ? "mr-2" : ""}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default AnimatedText
