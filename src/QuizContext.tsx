import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { quizQuestions, QuizQuestion } from "./quizData";

interface QuizContextType {
  currentQuestionIndex: number;
  userAnswers: string[];
  score: number;
  isQuizCompleted: boolean;
  isTransitioning: boolean;
  goToNextQuestion: () => void;
  answerQuestion: (answer: string) => void;
  resetQuiz: () => void;
  getCurrentQuestion: () => QuizQuestion | undefined;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz deve ser usado dentro de um QuizProvider");
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Função para resetar o quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setIsQuizCompleted(false);
    setIsTransitioning(false);
  };

  // Reseta o estado do quiz quando o componente é montado
  useEffect(() => {
    // Inicializa o estado do quiz
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setIsQuizCompleted(false);
    setIsTransitioning(false);
  }, []);

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Adiciona transição antes de mostrar o resultado
      setIsTransitioning(true);
      setTimeout(() => {
        setIsQuizCompleted(true);
        setIsTransitioning(false);
      }, 1000); // 1 segundo de transição
    }
  };

  const answerQuestion = (answer: string) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);

    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    goToNextQuestion();
  };

  const getCurrentQuestion = () => {
    return quizQuestions[currentQuestionIndex];
  };

  const value = {
    currentQuestionIndex,
    userAnswers,
    score,
    isQuizCompleted,
    isTransitioning,
    goToNextQuestion,
    answerQuestion,
    resetQuiz,
    getCurrentQuestion,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
