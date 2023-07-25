import { motion } from "framer-motion";

const opacityAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

function PageTransition({ children }) {
  return (
    <motion.div
      className="page"
      transition={{
        ease: "easeInOut",
        duration: 0.6,
      }}
      variants={opacityAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
