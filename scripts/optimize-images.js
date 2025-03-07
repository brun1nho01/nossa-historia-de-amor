import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

// Obter o diretório atual em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const OUTPUT_DIR = IMAGES_DIR;

// Certifique-se de que o diretório de saída existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Configurações de otimização
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const MAX_WIDTH = 1200;

// Função para otimizar uma imagem
async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const outputPath = path.join(OUTPUT_DIR, fileName);
  const ext = path.extname(fileName).toLowerCase();

  console.log(`Otimizando: ${fileName}`);

  try {
    let sharpInstance = sharp(filePath).resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    });

    if (ext === ".jpg" || ext === ".jpeg") {
      await sharpInstance.jpeg({ quality: JPEG_QUALITY }).toFile(outputPath);
    } else if (ext === ".png") {
      await sharpInstance.png({ quality: PNG_QUALITY }).toFile(outputPath);
    } else {
      // Para outros formatos, apenas redimensiona
      await sharpInstance.toFile(outputPath);
    }

    console.log(`✅ Otimizado: ${fileName}`);
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${fileName}:`, error);
  }
}

// Função para processar um diretório
async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Processa subdiretórios recursivamente
      await processDirectory(filePath);
    } else {
      // Verifica se é uma imagem
      const ext = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) {
        await optimizeImage(filePath);
      }
    }
  }
}

// Inicia o processamento
console.log("Iniciando otimização de imagens...");
processDirectory(IMAGES_DIR)
  .then(() => {
    console.log("Otimização de imagens concluída!");
  })
  .catch((error) => {
    console.error("Erro durante a otimização:", error);
  });
