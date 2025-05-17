"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Mumbai",
    quote: "The Hunter 350 is the perfect bike for city riding. Nimble, powerful, and turns heads wherever I go!",
    image: "https://avatars.githubusercontent.com/u/30511472?v=4",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Bangalore",
    quote:
      "As a female rider, I was looking for something manageable but with character. The Hunter 350 delivers on both fronts.",
    image: "https://avatars.githubusercontent.com/u/30511472?v=4",
    rating: 4,
  },
  {
    id: 3,
    name: "Vikram Singh",
    location: "Delhi",
    quote:
      "The retro styling combined with modern features makes this bike a standout in its segment. Highly recommended!",
    image: "https://avatars.githubusercontent.com/u/30511472?v=4",
    rating: 5,
  },
]

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-zinc-800">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          What Riders Are Saying
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-700 rounded-lg p-6 md:p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={testimonials[activeIndex].image || `/placeholder.svg?height=128&width=128`}
                  alt={testimonials[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? "text-yellow-500" : "text-zinc-500"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-lg md:text-xl italic mb-4">"{testimonials[activeIndex].quote}"</p>

                <div>
                  <h4 className="text-lg font-semibold">{testimonials[activeIndex].name}</h4>
                  <p className="text-zinc-400">{testimonials[activeIndex].location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="bg-zinc-600 hover:bg-zinc-500 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-red-600" : "bg-zinc-600"}`}
              />
            ))}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="bg-zinc-600 hover:bg-zinc-500 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
