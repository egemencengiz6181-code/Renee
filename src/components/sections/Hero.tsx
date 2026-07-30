'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {useState} from 'react';
import ContactModal from '@/components/shared/ContactModal';

const wordVariants = {
  hidden: {opacity: 0, y: 20},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUp = {
  hidden: {opacity: 0, y: 20},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

interface HeroProps {
  locale: string;
}

export default function Hero({locale}: HeroProps) {
  const t = useTranslations('Hero');
  const headline = t('headline');
  const words = headline.split(' ');
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted" />
      
      {/* Subtle glow (no blur) */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #6d28d9 0%, transparent 50%)',
        }}
      />

      {/* Fine horizontal rule at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        initial={{scaleX: 0, opacity: 0}}
        animate={{scaleX: 1, opacity: 1}}
        transition={{duration: 1.2, ease: 'easeOut'}}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow tag */}
        <motion.div
          className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary-light text-xs font-medium tracking-widest uppercase"
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.1}}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Şirinevler Final Dershanesi
        </motion.div>

        {/* Animated headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em] last:mr-0 bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent"
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Slogan */}
        <motion.p
          className="text-base sm:text-lg text-foreground/45 font-light max-w-xl mx-auto mb-12 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={words.length + 1}
        >
          {t('slogan')}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={words.length + 2}
        >
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-sm tracking-wide text-white overflow-hidden transition-all duration-300"
          >
            {/* Glow layer */}
            <span className="absolute inset-0 rounded-full bg-primary opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Inner border shine */}
            <span className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <span className="relative">{t('cta')}</span>
            <motion.span
              className="relative"
              animate={{x: [0, 4, 0]}}
              transition={{duration: 1.8, repeat: Infinity, ease: 'easeInOut'}}
            >
              →
            </motion.span>
          </button>
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 2, duration: 1}}
        >
          <span className="text-foreground/20 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent"
            animate={{scaleY: [0, 1, 0], originY: 0}}
            transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
          />
        </motion.div>
      </div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
