"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"

const ParallaxMotorcycle = ({ imageUrl }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()

  // Parallax effect on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5])

  // 3D tilt effect variables
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from center (normalized from -1 to 1)
      const x = (e.clientX - centerX) / (rect.width / 2)
      const y = (e.clientY - centerY) / (rect.height / 2)

      setMousePosition({ x, y })

      // Update rotation values for 3D effect
      rotateX.set(-y * 5) // Invert Y for natural tilt
      rotateY.set(x * 5)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [rotateX, rotateY])

  // Smoke/exhaust effect
  const [showSmoke, setShowSmoke] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSmoke(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Smoke effect */}
      {showSmoke && (
        <div className="absolute right-1/4 bottom-1/3 z-0 opacity-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 2],
              x: [0, 30, 60],
              y: [0, -10, -20],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute w-16 h-16 rounded-full bg-zinc-400 blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.3, 1, 1.5],
              x: [0, 20, 40],
              y: [0, -5, -15],
            }}
            transition={{
              duration: 2.5,
              delay: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute w-12 h-12 rounded-full bg-zinc-400 blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0.2, 0.8, 1.2],
              x: [0, 15, 30],
              y: [0, -8, -12],
            }}
            transition={{
              duration: 2,
              delay: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute w-10 h-10 rounded-full bg-zinc-400 blur-xl"
          />
        </div>
      )}

      {/* Motorcycle image with parallax and 3D tilt effect */}
      <motion.div
        style={{
          y,
          scale,
          rotateX,
          rotateY,
          rotate,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="relative z-10"
      >
        <motion.img
          src={imageUrl}
          alt="Royal Enfield Hunter 350"
          className="w-full max-w-2xl object-contain mx-auto h-[60vh]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        />

        {/* Subtle shadow */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-black/40 blur-xl rounded-full z-0"
          style={{
            rotateX: 90, // Flatten shadow
            scale: useTransform(rotateY, [-5, 5], [0.9, 1.1]),
            x: useTransform(rotateY, [-5, 5], [10, -10]),
          }}
        />
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 border-red-500"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 border-red-500"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </motion.div>
    </div>
  )
}

export default ParallaxMotorcycle
