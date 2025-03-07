export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quando foi nosso primeiro beijo?",
    options: [
      "14 de Janeiro",
      "15 de Fevereiro",
      "17 de Abril",
      "23 de Fevereiro",
    ],
    correctAnswer: "15 de Fevereiro",
  },
  {
    id: 2,
    question: "Qual é a minha comida favorita?",
    options: ["Churrasco", "Lanche", "Japa", "Pizza"],
    correctAnswer: "Churrasco",
  },
  {
    id: 3,
    question: "Qual é o nosso maior gosto em comum?",
    options: ["Astros", "Mar", "Festa", "Filme"],
    correctAnswer: "Astros",
  },
  {
    id: 4,
    question: "O que eu mais gosto de fazer quando não estou com você?",
    options: ["Ler livros", "Jogar videogame", "Assistir séries", "Cozinhar"],
    correctAnswer: "Jogar videogame",
  },
  {
    id: 5,
    question: "Qual é a minha cor favorita?",
    options: ["Azul", "Vermelho", "Verde", "Roxo"],
    correctAnswer: "Azul",
  },
  {
    id: 6,
    question: "Qual é o meu sonho para nosso futuro?",
    options: [
      "Viajar pelo mundo",
      "Ter uma casa grande",
      "Construir uma família",
      "Ter tudo isso, alem disso, dois filhos e um cachorro de rua",
    ],
    correctAnswer:
      "Ter tudo isso, alem disso, dois filhos e um cachorro de rua",
  },
];
