import { MotionValue, useSpring, useTransform } from 'framer-motion';

type Transformer = (value: number) => number;

type SpringOptions = {
    stiffness: number;
    damping: number;
};

export function useSmoothTransform(
    value: MotionValue<number>,
    springOptions: SpringOptions,
    transformer: Transformer
) {
    return useSpring(useTransform(value, transformer), springOptions);
}
