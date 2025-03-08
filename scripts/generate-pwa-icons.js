import fs from "fs";
import path from "path";
import sharp from "sharp";

const SOURCE_IMAGE = path.resolve("public/images/foto6.png");
const OUTPUT_DIR = path.resolve("public/icons");

// Certifique-se de que o diretório de saída existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Tamanhos dos ícones PWA
const sizes = [192, 512];

async function generateIcons() {
  try {
    console.log(`Gerando ícones PWA a partir de ${SOURCE_IMAGE}...`);

    for (const size of sizes) {
      const outputFile = path.join(OUTPUT_DIR, `pwa-${size}x${size}.png`);

      await sharp(SOURCE_IMAGE)
        .resize(size, size, { fit: "cover" })
        .toFile(outputFile);

      console.log(`Ícone ${size}x${size} gerado: ${outputFile}`);
    }

    console.log("Todos os ícones PWA foram gerados com sucesso!");
  } catch (error) {
    console.error("Erro ao gerar ícones PWA:", error);
  }
}

generateIcons();
