'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface ProConListProps {
  value: {
    pros?: string[]
    cons?: string[]
    layout?: 'side-by-side' | 'stacked'
  }
}

export function ProConList({ value }: ProConListProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const pros = value.pros || []
  const cons = value.cons || []
  const layout = value.layout || 'side-by-side'

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const proItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  }

  const conItemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  }

  if (layout === 'stacked') {
    return (
      <div ref={ref} className="my-8 space-y-4">
        {/* Pros */}
        <motion.div
          className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="bg-emerald-500 px-5 py-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Check className="w-5 h-5" />
              Vorteile
            </h4>
          </div>
          <ul className="p-5 space-y-3">
            {pros.map((pro, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-[var(--theme-text)]"
                variants={proItemVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-emerald-500" />
                </span>
                <span className="text-sm">{pro}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Cons */}
        <motion.div
          className="rounded-2xl bg-red-500/5 border border-red-500/20 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="bg-red-500 px-5 py-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <X className="w-5 h-5" />
              Nachteile
            </h4>
          </div>
          <ul className="p-5 space-y-3">
            {cons.map((con, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-[var(--theme-text)]"
                variants={conItemVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                  <X className="w-3 h-3 text-red-500" />
                </span>
                <span className="text-sm">{con}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    )
  }

  // Side-by-side layout
  return (
    <div ref={ref} className="my-8 grid md:grid-cols-2 gap-4">
      {/* Pros */}
      <motion.div
        className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="bg-emerald-500 px-5 py-3">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <Check className="w-5 h-5" />
            Vorteile
          </h4>
        </div>
        <ul className="p-5 space-y-3">
          {pros.map((pro, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-[var(--theme-text)]"
              variants={proItemVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-emerald-500" />
              </span>
              <span className="text-sm">{pro}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Cons */}
      <motion.div
        className="rounded-2xl bg-red-500/5 border border-red-500/20 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="bg-red-500 px-5 py-3">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <X className="w-5 h-5" />
            Nachteile
          </h4>
        </div>
        <ul className="p-5 space-y-3">
          {cons.map((con, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-[var(--theme-text)]"
              variants={conItemVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                <X className="w-3 h-3 text-red-500" />
              </span>
              <span className="text-sm">{con}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
