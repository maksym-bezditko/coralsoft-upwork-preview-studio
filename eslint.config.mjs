import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // The variant compositions and the export pipeline rely on plain <img>
      // elements (data URLs + same-origin SVG logos) so html-to-image can
      // inline them reliably; next/image's optimizer layer breaks that.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
