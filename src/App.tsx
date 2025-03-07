import { useState, useEffect, lazy, Suspense } from "react";
import { Heart, Clock, Calendar, MapPin, Plane, Baby } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Lazy loading dos componentes
const StarrySky = lazy(() => import("./components/StarrySky"));
const PolaroidGallery = lazy(() => import("./components/PolaroidGallery"));
const EnhancedTimeline = lazy(() => import("./components/EnhancedTimeline"));
const AnimatedLetter = lazy(() => import("./components/AnimatedLetter"));

// Função auxiliar para criar datas com hora, minuto e segundo
function createDateTime(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0
): string {
  // Mês em JavaScript é baseado em zero (0-11), então subtraímos 1
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}T${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}:${String(second).padStart(2, "0")}`;
}

// Replace these with your actual dates and milestones
const START_DATE = createDateTime(2024, 3, 24, 23, 20, 0); // 24 de Março de 2024 às 23:20:00
const FUTURE_TRIP_DATE = createDateTime(2025, 7, 4, 0, 0, 0); // Data da futura viagem
const FUTURE_TRIP_LOCATION = "Ibitipoca-MG"; // Local da próxima viagem

const MILESTONES = [
  {
    date: createDateTime(2024, 2, 15, 1, 2, 0),
    title: "Primeiro beijo",
  },
  {
    date: createDateTime(2024, 3, 24, 12, 30, 0),
    title: "Nosso primeiro encontro, após o beijo",
  },
  {
    date: createDateTime(2024, 7, 30, 12, 30, 0),
    title: "Resolvemos ficar de verdade",
  },
  {
    date: createDateTime(2024, 10, 25, 12, 30, 0),
    title: "Primeira viagem juntos com a sua familia, para cachoeira",
  },
  {
    date: createDateTime(2024, 11, 20, 12, 30, 0),
    title: "Segunda viagem juntos, para Cabo Frio, agora com a minha familia",
  },
  {
    date: createDateTime(2025, 1, 8, 12, 30, 0),
    title: "Terceira viagem juntos, para Cabo Frio com sua familia",
  },
  {
    date: createDateTime(2025, 1, 24, 12, 30, 0),
    title: "Quarta viagem juntos, para Cabo Frio com minha familia ",
  },
  // Add more milestones here
];

const PHOTOS = [
  // Imagens locais da pasta public/images
  "/images/foto1.png",
  "/images/foto2.png",
  "/images/foto3.png",
  "/images/foto4.png",
  "/images/foto5.png",
  "/images/foto6.png",
  "/images/foto7.png",
  "/images/foto8.png",
  "/images/foto9.png",
  "/images/foto10.png",
  // Você pode adicionar mais fotos aqui
];

// Legendas personalizadas para cada foto
const PHOTO_CAPTIONS = [
  "Algum rolezinho nosso",
  "Quando você dormiu na minha casa em campos agarradinha comigo",
  "Formatura da minha princesa pt1",
  "Formatura da minha princesa pt2",
  "Nossa viagem para a cachoeira",
  "Churrasquinho da sua turma",
  "Minha princesa desfilando para o união",
  "Cabo Frio pt1",
  "Cabo Frio pt2",
  "Cabo Frio pt3",
];

// Próximos passos do casal
const NEXT_STEPS = [
  {
    title: "Morar juntinhos",
    date: "Ainda temos data expecifica, mas assim que formados.",
    description: "Começar a planejar nossa vida juntos sob o mesmo teto.",
    icon: <MapPin className="w-6 h-6 text-red-500" />,
  },
  {
    title: "Casamento",
    date: "Ainda temos data expecifica, mas assim que formados.",
    description:
      "Oficializar nossa união com uma linda cerimônia cercada de amigos e familiares.",
    icon: <Heart className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Nosso primeiro filho",
    date: "Logo após o casamento caso tenhamos uma estabilidade financeira",
    description: "Começar nossa familia.",
    icon: <Baby className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Nosso segundo filho",
    date: "Dois anos após nosso primeiro filho",
    description: "Realizar nosso sonho.",
    icon: <Baby className="w-6 h-6 text-pink-500" />,
  },
];

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-32">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
  </div>
);

// Componente de fundo com película que será reutilizado em todas as telas
const BackgroundWithOverlay = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 relative">
    <Suspense fallback={<LoadingSpinner />}>
      <StarrySky starCount={100} shootingStarCount={5} constellationCount={3} />
    </Suspense>
    <div className="relative z-10">{children}</div>
  </div>
);

function calculateDuration(startDate: string) {
  const start = new Date(startDate);
  const now = new Date();

  // Diferença em milissegundos
  const diffTime = Math.abs(now.getTime() - start.getTime());

  // Cálculos de tempo
  const seconds = Math.floor((diffTime / 1000) % 60);
  const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
  const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);

  // Dias totais para cálculos subsequentes
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Semanas, meses e anos
  const weeks = Math.floor((totalDays % 30) / 7);
  const days = Math.floor((totalDays % 30) % 7);
  const months = Math.floor((totalDays % 365) / 30);
  const years = Math.floor(totalDays / 365);

  return { years, months, weeks, days, hours, minutes, seconds };
}

// Função para calcular o tempo restante até uma data futura
function calculateTimeRemaining(futureDate: string) {
  const future = new Date(futureDate);
  const now = new Date();

  // Diferença em milissegundos
  const diffTime = Math.max(0, future.getTime() - now.getTime());

  // Cálculos de tempo
  const seconds = Math.floor((diffTime / 1000) % 60);
  const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
  const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}

// Componente personalizado para o relógio flip
const CustomFlipClock = () => {
  // Estado para armazenar a duração atual
  const [duration, setDuration] = useState(calculateDuration(START_DATE));

  // Estado para controlar a animação de flip
  const [flip, setFlip] = useState(false);
  const [prevSeconds, setPrevSeconds] = useState(-1);

  // Atualiza o tempo a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      const newDuration = calculateDuration(START_DATE);
      setDuration(newDuration);

      // Verifica se os segundos mudaram para acionar a animação
      if (prevSeconds !== newDuration.seconds) {
        setFlip(true);
        setPrevSeconds(newDuration.seconds);

        // Reseta o estado de flip após a animação
        setTimeout(() => {
          setFlip(false);
        }, 500);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prevSeconds]);

  const { years, months, days, hours, minutes, seconds } = duration;

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      <div className="text-center">
        <div className="flip-card">
          <div className="text-2xl font-bold text-gray-800">{years}</div>
        </div>
        <div className="text-xs font-semibold text-gray-600 mt-1">Anos</div>
      </div>

      <div className="text-center">
        <div className="flip-card">
          <div className="text-2xl font-bold text-gray-800">{months}</div>
        </div>
        <div className="text-xs font-semibold text-gray-600 mt-1">Meses</div>
      </div>

      <div className="text-center">
        <div className="flip-card">
          <div className="text-2xl font-bold text-gray-800">
            {days < 10 ? `0${days}` : days}
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-600 mt-1">Dias</div>
      </div>

      <div className="text-center">
        <div className="flip-card">
          <div className="text-2xl font-bold text-gray-800">
            {hours < 10 ? `0${hours}` : hours}
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-600 mt-1">Horas</div>
      </div>

      <div className="text-center">
        <div className="flip-card">
          <div className="text-2xl font-bold text-gray-800">
            {minutes < 10 ? `0${minutes}` : minutes}
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-600 mt-1">Minutos</div>
      </div>

      <div className="text-center">
        <div className={`flip-card ${flip ? "flipping" : ""}`}>
          <div className="text-2xl font-bold text-gray-800">
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-600 mt-1">Segundos</div>
      </div>
    </div>
  );
};

// Componente para o contador regressivo da viagem
const TripCountdown = () => {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(FUTURE_TRIP_DATE)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(FUTURE_TRIP_DATE));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { days, hours, minutes, seconds } = timeRemaining;

  return (
    <div className="countdown-container w-full md:w-auto mx-auto my-8">
      <div className="text-center space-y-2 mb-4">
        <h3 className="text-xl font-bold text-white">
          <Plane className="inline-block mr-2 animate-float" />
          Próxima Viagem: {FUTURE_TRIP_LOCATION}
        </h3>
        <p className="text-lg text-white/90">
          Em {new Date(FUTURE_TRIP_DATE).toLocaleDateString("pt-BR")}
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex flex-col items-center">
          <div className="countdown-value">{days}</div>
          <div className="countdown-label">Dias</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="countdown-value">{hours}</div>
          <div className="countdown-label">Horas</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="countdown-value">{minutes}</div>
          <div className="countdown-label">Min</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="countdown-value">{seconds}</div>
          <div className="countdown-label">Seg</div>
        </div>
      </div>
    </div>
  );
};

// Componente para a seção de próximos passos
const NextSteps = () => {
  return (
    <div className="next-steps-container w-full mx-auto my-8">
      <h3 className="text-xl font-bold text-center mb-4">
        <Calendar className="inline-block mr-2" />
        Nossos Próximos Passos
      </h3>
      <div className="space-y-4">
        {NEXT_STEPS.map((step, index) => (
          <div key={index} className="step-item flex items-start p-4">
            <div className="mr-4 mt-1">{step.icon}</div>
            <div>
              <h4 className="font-bold text-lg">{step.title}</h4>
              <p className="text-sm text-gray-500 mb-2">{step.date}</p>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [screen, setScreen] = useState<"question" | "timeline" | "rejection">(
    "question"
  );
  const [noButtonPosition, setNoButtonPosition] = useState({
    x: null as number | null,
    y: null as number | null,
  });
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [isFirstHover, setIsFirstHover] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se deve mostrar a timeline com base no estado da navegação
  useEffect(() => {
    if (location.state?.showTimeline === true) {
      // Primeiro muda a tela
      setScreen("timeline");
      // Limpa o estado de navegação
      window.history.replaceState({}, document.title);
      // Força o scroll para o topo após um pequeno delay
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      }, 100);
    }
  }, [location.state]);

  // Força o scroll para o topo quando a tela muda
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  // Função moveNoButton que não depende de closures
  const moveNoButton = () => {
    if (!containerRef) return;

    // Tamanho do botão após o hover (menor que o inicial)
    const buttonWidth = 100; // Largura reduzida do botão
    const buttonHeight = 48; // Altura reduzida do botão
    const containerRect = containerRef.getBoundingClientRect();

    // Calcula os limites máximos considerando o tamanho do botão
    const maxX = containerRect.width - buttonWidth;
    const maxY = containerRect.height - buttonHeight;

    // Define áreas a serem evitadas (onde há outros elementos)
    // Área do título (aproximadamente)
    const titleArea = {
      top: 0,
      left: 0,
      right: containerRect.width,
      bottom: 150, // Altura aproximada do título + coração
    };

    // Área do botão "Sim" (aproximadamente)
    const yesButtonArea = {
      top: titleArea.bottom,
      left: 0,
      right: containerRect.width,
      bottom: titleArea.bottom + 60, // Altura aproximada do botão + margem
    };

    // Gera posições aleatórias e verifica se estão em áreas seguras
    let x: number = 0;
    let y: number = 0;
    let isValidPosition = false;
    let attempts = 0;
    const maxAttempts = 20; // Limite de tentativas para evitar loop infinito

    while (!isValidPosition && attempts < maxAttempts) {
      x = Math.random() * maxX;
      y = Math.random() * maxY;

      // Verifica se a posição está fora das áreas a serem evitadas
      const isOverlappingTitle =
        y < titleArea.bottom &&
        y + buttonHeight > titleArea.top &&
        x < titleArea.right &&
        x + buttonWidth > titleArea.left;

      const isOverlappingYesButton =
        y < yesButtonArea.bottom &&
        y + buttonHeight > yesButtonArea.top &&
        x < yesButtonArea.right &&
        x + buttonWidth > yesButtonArea.left;

      // Se não estiver sobrepondo nenhuma área, a posição é válida
      isValidPosition = !isOverlappingTitle && !isOverlappingYesButton;
      attempts++;
    }

    // Se não encontrou uma posição válida após várias tentativas,
    // usa uma posição padrão no canto inferior direito
    if (!isValidPosition) {
      x = maxX - 20;
      y = maxY - 20;
    }

    setNoButtonPosition({ x, y });
    setIsFirstHover(false);
  };

  // useEffect para o evento de redimensionamento
  useEffect(() => {
    const handleResize = () => {
      if (containerRef) {
        moveNoButton();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Removida a dependência containerRef

  const handleYesClick = () => {
    navigate("/quiz");
  };

  // Renderiza a tela de pergunta
  if (screen === "question") {
    return (
      <BackgroundWithOverlay>
        <div className="flex items-center justify-center px-4 py-8">
          <div
            ref={setContainerRef}
            className="relative text-center p-6 md:p-8 rounded-lg bg-white/80 backdrop-blur shadow-xl max-w-md w-full mx-auto min-h-[400px]"
          >
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-4 md:mb-6 animate-heartbeat" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
              Você me ama?
            </h1>
            <div className="space-y-4">
              <button
                onClick={handleYesClick}
                className="w-full py-3 px-6 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-105 transition-all font-semibold"
              >
                Sim, muito! ❤️
              </button>
              <button
                onClick={() => setScreen("rejection")}
                onMouseEnter={moveNoButton}
                style={{
                  position: isFirstHover ? "relative" : "absolute",
                  left:
                    noButtonPosition.x !== null
                      ? `${noButtonPosition.x}px`
                      : "auto",
                  top:
                    noButtonPosition.y !== null
                      ? `${noButtonPosition.y}px`
                      : "auto",
                  width: isFirstHover ? "100%" : "100px",
                  transition: "width 0.3s ease",
                }}
                className={`py-3 px-6 text-white rounded-full transform hover:scale-105 transition-all font-semibold ${
                  isFirstHover
                    ? "bg-gray-500 hover:bg-gray-600"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      </BackgroundWithOverlay>
    );
  }

  // Renderiza a tela de rejeição
  if (screen === "rejection") {
    return (
      <BackgroundWithOverlay>
        <div className="flex items-center justify-center px-4 py-8">
          <div className="text-center p-6 md:p-8 rounded-lg bg-white/80 backdrop-blur shadow-xl max-w-md w-full mx-auto">
            <img
              src={PHOTOS[0]}
              alt="Nós juntos"
              className="w-full h-48 md:h-64 object-cover rounded-lg mb-4 md:mb-6"
            />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Tem certeza sobre isso?
            </h2>
            <button
              onClick={handleYesClick}
              className="py-3 px-6 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-105 transition-all font-semibold"
            >
              Não, eu te amo! ❤️
            </button>
          </div>
        </div>
      </BackgroundWithOverlay>
    );
  }

  // Renderiza a tela de timeline (por padrão)
  return (
    <BackgroundWithOverlay>
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur rounded-lg shadow-xl p-6 md:p-8 mb-6 md:mb-8">
            <div className="flex flex-col items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                Nossa História de Amor ❤️
              </h1>

              <Suspense fallback={<LoadingSpinner />}>
                <div className="w-full bg-white/70 rounded-xl shadow-lg p-4 md:p-6 mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-red-500 mr-2" />
                    <span className="text-lg md:text-xl font-semibold text-gray-700">
                      Tempo Juntos
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    {/* Flip Clock Countdown */}
                    <div className="mb-4 w-full overflow-x-auto">
                      <CustomFlipClock />
                    </div>
                  </div>
                </div>
              </Suspense>
            </div>

            {/* Contador regressivo para a viagem */}
            <Suspense fallback={<LoadingSpinner />}>
              <TripCountdown />
            </Suspense>

            {/* Carta animada com título "Juliana!" */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-center mb-4">
                Uma Carta Especial Para Você
              </h3>
              <div className="bg-white/70 rounded-xl shadow-lg p-4">
                <Suspense fallback={<LoadingSpinner />}>
                  <AnimatedLetter />
                </Suspense>
              </div>
            </div>

            {/* Galeria de fotos polaroid */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-center mb-6">
                Nossos Momentos Especiais
              </h3>
              <div className="bg-white/70 rounded-xl shadow-lg p-4 md:p-6 mb-6">
                <p className="text-gray-700 mb-6 text-center italic">
                  Clique em uma foto para vê-la em tamanho maior
                </p>
                <Suspense fallback={<LoadingSpinner />}>
                  <PolaroidGallery
                    photos={PHOTOS.map((src, index) => ({
                      src,
                      caption:
                        PHOTO_CAPTIONS[index] ||
                        `Nosso momento especial ${index + 1}`,
                    }))}
                  />
                </Suspense>
              </div>
            </div>

            {/* Seção de próximos passos */}
            <Suspense fallback={<LoadingSpinner />}>
              <NextSteps />
            </Suspense>

            {/* Linha do tempo melhorada */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Nossa Linha do Tempo
              </h3>
              <Suspense fallback={<LoadingSpinner />}>
                <EnhancedTimeline milestones={MILESTONES} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWithOverlay>
  );
}

export default App;
