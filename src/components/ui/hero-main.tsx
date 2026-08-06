"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, Maximize2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ContactPopup from "@/components/shared/ContactPopup";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SLIDES = [
  {
    src: "/slider/basari-bina.jpeg",
    width: 1023,
    height: 1537,
    alt: "Bahçelievler'de 4 sene üst üste ilk 1000'de öğrenci çıkaran tek kurum - Sevinç Kurs Merkezi",
    caption: "4 Sene Üst Üste İlk 1000",
  },
  {
    src: "/slider/yks-303-abdullah-yildirim.jpeg",
    width: 1086,
    height: 1448,
    alt: "2026 YKS Türkiye 303.'sü Abdullah Yıldırım - Sevinç Kurs Merkezi",
    caption: "2026 YKS Türkiye 303.'sü",
  },
];

export default function HeroMain() {
  const t = useTranslations("HeroMain");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, close]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 lg:py-24">
      {/* ── SIMPLE GRADIENT BACKGROUND ── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background to-muted" />

      {/* ── SCHOOL IMAGE BACKGROUND ──────────────────────────── */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <Image
          src="/okul2/unnamed-6.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.06]"
          sizes="100vw"
          quality={30}
          loading="eager"
          priority
        />
      </div>

      {/* ── VIGNETTE OVERLAY ─────────────────────────────────── */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(255,255,255,0.85)_100%)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

      {/* ── SUBTLE GLOW (no blur) ──────────────────────────────────────── */}
      <div
        className="absolute z-[2] w-[500px] h-[500px] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, #E35205 0%, #A03500 50%, transparent 80%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ── CONTENT (z-10) ───────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* ── LEFT: COPY ── */}
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E35205]/30 bg-[#E35205]/10 mb-6 sm:mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E35205] animate-pulse" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E35205]/80">
                Bahçelievler / İstanbul
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-[1.06] text-slate-900 dark:text-white mb-6"
            >
              {t("title_prefix")}{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(to right, #FF9E7F, #E35205, #A03500)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  display: "inline-block",
                }}
              >
                {t("title_highlight")}
              </span>
              <br />
              {t("title_suffix")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg text-slate-500 dark:text-white/40 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTA */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <ContactPopup>
                <span className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E35205] hover:bg-[#A03500] text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_32px_rgba(227,82,5,0.45)] hover:shadow-[0_0_48px_rgba(227,82,5,0.6)]">
                  <MessageCircle className="w-4 h-4" />
                  {t("cta")}
                  <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </span>
              </ContactPopup>
            </motion.div>
          </div>

          {/* ── RIGHT: SLIDER GÖRSELLERİ (yan yana) ── */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative w-full max-w-[440px] sm:max-w-[560px] lg:max-w-none mx-auto"
          >
            {/* Arka plan parıltısı */}
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-40"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 40%, rgba(227,82,5,0.28) 0%, transparent 70%)",
              }}
            />

            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`${slide.caption} görselini büyüt`}
                  className="group relative block w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-900/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E35205] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={slide.width}
                    height={slide.height}
                    priority
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 270px, 300px"
                    className="w-full h-full aspect-[3/4] object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                  />

                  {/* Alt karartma + başlık */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                  <span className="pointer-events-none absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 text-left text-[10px] sm:text-xs font-semibold leading-snug text-white drop-shadow">
                    {slide.caption}
                  </span>

                  {/* Büyüt ikonu */}
                  <span className="pointer-events-none absolute top-2 right-2 sm:top-3 sm:right-3 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/45 text-white opacity-80 transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM FADE ──────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-auto"
            >
              <Image
                src={SLIDES[lightbox].src}
                alt={SLIDES[lightbox].alt}
                width={SLIDES[lightbox].width}
                height={SLIDES[lightbox].height}
                sizes="(max-width: 768px) 92vw, 60vw"
                className="max-h-[88vh] w-auto rounded-xl object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
