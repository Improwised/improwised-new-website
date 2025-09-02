import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
		"!./src/components/BlogContent.astro"
	],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			screens: {
				'xs': '576px',
			},
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				colorprimarytext: {
					DEFAULT: "hsl(var(--color-primary-text) / <alpha-value>)",
				},
				blueHover: "var(--hover-blue)",
				firstColor: "var(--text-first-color)",
				secondColor: "var(--text-second-color)",
				thirdColor: "var(--text-third-color)",
				fourthColor: "var(--text-fourth-color)",
				fifthColor: "var(--text-fifth-color)",
				mainHeadingColor: "var(--main-heading-color)",
				subHeadingColor: "var(--sub-heading-color)",
				carouselBtn: "var(--next-previous-btn)",
				carouselBtnText: "var(--carousel-btn-text)",
				cardBg: "var(--card-bg)",
				cardBorder: "var(--card-border)",
				careerCard: "var(--career-card)",
				navbarBg: "var(--navbar-bg)",
				badgeBorder: "var(--badge-border)",
				commonBorder: "var(--section-border)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				primary2: {
					DEFAULT: "var(--primary2)",
					foreground: "hsl(var(--primary2-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				darkgreen: {
					DEFAULT: "hsl(var(--darkgreen) / <alpha-value>)",
					foreground: "hsl(var(--darkgreen-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
				manrope: ["Manrope", "sans-serif"],
			}
		}
	},
};

export default config;
