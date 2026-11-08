declare module "react-katex" {
  import type { ComponentType, HTMLAttributes, ReactNode } from "react";

  export type MathComponentProps = HTMLAttributes<HTMLElement> & {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => ReactNode;
  };

  export const BlockMath: ComponentType<MathComponentProps>;
  export const InlineMath: ComponentType<MathComponentProps>;
}
