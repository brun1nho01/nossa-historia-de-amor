import React from "react";
import { useQuiz } from "../QuizContext";

const QuizQuestion: React.FC = () => {
  const { getCurrentQuestion, answerQuestion } = useQuiz();
  const question = getCurrentQuestion();

  if (!question) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {question.question}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => answerQuestion(option)}
            className="w-full p-4 text-left bg-white/90 backdrop-blur border border-gray-300 rounded-lg hover:bg-blue-50/90 hover:border-blue-500 transition-colors"
          >
            <span className="inline-block w-8 h-8 mr-3 text-center leading-8 bg-blue-100 text-blue-800 rounded-full">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
