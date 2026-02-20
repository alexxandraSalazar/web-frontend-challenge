/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
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
            backgroundImage: {
                'card-green': 'linear-gradient(126.07deg, #00593B 28.93%, #096C4B 91.51%)',
                'card-dark-blue': 'linear-gradient(119.56deg, #0B102E 23.9%, #121741 93.45%)',
                'card-gray': 'linear-gradient(126.07deg, #1F1F1F 28.93%, #272727 91.51%)',
            },
            fontFamily: {
                sans: ["var(--font-poppins)"],
                lato: ["var(--font-lato)"], 
                quicksand: ["var(--font-quicksand)"], 
            },
            fontSize: {
                h1: ["20px", { lineHeight: "24px", fontWeight: "600" }],
                sidebarBase: ["14px", { lineHeight: "18px", fontWeight: "500" }],
                sidebarStrong: ["16px", { lineHeight: "21px", fontWeight: "600" }],
                bodyMedium: ["16px", { lineHeight: "21px", fontWeight: "500" }],
                caption: ["12px", { lineHeight: "21px", fontWeight: "400" }],
                label: ["14px", { lineHeight: "18px", fontWeight: "600" }],
                input: ["14px", { lineHeight: "21px", fontWeight: "500" }],
                selectInput: ["14px", { lineHeight: "18px", fontWeight: "400" }],
                'card-number': ["21.49px", { lineHeight: "100%", fontWeight: "500" }],
                'card-name': ["12.62px", { lineHeight: "100%", fontWeight: "500" }],
                'card-expire': ["7.18px", { lineHeight: "100%", fontWeight: "500" }],
            },
            letterSpacing: {
                tightCustom: "0.1px",
            },
            width: {
                70: "280px",
            },
        },
    },
    plugins: [],

};

export default config;
