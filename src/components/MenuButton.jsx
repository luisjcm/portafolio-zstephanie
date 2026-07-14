// src/components/MenuButton.jsx
import { motion } from 'framer-motion';

export default function MenuButton({ isOpen, onClick }) {
  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    opened: (y) => ({ rotate: y === 0 ? 45 : -45, y: y === 0 ? 6 : -6 })
  };

  return (
    <button onClick={onClick} className="relative z-50 p-2 md:hidden">
      <motion.div animate={isOpen ? "opened" : "closed"} className="flex flex-col gap-1.5">
        <motion.div variants={lineVariants} custom={0} className="w-6 h-0.5 bg-text-primary rounded-full" />
        <motion.div variants={lineVariants} custom={1} className="w-6 h-0.5 bg-text-primary rounded-full" />
      </motion.div>
    </button>
  );
}