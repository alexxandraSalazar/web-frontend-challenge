import * as React from "react";
import { JSX } from "react/jsx-runtime";
const StepCheckIconComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
    <svg
        width={25}
        height={25}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <ellipse
            cx={12.4096}
            cy={12.5048}
            rx={12.4096}
            ry={12.5048}
            fill="#3B8668"
        />
        <path
            d="M8.09326 12.5048L11.4847 15.7669L16.726 9.24266"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default StepCheckIconComponent;
