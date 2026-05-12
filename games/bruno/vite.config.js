import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(rootDir, "src");

const uiDir = path.resolve(srcDir, "components/blackjack/ui");

export default defineConfig({
  // avalik host alamteel (nt vocoprojektid.ee/ita25games/games/bruno/)
  base: "/ita25games/games/bruno/",
  // Ilma @base44/vite-plugin — see lisab Windowsil vigase aliasi "@/" -> "/src/".
  // shadcn impordid viitavad @/components/ui, failid on components/blackjack/ui all.
  resolve: {
    alias: [
      { find: "@/components/ui", replacement: uiDir },
      { find: /^@\/(.*)$/, replacement: `${srcDir}/$1` },
    ],
  },
  plugins: [react()],
});
