/* =========================================================
   Tailwind CDN Config — منزل الحكمة
   يحتوي على كل الألوان والخطوط والامتدادات المستخدمة بالموقع
   ========================================================= */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0c2340",
        "ink-soft": "#1a4a6e",
        cream: "#f7f5f1",
        background: "#f7f5f1",
        foreground: "#0c2340",
        card: "#ffffff",
        muted: "#eef1f4",
        "muted-foreground": "#506982",
        border: "#0c234019",
        teal: "#2d8a9e",
        seafoam: "#5cbdb9",
        primary: "#2d8a9e",
        "primary-deep": "#1a4a6e",
        "primary-soft": "#e8f2f2",
        gold: "#b8935a",
        "gold-soft": "#f0e6d4",
      },
      fontFamily: {
        display: ["Cairo", "system-ui", "sans-serif"],
        body: ["Cairo", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        elegant: "0 30px 80px -30px rgba(12,35,64,0.55)",
        card: "0 14px 40px -20px rgba(12,35,64,0.3)",
        glow: "0 0 80px rgba(45,138,158,0.4)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #061a30 0%, #0c2340 45%, #1a4a6e 100%)",
        "gradient-teal": "linear-gradient(120deg, #2d8a9e 0%, #5cbdb9 100%)",
        "gradient-soft": "linear-gradient(180deg, #f7f5f1 0%, #ffffff 100%)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-33.333%)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.05) translate(0,0)" },
          "100%": { transform: "scale(1.18) translate(-1%,-1%)" },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "float-y": "float-y 5s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        "ken-burns": "ken-burns 8s ease-out both",
        "fade-in-up": "fade-in-up 0.6s ease both",
      },
    },
  },
};
