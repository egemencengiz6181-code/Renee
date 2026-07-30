"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle } from "lucide-react";

interface ContactPopupProps {
  children: React.ReactNode;
}

export default function ContactPopup({ children }: ContactPopupProps) {
  const [open, setOpen] = useState(false);

  // ── Lock body scroll when modal opens ──
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Trigger — renders whatever is passed as children */}
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {/* Overlay + Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] bg-black/60 "
              onClick={() => setOpen(false)}
            />

            {/* Card */}
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="fixed z-[201] inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="pointer-events-auto w-[92vw] max-w-[380px] rounded-3xl bg-white dark:bg-[#0e0e14] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative px-6 pt-6 pb-4 text-center">
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                    aria-label="Kapat"
                  >
                    <X className="w-4 h-4 text-black/60 dark:text-white/60" />
                  </button>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E35205]/10 border border-[#E35205]/20 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E35205] animate-pulse" />
                    <span className="text-xs font-semibold text-[#E35205] uppercase tracking-wider">Kayıt &amp; Bilgi Al</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    Nasıl ulaşmak istersiniz?
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-white/40 mt-1">
                    Hemen arayın veya WhatsApp'tan yazın.
                  </p>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex flex-col gap-3">
                  {/* Call */}
                  <a
                    href="tel:02125054001"
                    className="group flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-[#E35205] hover:bg-[#c94904] active:scale-[0.97] transition-all duration-200 shadow-[0_4px_20px_rgba(227,82,5,0.35)]"
                    onClick={() => setOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm leading-none">Arama Yap</p>
                      <p className="text-white/75 text-xs mt-1">0212 505 40 01</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/905435094151"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-[#25D366] hover:bg-[#1fbb58] active:scale-[0.97] transition-all duration-200 shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
                    onClick={() => setOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm leading-none">WhatsApp Bilgi Hattı</p>
                      <p className="text-white/75 text-xs mt-1">0543 509 41 51</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
