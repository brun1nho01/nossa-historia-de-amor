import React from "react";
import { useQuiz } from "../QuizContext";
import QuizQuestion from "../components/QuizQuestion";
import QuizResult from "../components/QuizResult";
import StarrySky from "../components/StarrySky";
import { CSSTransition, SwitchTransition } from "react-transition-group";

// Componente de fundo com céu estrelado
const BackgroundWithOverlay = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 relative">
    <StarrySky starCount={150} shootingStarCount={8} constellationCount={5} />
    <div className="relative z-10">{children}</div>
  </div>
);

// Componente de transição
const TransitionScreen = () => (
  <div className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur rounded-lg shadow-lg flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-t-4 border-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Calculando resultado...
      </h2>
      <p className="text-gray-600">Vamos ver o quanto você me conhece!</p>
    </div>
  </div>
);

const QuizPage: React.FC = () => {
  const { isQuizCompleted, isTransitioning } = useQuiz();

  return (
    <BackgroundWithOverlay>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={
              isTransitioning
                ? "transition"
                : isQuizCompleted
                ? "result"
                : "question"
            }
            timeout={300}
            classNames="fade"
          >
            <div className="max-w-3xl mx-auto">
              {isTransitioning ? (
                <TransitionScreen />
              ) : isQuizCompleted ? (
                <QuizResult />
              ) : (
                <QuizQuestion />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </BackgroundWithOverlay>
  );
};

export default QuizPage;
