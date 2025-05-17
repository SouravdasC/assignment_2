"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

const OtpInput = ({ onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef([])

  useEffect(() => {
    // Focus the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (e, index) => {
    const value = e.target.value

    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = value.substring(0, 1)
    setOtp(newOtp)

    // If input is filled, move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }

    // Check if all inputs are filled
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      onVerify(newOtp.join(""))
    }
  }

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)

      // Focus the last input
      inputRefs.current[5].focus()

      // Verify OTP
      onVerify(pastedData)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <p className="text-sm text-zinc-400">Enter the 6-digit OTP sent to your mobile number</p>
      <div className="flex justify-between gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            maxLength={1}
            className="w-10 h-12 text-center bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
          />
        ))}
      </div>
      <div className="flex justify-between">
        <p className="text-xs text-zinc-400">For demo: Use "123456" as OTP</p>
        <button
          type="button"
          onClick={() => onVerify(otp.join(""))}
          className="text-sm text-red-500 hover:text-red-400"
        >
          Verify OTP
        </button>
      </div>
    </motion.div>
  )
}

export default OtpInput
