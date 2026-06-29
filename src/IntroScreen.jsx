import { useNavigate } from "react-router-dom";
import "./styles/IntroScreen.css";
import girl from "./assets/girl.svg";

export default function IntroScreen() {
  const navigate = useNavigate();

  return (
    <div className="intro-wrapper">
      <div className="intro-screen">

        <div className="intro-content">

          <h1 className="intro-title">SilentSOS</h1>

          <h2 className="intro-tagline">
            Built to stay unnoticed.
            <br />
            Ready when you're not.
          </h2>

          <img src={girl} alt="SilentSOS" className="hero-image" />

          <p className="intro-description">
            A discreet safety companion designed to protect you quietly.
          </p>

        </div>

        <button
          className="intro-button"
          onClick={() => navigate("/intro2")}
        >
          Get Started →
        </button>

      </div>
    </div>
  );
}