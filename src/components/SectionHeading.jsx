// src/components/SectionHeading.jsx
// Cabecera compartida de sección: kicker + título + ornamento con el monograma ZS.
// El monograma es SIEMPRE el archivo de imagen oficial (el dorado no se replica con CSS).
import { motion } from 'framer-motion';
import zsLogo from '../assets/zs-logo.png';

// tone = color del FONDO donde vive la cabecera
const TONES = {
  dark:    { kicker: 'text-brand-primary',   title: 'text-text-primary', line: 'bg-brand-ivory/20' },
  light:   { kicker: 'text-brand-primary',   title: 'text-brand-crimson', line: 'bg-brand-crimson/20' },
  crimson: { kicker: 'text-brand-ivory/70',  title: 'text-text-primary', line: 'bg-brand-ivory/25' },
};

export default function SectionHeading({ kicker, title, tone = 'dark', align = 'center' }) {
  const t = TONES[tone];
  const left = align === 'left';

  return (
    <div className={`mb-14 md:mb-20 ${left ? 'text-center md:text-left' : 'text-center'}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        className={`${t.kicker} font-semibold tracking-[0.25em] uppercase mb-3 text-xs md:text-sm`}
      >
        {kicker}
      </motion.h2>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ delay: 0.1 }}
        className={`${t.title} text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight`}
      >
        {title}
      </motion.h3>

      {/* Ornamento: línea — monograma — línea */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ delay: 0.2 }}
        className={`mt-6 flex items-center gap-4 ${left ? 'justify-center md:justify-start' : 'justify-center'}`}
      >
        <span className={`h-px w-12 md:w-20 ${t.line}`}></span>
        <img src={zsLogo} alt="" aria-hidden="true" width="205" height="280" className="h-9 w-auto" />
        <span className={`h-px w-12 md:w-20 ${t.line}`}></span>
      </motion.div>
    </div>
  );
}
