import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Heart, X } from "lucide-react";

const AnimatedLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Impedir rolagem quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Renderizar o modal no body para evitar problemas de posicionamento
  const renderModal = () => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 9999,
          padding: "20px",
        }}
        onClick={() => setIsOpen(false)}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "24px",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#f56565",
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => setIsOpen(false)}
          >
            <X size={16} />
          </button>

          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#d53f8c",
                marginBottom: "8px",
                fontFamily: "serif",
              }}
            >
              Juliana!
            </h2>
            <div
              style={{
                width: "100px",
                height: "4px",
                backgroundColor: "#fbb6ce",
                margin: "0 auto",
              }}
            ></div>
          </div>

          <div style={{ color: "#4a5568", lineHeight: 1.6 }}>
            <p style={{ marginBottom: "16px" }}>
              O que dizer sobre a Juliana? Poderia falar muito sobre essa menina
              incrível, poderia falar que ela é, junto com minha mãe, as
              mulheres de que sinto mais orgulho no mundo? Poderia falar que ela
              é perfeita e me faz feliz em todos os momentos da minha vida?
              Poderia dizer que ela é a mulher mais linda que eu já vi nesse
              mundo? Poderia falar que ela me ajudou em meus momentos mais
              difíceis de indecisão e me apoiou em todos os momentos em que
              estive confuso com algo.
            </p>

            <p style={{ marginBottom: "16px" }}>
              Mas sem dúvida ela vai pensar só uma coisa, nossa, como ele é
              bobo, não é? Até porque ela nunca acredita que ela é tudo isso
              para mim. Na verdade, isso não é nem 10% do que ela é. Se eu for
              falar tudo que eu sinto por essa menina, não vão caber palavras em
              um programa, em um computador, em lugar nenhum, eu iria fazê-la
              cansar de ler sobre tudo.
            </p>

            <p style={{ marginBottom: "16px" }}>
              Eu simplesmente amo essa menina incondicionalmente, ela é a minha
              maior sorte na minha vida. Sei que brigamos algumas vezes por
              motivos idiotas, mas nós precisamos entender que discussões são
              necessárias às vezes para melhorarmos em um relacionamento. Não
              podemos deixar que essas discussões atrapalhem o nosso
              relacionamento, sei que às vezes sou enjoado com algumas coisas
              bobas, por insegurança, mas peço que me entenda que eu estou
              tentando melhorar isso na minha vida.
            </p>

            <p style={{ marginBottom: "16px" }}>
              Eu te amo imensamente, incondicionalmente, extraordinariamente,
              coisa que nem um buraco negro, nem uma supernova, nem o tamanho do
              universo chegam perto da dimensão do meu amor por você. Logo,
              logo, nós teremos nossos trabalhos, nosso dinheiro e vamos poder
              morar juntos, ter nossa casinha, nossos dois filhos e um cachorro
              de rua. Você será minha esposa.
            </p>

            <p
              style={{
                textAlign: "right",
                fontWeight: 500,
                marginTop: "24px",
              }}
            >
              Com todo meu amor,
              <br />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  color: "#d53f8c",
                }}
              >
                Seu futuro esposo!
              </span>
            </p>

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <Heart
                style={{ color: "#d53f8c", margin: "0 auto" }}
                size={32}
                fill="currentColor"
              />
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <button
        className="w-full bg-pink-100 rounded-lg shadow-lg p-6 border-2 border-pink-300 relative cursor-pointer hover:bg-pink-50 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute -right-3 -top-3 w-20 h-20 bg-red-500 rounded-lg rotate-12 flex items-center justify-center shadow-lg">
          <Heart className="text-white w-10 h-10" />
        </div>

        <div className="text-center mt-6 mb-3">
          <h2 className="text-3xl font-bold text-pink-600 font-serif">
            Juliana!
          </h2>
          <p className="text-gray-600 mt-2 text-sm">Toque para abrir</p>
        </div>
      </button>

      {renderModal()}
    </div>
  );
};

export default AnimatedLetter;
