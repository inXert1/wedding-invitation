'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Heart, Clock, Phone, Mail, Gift, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const RSVP = () => {
  const { t } = useTranslation('home');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: '1',
    dietaryRestrictions: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          attendance: '',
          guests: '1',
          dietaryRestrictions: '',
          message: '',
        });
      }, 4000);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to send RSVP. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="py-14 px-4 bg-snow">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-snow rounded-3xl p-12 shadow-xl border border-amethyst/10"
          >
            <div className="w-20 h-20 bg-amethyst/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-amethyst-dark" />
            </div>
            <h3 className="text-4xl sm:text-6xl md:text-8xl font-bruney text-midnight mb-4">
              {t('rsvp.thank-you')}
            </h3>
            <p className="text-midnight/60 text-base sm:text-lg md:text-xl font-cormorant">
              {t('rsvp.thank-you-received')}
            </p>
            <div className="mt-6">
              <Heart className="w-6 h-6 text-amethyst mx-auto" fill="currentColor" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="py-14 px-4 bg-snow"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bruney text-midnight mb-4">
            {t('rsvp.title')}
          </h2>
          <div className="w-24 h-px bg-amethyst mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-midnight/60 max-w-2xl mx-auto font-cormorant">
            {t('rsvp.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-snow rounded-3xl p-6 shadow-xl border border-amethyst/10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bruney text-midnight mb-4 text-center">
                {t('rsvp.confirm-attendance')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-midnight/70 mb-2 font-dm-sans"
                  >
                    {t('rsvp.full-name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-amethyst/20 rounded-xl focus:ring-2 focus:ring-amethyst focus:border-transparent outline-none transition-all duration-300 bg-snow-warm font-dm-sans"
                    placeholder={t('rsvp.full-name')}
                  />
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-midnight/70 mb-2 font-dm-sans"
                  >
                    {t('rsvp.email-address')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-amethyst/20 rounded-xl focus:ring-2 focus:ring-amethyst focus:border-transparent outline-none transition-all duration-300 bg-snow-warm font-dm-sans"
                    placeholder={t('rsvp.email-address')}
                  />
                </div>
                {/* Attendance */}
                <div>
                  <label
                    htmlFor="attendance"
                    className="block text-xs sm:text-sm font-medium text-midnight/70 mb-2 font-dm-sans"
                  >
                    {t('rsvp.will-attend')} *
                  </label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-amethyst/20 rounded-xl focus:ring-2 focus:ring-amethyst focus:border-transparent outline-none transition-all duration-300 bg-snow-warm font-dm-sans"
                  >
                    <option value="">{t('rsvp.please-select')}</option>
                    <option value="yes">{t('rsvp.yes-there')}</option>
                    <option value="no">{t('rsvp.no-cant')}</option>
                  </select>
                </div>

                {/* Dietary Restrictions */}
                {formData.attendance === 'yes' && (
                  <div>
                    <label
                      htmlFor="dietaryRestrictions"
                      className="block text-xs sm:text-sm font-medium text-midnight/70 mb-2 font-dm-sans"
                    >
                      {t('rsvp.dietary-restrictions')}
                    </label>
                    <input
                      type="text"
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-amethyst/20 rounded-xl focus:ring-2 focus:ring-amethyst focus:border-transparent outline-none transition-all duration-300 bg-snow-warm font-dm-sans"
                      placeholder={t('rsvp.dietary-placeholder')}
                    />
                  </div>
                )}
                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium text-midnight/70 mb-2 font-dm-sans"
                  >
                    {t('rsvp.message-couple')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-amethyst/20 rounded-xl focus:ring-2 focus:ring-amethyst focus:border-transparent outline-none transition-all duration-300 resize-none bg-snow-warm font-dm-sans"
                    placeholder={t('rsvp.message-placeholder')}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-midnight text-snow py-4 px-6 rounded-xl font-medium text-base sm:text-lg hover:bg-midnight-light transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-dm-sans cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 touch-manipulation"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('rsvp.sending')}
                    </>
                  ) : (
                    t('rsvp.send-rsvp')
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* RSVP Deadline */}
            <div className="bg-snow rounded-2xl p-5 shadow-lg border border-amethyst/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amethyst/10 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-5 h-5 text-amethyst-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-midnight text-sm sm:text-base font-dm-sans">
                    {t('rsvp.deadline')}
                  </h4>
                  <p className="text-midnight/60 text-xs sm:text-sm font-dm-sans">
                    {t('rsvp.deadline-date')}
                  </p>
                </div>
              </div>
              <p className="text-midnight/60 text-xs sm:text-sm font-dm-sans">
                {t('rsvp.deadline-help')}
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-snow rounded-2xl p-5 shadow-lg border border-amethyst/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-midnight/10 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-5 h-5 text-midnight" />
                </div>
                <div>
                  <h4 className="font-semibold text-midnight text-sm sm:text-base font-dm-sans">
                    {t('rsvp.questions')}
                  </h4>
                  <p className="text-midnight/60 text-xs sm:text-sm font-dm-sans">
                    {t('rsvp.questions-help')}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-midnight/60 font-dm-sans">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amethyst" />
                  marisjoefren@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amethyst" />
                  +63 992 319 1488
                </p>
              </div>
            </div>

            {/* RSVP Guidelines */}
            <div className="bg-snow rounded-2xl p-5 shadow-lg border border-amethyst/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amethyst/10 rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-5 h-5 text-amethyst-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-midnight text-sm sm:text-base font-dm-sans">
                    {t('rsvp.guidelines-title')}
                  </h4>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-midnight/70 font-dm-sans leading-relaxed">
                <p className="font-medium text-midnight">{t('rsvp.guidelines-intro')}</p>

                <ul className="space-y-2 pl-1 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-amethyst-dark mt-1.5">•</span>
                    <span>{t('rsvp.guidelines-item1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amethyst-dark mt-1.5">•</span>
                    <span>{t('rsvp.guidelines-item2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amethyst-dark mt-1.5">•</span>
                    <span>{t('rsvp.guidelines-item3')}</span>
                  </li>
                </ul>

                <p className="italic text-midnight/60 pt-1">
                  {t('rsvp.guidelines-outro')}
                </p>

                <p className="font-bruney text-lg text-amethyst-dark text-right pt-2">
                  {t('rsvp.guidelines-signature')}
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};
