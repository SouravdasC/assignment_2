"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const DealerLocator = () => {
  const [pincode, setPincode] = useState("")
  const [showResults, setShowResults] = useState(false)

  // Mock dealer data
  const dealers = [
    {
      id: 1,
      name: "Royal Enfield Mumbai Central",
      address: "123 Marine Drive, Mumbai, Maharashtra 400001",
      phone: "+91 9876543210",
      distance: "2.5 km",
    },
    {
      id: 2,
      name: "Royal Enfield Bandra",
      address: "456 Linking Road, Bandra West, Mumbai, Maharashtra 400050",
      phone: "+91 9876543211",
      distance: "5.8 km",
    },
    {
      id: 3,
      name: "Royal Enfield Andheri",
      address: "789 Andheri East, Mumbai, Maharashtra 400069",
      phone: "+91 9876543212",
      distance: "12.3 km",
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pincode.length === 6) {
      setShowResults(true)
    }
  }

  return (
    <section className="py-16 bg-zinc-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find a Dealer Near You</h2>
          <p className="text-zinc-400">
            Locate your nearest Royal Enfield dealership to book a test ride in person or get more information about the
            Hunter 350.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="flex mb-8">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter your pincode"
              className="flex-1 px-4 py-3 bg-zinc-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
              maxLength={6}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded-r-md hover:bg-red-700 transition duration-300"
            >
              Find Dealers
            </motion.button>
          </form>

          {showResults && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold mb-4">Dealers near {pincode}</h3>

              {dealers.map((dealer) => (
                <motion.div
                  key={dealer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: dealer.id * 0.1 }}
                  className="bg-zinc-700 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{dealer.name}</h4>
                      <p className="text-sm text-zinc-400 mt-1">{dealer.address}</p>
                      <p className="text-sm mt-2">{dealer.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-zinc-400">{dealer.distance}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block mt-2 text-red-500 hover:text-red-400 text-sm"
                      >
                        Get Directions
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DealerLocator
