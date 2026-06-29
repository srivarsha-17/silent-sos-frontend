import { useNavigate } from "react-router-dom";
import "./styles/IntroScreen2.css";

export default function IntroScreen2() {
  const navigate = useNavigate();

  const handleFinish = () => {
    localStorage.setItem("seenIntro", "true");
    navigate("/signup");
  };

  return (
    <div className="intro-wrapper">
      <div className="intro-screen">

        <div className="intro-content">

          <div className="title-section">

            <h1 className="intro-title">
              How It Works
            </h1>

            <h2 className="intro-tagline">
              Your emergency trigger
              <br />
              is hidden in plain sight.
            </h2>

          </div>

          <div className="trigger-card">

            <span>C</span>
            <span>C</span>
            <span>=</span>
            <span>=</span>

          </div>

          <p className="trigger-description">
            Enter this sequence anytime
            inside the calculator to
            silently trigger an SOS alert
            and your location will be sent
            instantly to your trusted contacts.
          </p>

        </div>

        <button
          className="intro-button"
          onClick={handleFinish}
        >
          Start Protecting →
        </button>

      </div>
    </div>
  );
}