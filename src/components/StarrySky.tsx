import React, { useEffect, useRef } from "react";

interface StarrySkyProps {
  starCount?: number;
  shootingStarCount?: number;
  constellationCount?: number;
}

const StarrySky: React.FC<StarrySkyProps> = ({
  starCount = 100,
  shootingStarCount = 5,
  constellationCount = 3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpa estrelas existentes
    containerRef.current.innerHTML = "";

    // Cria estrelas estáticas
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // Tamanho aleatório com variação maior
      const size = Math.random() * 4 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      // Posição aleatória
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      // Duração de animação aleatória
      star.style.setProperty("--twinkle-duration", `${Math.random() * 5 + 2}s`);

      // Brilho variável
      const brightness = Math.random() * 0.5 + 0.5; // 0.5 a 1
      star.style.setProperty("--star-brightness", `${brightness}`);

      // Cor variável (branco, azulado, amarelado)
      const hue =
        Math.random() > 0.7 ? (Math.random() > 0.5 ? "210" : "60") : "0";
      const saturation = hue === "0" ? "0%" : "30%";
      star.style.setProperty(
        "--star-color",
        `hsl(${hue}, ${saturation}, 100%)`
      );

      containerRef.current.appendChild(star);
    }

    // Cria constelações
    for (let c = 0; c < constellationCount; c++) {
      const constellation = document.createElement("div");
      constellation.className = "constellation";

      // Posição base da constelação
      const baseX = Math.random() * 80 + 10; // 10-90%
      const baseY = Math.random() * 80 + 10; // 10-90%

      // Número de estrelas na constelação (3-7)
      const constellationStars = Math.floor(Math.random() * 5) + 3;

      // Criar estrelas da constelação
      const starPositions: { x: number; y: number }[] = [];

      for (let i = 0; i < constellationStars; i++) {
        // Posição relativa à base da constelação
        const offsetX = Math.random() * 20 - 10; // -10 a 10%
        const offsetY = Math.random() * 20 - 10; // -10 a 10%

        const x = baseX + offsetX;
        const y = baseY + offsetY;

        starPositions.push({ x, y });

        // Criar a estrela da constelação
        const star = document.createElement("div");
        star.className = "constellation-star";

        // Tamanho um pouco maior que estrelas normais
        const size = Math.random() * 3 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;

        // Duração de animação aleatória
        star.style.setProperty(
          "--twinkle-duration",
          `${Math.random() * 4 + 3}s`
        );

        constellation.appendChild(star);
      }

      // Criar linhas conectando as estrelas
      for (let i = 0; i < starPositions.length - 1; i++) {
        const line = document.createElement("div");
        line.className = "constellation-line";

        const start = starPositions[i];
        const end = starPositions[i + 1];

        // Calcular comprimento e ângulo da linha
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        line.style.width = `${length}%`;
        line.style.left = `${start.x}%`;
        line.style.top = `${start.y}%`;
        line.style.transform = `rotate(${angle}deg)`;

        constellation.appendChild(line);
      }

      containerRef.current.appendChild(constellation);
    }

    // Cria estrelas cadentes
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";

      // Posição aleatória
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 50}%`;

      // Rotação aleatória
      const rotation = Math.random() * 45 - 22.5;
      shootingStar.style.setProperty("--rotation", `${rotation}deg`);

      // Duração e atraso aleatórios
      const duration = Math.random() * 2 + 1;
      const delay = Math.random() * 15;
      shootingStar.style.setProperty("--shooting-duration", `${duration}s`);
      shootingStar.style.setProperty("--shooting-delay", `${delay}s`);

      // Tamanho variável
      const size = Math.random() * 2 + 1;
      shootingStar.style.setProperty("--shooting-size", `${size}px`);

      containerRef.current.appendChild(shootingStar);
    }

    // Recria estrelas cadentes periodicamente
    const interval = setInterval(() => {
      if (!containerRef.current) return;

      // Remove estrelas cadentes antigas
      const shootingStars =
        containerRef.current.querySelectorAll(".shooting-star");
      shootingStars.forEach((star) => star.remove());

      // Cria novas estrelas cadentes
      for (let i = 0; i < shootingStarCount; i++) {
        const shootingStar = document.createElement("div");
        shootingStar.className = "shooting-star";

        // Posição aleatória
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 50}%`;

        // Rotação aleatória
        const rotation = Math.random() * 45 - 22.5;
        shootingStar.style.setProperty("--rotation", `${rotation}deg`);

        // Duração e atraso aleatórios
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 5;
        shootingStar.style.setProperty("--shooting-duration", `${duration}s`);
        shootingStar.style.setProperty("--shooting-delay", `${delay}s`);

        // Tamanho variável
        const size = Math.random() * 2 + 1;
        shootingStar.style.setProperty("--shooting-size", `${size}px`);

        containerRef.current.appendChild(shootingStar);
      }
    }, 15000); // Recria a cada 15 segundos

    return () => clearInterval(interval);
  }, [starCount, shootingStarCount, constellationCount]);

  return <div ref={containerRef} className="starry-sky"></div>;
};

export default StarrySky;
