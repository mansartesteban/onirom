import { defineConfig } from "vite";
import path from "path";

const root = path.resolve(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(root, "src"),
      "@styles": path.join(root, "public", "assets", "styles"),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});
