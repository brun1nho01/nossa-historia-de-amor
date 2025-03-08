import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import ReactDOM from "react-dom";

interface Photo {
  src: string;
  caption: string;
}

interface PolaroidGalleryProps {
  photos: Photo[];
}

const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({ photos }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visiblePhotos, setVisiblePhotos] = useState<number>(4); // Inicialmente mostra apenas 4 fotos
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Gera rotações e cores aleatórias apenas uma vez e memoriza os resultados
  const { rotations, tapeColors } = useMemo(() => {
    const colorOptions = [
      "#FFD700",
      "#FF6B6B",
      "#4ECDC4",
      "#7FB069",
      "#F9C80E",
    ];
    const newRotations = photos.map(() => Math.random() * 10 - 5);
    const newTapeColors = photos.map(
      () => colorOptions[Math.floor(Math.random() * colorOptions.length)]
    );

    return { rotations: newRotations, tapeColors: newTapeColors };
  }, [photos.length]);

  // Verifica se é um dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Configura o observador de interseção para carregamento lazy
  useEffect(() => {
    if (loadMoreRef.current && visiblePhotos < photos.length) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Quando o elemento "carregar mais" é visível, carrega mais fotos
            setVisiblePhotos((prev) =>
              Math.min(prev + (isMobile ? 4 : 8), photos.length)
            );
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visiblePhotos, photos.length, isMobile]);

  // Manipulador de clique para abrir a foto ampliada
  const handlePolaroidClick = useCallback((index: number) => {
    setExpandedIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  // Manipulador para fechar a foto ampliada
  const handleCloseExpanded = useCallback(() => {
    setExpandedIndex(null);
    document.body.style.overflow = "";
  }, []);

  // Manipulador para evitar que cliques na imagem ampliada fechem o modal
  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Manipulador de tecla Escape para fechar a foto ampliada
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedIndex !== null) {
        setExpandedIndex(null);
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [expandedIndex]);

  // Renderizar o modal no body para evitar problemas de posicionamento
  const renderModal = () => {
    if (expandedIndex === null) return null;

    return ReactDOM.createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          cursor: "pointer",
        }}
        onClick={handleCloseExpanded}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "4px",
            maxWidth: "90%",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            position: "relative",
            cursor: "default",
            overflow: "auto",
          }}
          onClick={handleContentClick}
        >
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "32px",
              height: "32px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              fontSize: "22px",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              zIndex: 10,
              paddingBottom: "4px",
            }}
            onClick={handleCloseExpanded}
          >
            &times;
          </button>

          <img
            src={photos[expandedIndex].src}
            alt={photos[expandedIndex].caption}
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
              border: "10px solid white",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
          />

          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: "1.1rem",
              fontWeight: 500,
              color: "#222",
              marginTop: "1rem",
              textAlign: "center",
              maxWidth: "80%",
              lineHeight: 1.3,
              letterSpacing: "0.01em",
            }}
          >
            {photos[expandedIndex].caption}
          </p>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="polaroid-container" ref={containerRef}>
      {photos.slice(0, visiblePhotos).map((photo, index) => {
        const isExpanded = expandedIndex === index;
        const rotation = rotations[index] || 0;
        const tapeColor = tapeColors[index] || "#FFD700";

        return (
          <div
            key={index}
            className={`polaroid ${isExpanded ? "expanded" : ""}`}
            style={
              {
                "--rotation": `${rotation}deg`,
                "--tape-color": tapeColor,
              } as React.CSSProperties
            }
            onClick={() => handlePolaroidClick(index)}
          >
            <div className="polaroid-tape"></div>
            <img
              src={photo.src}
              alt={photo.caption}
              className="polaroid-img"
              loading="lazy"
              width="250"
              height="200"
            />
            <div className="polaroid-caption-container">
              <div className="polaroid-caption">{photo.caption}</div>
            </div>
          </div>
        );
      })}

      {/* Elemento de referência para carregar mais fotos */}
      {visiblePhotos < photos.length && (
        <div
          ref={loadMoreRef}
          className="load-more-trigger"
          style={{
            height: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <div className="loading-indicator">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      )}

      {renderModal()}
    </div>
  );
};

export default PolaroidGallery;
