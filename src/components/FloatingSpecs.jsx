"use client"

import { motion } from "framer-motion"

const FloatingSpecs = () => {
  const specs = [
    { label: "Engine", value: "349cc", icon: "🔧" },
    { label: "Power", value: "20.2 bhp", icon: "⚡" },
    { label: "Torque", value: "27 Nm", icon: "🔄" },
    { label: "Weight", value: "181 kg", icon: "⚖️" },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {specs.map((spec, index) => (
        <motion.div
          key={index}
          className="absolute bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-lg px-4 py-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: getRandomPosition(index).x,
            y: getRandomPosition(index).y,
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: index * 3,
            times: [0, 0.1, 0.9, 1],
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{spec.icon}</span>
            <div>
              <p className="text-zinc-400 text-xs">{spec.label}</p>
              <p className="font-semibold">{spec.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Helper function to get random positions for floating elements
function getRandomPosition(index) {
  const positions = [
    { x: ["20%", "30%", "25%"], y: ["20%", "25%", "30%"] },
    { x: ["70%", "65%", "75%"], y: ["15%", "20%", "25%"] },
    { x: ["15%", "20%", "25%"], y: ["70%", "75%", "65%"] },
    { x: ["75%", "70%", "65%"], y: ["65%", "70%", "75%"] },
  ]

  return positions[index % positions.length]
}

export default FloatingSpecs
