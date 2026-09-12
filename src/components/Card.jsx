import { motion } from "framer-motion";

export default function Card({ children, className="", hover=false, ...props }) {
  const Comp = hover ? motion.div : "div";
  const motionProps = hover ? { whileHover: { y: -2 } } : {};
  return (
    <Comp
      {...motionProps}
      className={`rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
