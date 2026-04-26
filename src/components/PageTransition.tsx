import { motion } from "framer-motion";
import { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16, scale: 0.995 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.995 }}
    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
