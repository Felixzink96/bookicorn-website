'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Calendar,
  Users,
  BarChart3,
  Palette,
  Shield,
  ArrowRight,
  Check,
  Star,
  Zap,
} from 'lucide-react'
import { RegisterButton } from '@/components/ui/CTAButton'
import { LazyLiquidEther } from '@/components/ui/LazyLiquidEther'
import SplitText from '@/components/ui/SplitText'
import {
  EarlyBirdBadge,
  SpotsCounter,
  PricingCards,
  FeeSavingsCalculator,
  ContentSlider,
  StatsBar,
  FAQAccordion,
  FinalCTA,
} from '@/components/landing'
import { client, isSanityConfigured } from '../../sanity/lib/client'
import { groq } from 'next-sanity'

// Configuration
const SPOTS_TOTAL = 10
const SPOTS_TAKEN = 2
const SPOTS_LEFT = SPOTS_TOTAL - SPOTS_TAKEN

const features = [
  {
    name: 'Smartes Credit-System',
    description: 'FIFO-Prinzip, 4 Modi und volle Flexibilitat fur deine Kunden.',
    icon: CreditCard,
  },
  {
    name: 'Kursverwaltung',
    description: 'Erstelle Kursplane per Drag & Drop in Sekunden.',
    icon: Calendar,
  },
  {
    name: 'Trainer Management',
    description: 'Abrechnungen und Zugriffsrechte einfach verwaltet.',
    icon: Users,
  },
  {
    name: 'Analytics Dashboard',
    description: 'Verstehe dein Studio mit Echtzeit-Daten und Graphen.',
    icon: BarChart3,
  },
  {
    name: 'Design & Branding',
    description: 'Passe den Buchungskalender an deine CI-Farben an.',
    icon: Palette,
  },
  {
    name: 'Sicherheit',
    description: 'Verschlusselte Daten und Serverstandort Deutschland.',
    icon: Shield,
  },
]

const testimonials = [
  {
    quote: 'Endlich eine Software ohne versteckte Gebuhren! Unsere Marge ist seit dem Wechsel deutlich gestiegen.',
    author: 'Maria S.',
    role: 'Inhaberin',
    studio: 'Yoga Studio Munchen',
    rating: 5,
  },
  {
    quote: 'Das Credit-System ist genial. Unsere Kunden lieben die Flexibilitat und wir den geringen Verwaltungsaufwand.',
    author: 'Thomas K.',
    role: 'Geschaftsfuhrer',
    studio: 'CrossFit Box Berlin',
    rating: 5,
  },
  {
    quote: 'Die Trainer-Abrechnung lauft jetzt automatisch. Spart uns jeden Monat Stunden an Arbeit!',
    author: 'Sandra M.',
    role: 'Studio Managerin',
    studio: 'Pilates & More Hamburg',
    rating: 5,
  },
]

// Fetch blog posts from Sanity
const postsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc)[0...6] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  "category": category->{title, color}
}`

export default function HomePage() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])

  useEffect(() => {
    if (isSanityConfigured() && client) {
      client.fetch(postsQuery).then(setBlogPosts).catch(console.error)
    }
  }, [])

  return (
    <div className="bg-[var(--theme-background)]">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden min-h-[95vh] flex items-center">
        <LazyLiquidEther />

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 w-full">
          <div className="mx-auto max-w-4xl text-center">
            {/* Early Bird Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <EarlyBirdBadge spotsLeft={SPOTS_LEFT} />
            </motion.div>

            {/* Headline */}
            <SplitText
              text="Dein Studio verdient"
              tag="h1"
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--theme-text)]"
              delay={30}
              duration={0.6}
              ease="power3.out"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
            />
            <motion.div
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-lime-400 mt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              bessere Software
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg sm:text-xl leading-8 text-[var(--theme-textSecondary)] max-w-2xl mx-auto"
            >
              Keine versteckten Gebuhren. Volle Flexibilitat. Die moderne Plattform fur Yoga, Fitness und Wellness Studios, die dir gehort.
            </motion.p>

            {/* Spots Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <SpotsCounter total={SPOTS_TOTAL} taken={SPOTS_TAKEN} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <RegisterButton variant="primary" size="lg">
                Jetzt Platz sichern
              </RegisterButton>
              <Link
                href="/features"
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background)] text-[var(--theme-text)] font-medium hover:border-primary-500/50 transition-colors"
              >
                Demo ansehen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[var(--theme-textSecondary)]"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-500" />
                <span>Setup in 5 Min</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-500" />
                <span>DSGVO-konform</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-500" />
                <span>Jederzeit kundbar</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-[var(--theme-border)] flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary-500"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRICING SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[var(--theme-surface)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-[var(--theme-text)] mb-4"
            >
              Early Bird Angebot
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[var(--theme-textSecondary)]"
            >
              Sichere dir den Preis fur immer.
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <PricingCards spotsLeft={SPOTS_LEFT} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEE SAVINGS CALCULATOR
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FeeSavingsCalculator />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURES SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[var(--theme-surface)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-[var(--theme-text)] mb-4"
            >
              Alles was du brauchst
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[var(--theme-textSecondary)]"
            >
              Ohne den unnotigen Ballast.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 rounded-2xl bg-[var(--theme-background)] border border-[var(--theme-border)] hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[var(--theme-text)] mb-2">
                  {feature.name}
                </h3>
                <p className="text-sm text-[var(--theme-textSecondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTENT SLIDER (Blog + Docs)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ContentSlider blogPosts={blogPosts} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[var(--theme-surface)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-[var(--theme-text)]"
            >
              Das sagen unsere Kunden
            </motion.h2>
          </div>

          {/* Stats Bar */}
          <StatsBar />

          {/* Testimonials Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col justify-between p-8 rounded-2xl bg-[var(--theme-background)] border border-[var(--theme-border)] hover:shadow-lg transition-shadow"
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[var(--theme-textSecondary)] leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="mt-6 pt-6 border-t border-[var(--theme-border)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-lime-400" />
                  <div>
                    <p className="font-bold text-sm text-[var(--theme-text)]">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-[var(--theme-textTertiary)]">
                      {testimonial.role}, {testimonial.studio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FAQAccordion />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <FinalCTA spotsLeft={SPOTS_LEFT} />
    </div>
  )
}
