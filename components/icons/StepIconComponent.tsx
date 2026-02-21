import * as React from "react";
import { JSX } from "react";
const StepIconComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
    <svg
        width={41}
        height={41}
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g filter="url(#filter0_d_553_1334)">
            <ellipse
                cx={20.4096}
                cy={16.5048}
                rx={12.4096}
                ry={12.5048}
                fill="white"
            />
        </g>
        <ellipse
            cx={20.4095}
            cy={16.5047}
            rx={4.27917}
            ry={4.31199}
            fill="#3B8668"
        />
        <defs>
            <filter
                id="filter0_d_553_1334"
                x={0}
                y={0}
                width={40.8191}
                height={41.0095}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy={4} />
                <feGaussianBlur stdDeviation={4} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_553_1334"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_553_1334"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);
export default StepIconComponent;
