import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./Login";
import Signup from "./Signup";
import CalculatorUI from "./CalculatorUI";
import IntroScreen from "./IntroScreen";
import IntroScreen2 from "./IntroScreen2";
import History from "./History";

function App() {

    const [user, setUser] = useState(localStorage.getItem("user_email"));
    const [seenIntro, setSeenIntro] = useState(localStorage.getItem("seenIntro"));

    // 🔥 THIS MAKES APP REACTIVE TO LOGIN/LOGOUT
    useEffect(() => {

        const syncAuth = () => {
            setUser(localStorage.getItem("user_email"));
            setSeenIntro(localStorage.getItem("seenIntro"));
        };

        window.addEventListener("storage", syncAuth);
        return () => window.removeEventListener("storage", syncAuth);

    }, []);

    return (
        <Routes>

            <Route
                path="/"
                element={
                    !seenIntro ? (
                        <IntroScreen />
                    ) : user ? (
                        <Navigate to="/app" />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route path="/intro2" element={<IntroScreen2 />} />
            <Route path="/signup" element={<Signup />} />

            <Route
                path="/login"
                element={user ? <Navigate to="/app" /> : <Login />}
            />

            <Route
                path="/app"
                element={user ? <CalculatorUI /> : <Navigate to="/login" />}
            />

            <Route
                path="/history"
                element={user ? <History /> : <Navigate to="/login" />}
            />

            <Route path="*" element={<Navigate to="/" />} />

        </Routes>
    );
}

export default App;