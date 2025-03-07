import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import App from "./App.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import { QuizProvider } from "./QuizContext.tsx";
import "./index.css";

// Componente de animação para as rotas
const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<App />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuizProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </QuizProvider>
  </React.StrictMode>
);
