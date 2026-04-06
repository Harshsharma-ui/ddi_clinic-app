@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", sans-serif;
}

@variant dark (&:where(.dark, .dark *));

@layer base {
  body {
    @apply font-sans antialiased;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-slate-200 dark:bg-white/10 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-300 dark:bg-white/20;
}
