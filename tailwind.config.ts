import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            text: "#0C1012",
            "text-muted": "#868889",
            "primary-1": "#72929E",
            "primary-2": "#8EA8B1",
            "primary-3": "#AABEC5",
            "primary-4": "#D1DBDF",
            "primary-5": "#E3E9EC",
            "secondary-1": "#C6ABC5",
            "secondary-2": "#D1BCD1",
            "secondary-3": "#DDCDDC",
            "secondary-4": "#E8DDE8",
            "secondary-5": "#F4EEF3",
            background: "#C6ABC5",
            "neutral-2": "#C5C6C7",
            "neutral-3": "#949595",
            "neutral-4": "#626364",
            "neutral-5": "#313232",
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
