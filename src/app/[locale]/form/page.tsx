"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export default function FormPage() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    grade: "",
    currentSchool: "",
    district: "",
    program: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const message = `
Öğrenci: ${formData.studentName}
Veli: ${formData.parentName}
Telefon: ${formData.phone}
E-posta: ${formData.email || "-"}
Sınıf: ${formData.grade}
Mevcut Okul: ${formData.currentSchool}
İlçe: ${formData.district}
İlgilendiği Program: ${formData.program}
Not: ${formData.note || "-"}
      `.trim();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.studentName} (Veli: ${formData.parentName})`,
          email: formData.email || "form@landing.com",
          subject: `Reklam Formu - ${formData.grade} - ${formData.program}`,
          message: message,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Form gönderimi başarısız:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (success) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-muted px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Başvurunuz Alındı!
          </h2>
          <p className="text-slate-500 dark:text-white/60">
            En kısa sürede sizinle iletişime geçeceğiz.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-muted px-6 py-20">
      {/* Logo */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute top-8 left-1/2 -translate-x-1/2"
      >
        <Image
          src="/logos/Sevinc-Kurs-Logo.png"
          alt="Bahçelievler Sevinç Dershanesi"
          width={120}
          height={120}
          className="object-contain"
        />
      </motion.div>

      {/* Form Container */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-2xl mx-auto mt-32"
      >
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-black/10 dark:border-white/10 p-8 shadow-[0_20px_60px_rgba(227,82,5,0.15)]">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E35205]/30 bg-[#E35205]/10 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E35205] animate-pulse" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E35205]/80">
                Kayıt Formu
              </span>
            </motion.div>
            <motion.h1
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-3xl font-bold text-slate-900 dark:text-white mb-2"
            >
              Başvuru Formu
            </motion.h1>
            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-slate-500 dark:text-white/60"
            >
              Lütfen aşağıdaki bilgileri eksiksiz doldurunuz.
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Öğrenci Adı Soyadı */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-slate-700 dark:text-white/80">
                Öğrenci Adı Soyadı <span className="text-[#E35205]">*</span>
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none focus:border-[#E35205] transition-colors"
                placeholder="Örn: Ahmet Yılmaz"
              />
            </motion.div>

            {/* Veli Adı Soyadı */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-slate-700 dark:text-white/80">
                Veli Adı Soyadı <span className="text-[#E35205]">*</span>
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none focus:border-[#E35205] transition-colors"
                placeholder="Örn: Mehmet Yılmaz"
              />
            </motion.div>

            {/* Telefon */}
            <motion.div
              custom={7}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-slate-700 dark:text-white/80">
                Telefon Numarası <span className="text-[#E35205]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none focus:border-[#E35205] transition-colors"
                placeholder="0555 555 55 55"
              />
            </motion.div>

            {/* E-posta (opsiyonel) */}
            <motion.div
              custom={8}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-slate-700 dark:text-white/80">
                E-posta
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none focus:border-[#E35205] transition-colors"
                placeholder="ornek@email.com"
              />
            </motion.div>

            {/* Sınıf */}
            <motion.div
              custom={9}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-slate-700 dark:text-white/80">
                Önümüzdeki Yıl Sınıfı <span className="text-[#E35205]">*</span>
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-[#E35205] transition-colors"
              >
                <option value="">Seçiniz</option>
                <option value="9. Sınıf">9. Sınıf</option>
                <option value="10. Sınıf">10. Sınıf</option>
                <option value="11. Sınıf">11. Sınıf</option>
                <option value="12. Sınıf">12. Sınıf</option>
                <option value="Mezun">Mezun</option>
              </select>
            </motion.div>

            {/* Mevcut Okul */}
            <motion.div
              custom={10}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-slate-700 dark:text-white/80">
                Mevcut Okulu <span className="text-[#E35205]">*</span>
              </label>
              <input
                type="text"
                name="currentSchool"
                value={formData.currentSchool}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none focus:border-[#E35205] transition-colors"
                placeholder="Örn: Bahçelievler Anadolu Lisesi"
              />
            </motion.div>

            {/* İlçe */}
            <motion.div
              custom={11}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-slate-700 dark:text-white/80">
                Bulunduğunuz İlçe <span className="text-[#E35205]">*</span>
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none focus:border-[#E35205] transition-colors"
                placeholder="Örn: Bahçelievler"
              />
            </motion.div>

            {/* Program */}
            <motion.div
              custom={12}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-slate-700 dark:text-white/80">
                İlgilendiğiniz Program <span className="text-[#E35205]">*</span>
              </label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-[#E35205] transition-colors"
              >
                <option value="">Seçiniz</option>
                <option value="Lise Programları">Lise Programları</option>
                <option value="Mezun Programları">Mezun Programları</option>
                <option value="VIP Programlar">VIP Programlar</option>
                <option value="Destek & Analiz">Destek & Analiz</option>
                <option value="Henüz Karar Vermedim">
                  Henüz Karar Vermedim
                </option>
              </select>
            </motion.div>

            {/* Not (opsiyonel) */}
            <motion.div
              custom={13}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-slate-700 dark:text-white/80">
                Ek Not
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={4}
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none focus:border-[#E35205] transition-colors resize-none"
                placeholder="Eklemek istediğiniz herhangi bir not..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              custom={14}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              type="submit"
              disabled={loading}
              className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#E35205] hover:bg-[#A03500] text-white font-semibold text-base tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_32px_rgba(227,82,5,0.45)] hover:shadow-[0_0_48px_rgba(227,82,5,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  Başvuruyu Gönder
                  <ArrowRight className="w-5 h-5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
