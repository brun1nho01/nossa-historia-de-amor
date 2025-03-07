import React from "react";
import { useQuiz } from "../QuizContext";
import { quizQuestions } from "../quizData";
import { useNavigate } from "react-router-dom";

const QuizResult: React.FC = () => {
  const { score, userAnswers, resetQuiz } = useQuiz();
  const navigate = useNavigate();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  // Determinar a mensagem com base na pontuação
  const getMessage = () => {
    if (percentage >= 90) return "Parabéns! Já podemos casar pra ontem!";
    if (percentage >= 70) return "COMO ASSIM VOCÊ ERROU ALGUMA COISA???";
    if (percentage >= 50)
      return "JULIANA, VOCÊ ERROU METADE DAS PERGUNTAS CARA, COMO ASSIM?";
    return "JULIANA, VOCÊ ERROU MAIS DA METADE DAS PERGUNTAS CARA, COMO ASSIM? VOCÊ NÃO ME AMA?";
  };

  // Determinar a cor com base na pontuação
  const getColor = () => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const goToTimeline = () => {
    resetQuiz(); // Reseta o quiz para uso futuro

    // Navegar para a página inicial com o estado para mostrar a timeline
    navigate("/", {
      state: { showTimeline: true },
      replace: false, // Não substitui a entrada atual no histórico
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Resultado do Quiz
      </h2>

      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className={`${getColor()} stroke-current`}
              strokeWidth="10"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * percentage) / 100}
              transform="rotate(-90 50 50)"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${getColor()}`}>
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      <p className={`text-xl font-semibold text-center mb-6 ${getColor()}`}>
        {getMessage()}
      </p>

      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Suas respostas:</h3>
        {quizQuestions.map((question, index) => (
          <div
            key={index}
            className="p-4 bg-white/90 backdrop-blur rounded-lg border"
          >
            <p className="font-medium text-gray-800 mb-2">
              {index + 1}. {question.question}
            </p>
            <p
              className={
                userAnswers[index] === question.correctAnswer
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              Sua resposta: {userAnswers[index]}
            </p>
            {userAnswers[index] !== question.correctAnswer && (
              <p className="text-green-600 font-medium">
                Resposta correta: {question.correctAnswer}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={goToTimeline}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Nossa História
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
