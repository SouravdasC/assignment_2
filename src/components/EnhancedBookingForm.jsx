"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import OtpInput from "./OtpInput"
import { toast } from "react-toastify"

const EnhancedBookingForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pincode: "",
    address: "",
    termsAccepted: false,
  })

  const [errors, setErrors] = useState({})
  const [showOtp, setShowOtp] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address"
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required"
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit Indian pincode"
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleSendOtp = (e) => {
    e.preventDefault()
    if (formData.mobile && /^[6-9]\d{9}$/.test(formData.mobile)) {
      setShowOtp(true)
      // Simulate OTP sent
      setTimeout(() => {
        toast.info("OTP sent to your mobile number", {
          position: "top-right",
        })
      }, 1000)
    } else {
      setErrors({
        ...errors,
        mobile: "Enter a valid 10-digit Indian mobile number",
      })
    }
  }

  const handleVerifyOtp = (otp) => {
    // Simulate OTP verification (in a real app, this would call an API)
    if (otp === "123456") {
      setOtpVerified(true)
      setShowOtp(false)
      toast.success("Mobile number verified successfully!", {
        position: "top-right",
      })
    } else {
      toast.error("Invalid OTP. Please try again.", {
        position: "top-right",
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)

      // Show success animation
      const formElement = e.target
      formElement.classList.add("form-success")
      setTimeout(() => {
        formElement.classList.remove("form-success")
      }, 1000)
    }
  }

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto relative"
    >
      <motion.div
        className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-red-600/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-red-600/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          delay: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Book Your Test Ride
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 relative z-10"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${errors.name ? "border border-red-500" : ""
                }`}
              placeholder="John Doe"
            />
            <AnimatePresence>
              {focusedField === "name" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="mobile" className="block text-sm font-medium mb-1">
            Mobile Number
          </label>
          <div className="flex">
            <motion.div
              whileHover={{ backgroundColor: "rgba(82, 82, 91, 1)" }}
              className="bg-zinc-700 px-3 py-3 rounded-l-md flex items-center"
            >
              <span>+91</span>
            </motion.div>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              onFocus={() => handleFocus("mobile")}
              onBlur={handleBlur}
              className={`flex-1 px-4 py-3 bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${errors.mobile ? "border border-red-500" : ""
                } ${otpVerified ? "border-green-500" : ""}`}
              placeholder="9876543210"
              maxLength={10}
              disabled={otpVerified}
            />
            {!otpVerified && (
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#b71c1c" }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleSendOtp}
                className="bg-red-600 text-white px-3 py-2 rounded-r-md hover:bg-red-700 transition duration-300"
              >
                {showOtp ? "Resend" : "Verify"}
              </motion.button>
            )}
            {otpVerified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-600 text-white px-3 py-2 rounded-r-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}
          </div>
          {errors.mobile && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.mobile}
            </motion.p>
          )}

          <AnimatePresence>
            {showOtp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <OtpInput onVerify={handleVerifyOtp} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${errors.email ? "border border-red-500" : ""
                }`}
              placeholder="john@example.com"
            />
            <AnimatePresence>
              {focusedField === "email" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="pincode" className="block text-sm font-medium mb-1">
            Pincode
          </label>
          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              onFocus={() => handleFocus("pincode")}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${errors.pincode ? "border border-red-500" : ""
                }`}
              placeholder="400001"
              maxLength={6}
            />
            <AnimatePresence>
              {focusedField === "pincode" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {errors.pincode && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.pincode}
            </motion.p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onFocus={() => handleFocus("address")}
            onBlur={handleBlur}
            className="w-full px-4 py-3 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Your full address"
            rows={3}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-start">
          <div className="flex items-center h-5">
            <motion.input
              whileHover={{ scale: 1.1 }}
              id="termsAccepted"
              name="termsAccepted"
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-4 h-4 text-red-600 bg-zinc-700 border-zinc-600 rounded focus:ring-red-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="termsAccepted" className="font-medium text-zinc-300">
              I agree to the{" "}
              <motion.a href="#" className="text-red-500 hover:underline" whileHover={{ color: "#ef4444" }}>
                Terms of Service
              </motion.a>{" "}
              and{" "}
              <motion.a href="#" className="text-red-500 hover:underline" whileHover={{ color: "#ef4444" }}>
                Privacy Policy
              </motion.a>
            </label>
            {errors.termsAccepted && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.termsAccepted}
              </motion.p>
            )}
          </div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.03, backgroundColor: "#b71c1c" }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isLoading || !otpVerified}
          className={`w-full bg-red-600 text-white py-3 rounded-md text-lg font-semibold transition duration-300 ${isLoading || !otpVerified ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700"
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-5 h-5 border-t-2 border-white border-solid rounded-full mr-2"
              />
              Processing...
            </div>
          ) : (
            "SUBMIT"
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  )
}

export default EnhancedBookingForm
