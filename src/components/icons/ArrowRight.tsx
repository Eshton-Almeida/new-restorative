import { SVGProps } from "react";

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="19"
      height="12"
      viewBox="0 0 19 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 6.12061H17M17 6.12061L11.6316 1.12061M17 6.12061L11.6316 11.1206"
        stroke="currentColor"
        strokeWidth={props.strokeWidth || "2"}
      />
    </svg>
  );
}
