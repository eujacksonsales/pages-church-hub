/* Evita que o PostCSS carregue o config global (ex.: D:\postcss.config.cjs)
   que referencia tailwindcss. Este projeto usa Tailwind v4 via @tailwindcss/vite. */
module.exports = {
  plugins: [],
};
