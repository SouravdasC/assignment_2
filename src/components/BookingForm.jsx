"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import OtpInput from "./OtpInput"
import { toast } from "react-toastify" // Import toast from react-toastify

const BookingForm = ({ onSubmit, isLoading }) => {
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
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Book Your Test Ride</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${errors.name ? "border border-red-500" : ""}`}
            placeholder="John Do"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="mobile" className="block text-sm font-medium mb-1">
            Mobile Number
          </label>
          <div className="flex">
            <div className="bg-zinc-700 px-3 py-3 rounded-l-md flex items-center">
              <span>+91</span>
            </div>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`flex-1 px-4 py-3 bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${errors.mobile ? "border border-red-500" : ""} ${otpVerified ? "border-green-500" : ""}`}
              placeholder="123456789"
              maxLength={10}
              disabled={otpVerified}
            />
            {!otpVerified && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleSendOtp}
                className="bg-red-600 text-white px-3 py-2 rounded-r-md hover:bg-red-700 transition duration-300"
              >
                {showOtp ? "Resend" : "Verify"}
              </motion.button>
            )}
            {otpVerified && (
              <div className="bg-green-600 text-white px-3 py-2 rounded-r-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}

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
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${errors.email ? "border border-red-500" : ""}`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="pincode" className="block text-sm font-medium mb-1">
            Pincode
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${errors.pincode ? "border border-red-500" : ""}`}
            placeholder="400001"
            maxLength={6}
          />
          {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Your full address"
            rows={3}
          />
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
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
              <a href="#" className="text-red-500 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-red-500 hover:underline">
                Privacy Policy
              </a>
            </label>
            {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading || !otpVerified}
          className={`w-full bg-red-600 text-white py-3 rounded-md text-lg font-semibold transition duration-300 ${isLoading || !otpVerified ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700"}`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            "SUBMIT"
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

export default BookingForm
