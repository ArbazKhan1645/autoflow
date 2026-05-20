"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
