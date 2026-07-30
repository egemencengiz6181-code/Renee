'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone } from 'lucide-react';
import { useEffect } from 'react';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="contact-backdrop"
            className="fixed inset-0 z-[100] bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="contact-modal"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative w-full max-w-md my-auto rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{
                background: 'rgba(8, 8, 18, 0.90)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top shimmer line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="px-8 pt-9 pb-6 text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-5"
                  style={{
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    color: '#a78bfa',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  Bize Ulaşın
                </span>
                <h2 className="text-2xl font-bold text-white mb-2">Kayıt &amp; Bilgi Al</h2>
                <p className="text-white/35 text-sm leading-relaxed">
                  Aşağıdaki kanallardan bize kolayca ulaşabilirsiniz.
                </p>
              </div>

              {/* Divider */}
              <div className="mx-8 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

              {/* Contact buttons */}
              <div className="px-8 py-7 flex flex-col gap-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/905426955641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'rgba(37,211,102,0.08)',
                    border: '1px solid rgba(37,211,102,0.18)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(37,211,102,0.15)';
                    e.currentTarget.style.border = '1px solid rgba(37,211,102,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(37,211,102,0.08)';
                    e.currentTarget.style.border = '1px solid rgba(37,211,102,0.18)';
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#25D366] shrink-0 transition-colors duration-300"
                    style={{ background: 'rgba(37,211,102,0.15)' }}
                  >
                    <WhatsAppIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm mb-0.5">WhatsApp Hattı</p>
                    <p className="text-white/45 text-xs">+90 542 695 56 41</p>
                  </div>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-[#25D366]/50 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Phone */}
                <a
                  href="tel:02125517273"
                  className="group flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'rgba(139,92,246,0.08)',
                    border: '1px solid rgba(139,92,246,0.18)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139,92,246,0.15)';
                    e.currentTarget.style.border = '1px solid rgba(139,92,246,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(139,92,246,0.08)';
                    e.currentTarget.style.border = '1px solid rgba(139,92,246,0.18)';
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-violet-400 shrink-0 transition-colors duration-300"
                    style={{ background: 'rgba(139,92,246,0.15)' }}
                  >
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm mb-0.5">Telefon ile Ara</p>
                    <p className="text-white/45 text-xs">0212 551 72 73</p>
                  </div>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-violet-400/50 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Footer note */}
              <p className="text-center text-white/20 text-xs pb-8">
                Hafta içi 09:00 – 19:00 arası hizmetinizdeyiz
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
