"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Testimonials from "./components/Testimonials"
import VideoSection from "./components/VideoSection"
import DealerLocator from "./components/DealerLocator"
import Footer from "./components/Footer"
import { submitToGoogleSheets } from "./utils/googleSheetsApi"
import Navbar from "./components/Navbar"
import AnimatedBackground from "./components/AnimatedBackground"
import ParallaxMotorcycle from "./components/ParallaxMotorcycle"
import AnimatedText from "./components/AnimatedText"
import ScrollReveal from "./components/ScrollReveal"
import CursorEffect from "./components/CursorEffect"
import FloatingSpecs from "./components/FloatingSpecs"
import EnhancedBookingForm from "./components/EnhancedBookingForm"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleFormSubmit = async (formData) => {
    try {
      setIsLoading(true)
      // Add timestamp to form data
      const dataWithTimestamp = {
        ...formData,
        timestamp: new Date().toISOString(),
      }

      // Submit to Google Sheets
      await submitToGoogleSheets(dataWithTimestamp)

      toast.success("✅ Test Ride Booked! We'll contact you soon.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      })
      console.error("Form submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.img
            src="https://logos-download.com/wp-content/uploads/2019/06/Royal_Enfield_Logo_full-3000x3000.png"
            alt="Royal Enfield Logo"
            className="w-32 mx-auto mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
          <motion.div
            className="w-16 h-16 border-t-4 border-red-700 border-solid rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-4 text-zinc-400"
          >
            Loading the experience...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-hidden">
      <CursorEffect />
      <Navbar />
      <ToastContainer />

      {/* Hero Section */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-20">
        <AnimatedBackground />

        {/* Left Side - Hero Image */}
        <motion.div
          style={{ opacity, scale }}
          className="relative flex flex-col justify-center items-center p-6 lg:p-12"
        >
          <ParallaxMotorcycle imageUrl="https://gumlet.assettype.com/evoindia/2024-01/2808d83a-0df5-4a3e-982a-19c5d4c9e273/Hunter_350___Dapper_O__Orange__2.jpg" />
          <FloatingSpecs />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mt-8 relative z-10"
          >
            <AnimatedText
              text="HUNT YOUR HOOD"
              className="text-5xl md:text-7xl font-bold text-red-600 mb-4"
              delay={0.1}
              staggerChildren={0.05}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="text-xl md:text-2xl text-zinc-300 mb-6"
            >
              Book a test ride for the all-new Hunter 350 and experience the thrill.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(220, 38, 38, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-300 lg:hidden cursor-hover"
              onClick={() => document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" })}
            >
              BOOK TEST RIDE
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side - Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          id="booking-form"
          className="bg-zinc-800 p-6 lg:p-12 flex items-center relative"
        >
          <EnhancedBookingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      {/* Video Section */}
      <ScrollReveal>
        <VideoSection />
      </ScrollReveal>

      {/* Dealer Locator */}
      <ScrollReveal>
        <DealerLocator />
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
