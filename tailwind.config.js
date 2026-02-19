/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#FFFFFF",
                primary: "#272727",
                black: "#000000",
                grayContent: "#8D918D",
                inputText: "#6B6B6B",
                sidebarBg: "#F9FAF9",
                greenPrimary: "#00593B",
                greenLight: "#3B8668",
                greenPastel: "#EDF5F2",
            },
            fontFamily: {
                sans: ["var(--font-poppins)"],
            },
            fontSize: {
                h1: ["20px", { lineHeight: "24px", fontWeight: "600" }],
                sidebarBase: ["14px", { lineHeight: "18px", fontWeight: "500" }],
                sidebarStrong: ["16px", { lineHeight: "21px", fontWeight: "600" }],
                bodyMedium: ["16px", { lineHeight: "21px", fontWeight: "500" }],
                caption: ["12px", { lineHeight: "21px", fontWeight: "400" }],
                label: ["14px", { lineHeight: "18px", fontWeight: "600" }],
                input: ["14px", { lineHeight: "21px", fontWeight: "500" }],
            },
            letterSpacing: {
                tightCustom: "0.1px",
            },
        },
    },
    plugins: [],
};

export default config;
