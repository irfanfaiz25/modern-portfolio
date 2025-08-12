import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export const useOptimizedAnimation = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Deteksi performa device
    const checkPerformance = () => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isLowEndDevice =
        navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
      const hasLowMemory =
        navigator.deviceMemory && navigator.deviceMemory <= 2;

      setIsLowPerformance(isMobile || isLowEndDevice || hasLowMemory);
    };

    checkPerformance();
  }, []);

  const getOptimizedProps = (animationProps) => {
    if (shouldReduceMotion || isLowPerformance) {
      return {
        ...animationProps,
        animate: {},
        transition: { duration: 0.1 },
      };
    }
    return animationProps;
  };

  const getSimplifiedAnimation = (complexAnimation, simpleAnimation) => {
    return shouldReduceMotion || isLowPerformance
      ? simpleAnimation
      : complexAnimation;
  };

  return {
    shouldReduceMotion,
    isLowPerformance,
    getOptimizedProps,
    getSimplifiedAnimation,
  };
};
