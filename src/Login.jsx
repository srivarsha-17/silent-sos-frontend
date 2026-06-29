import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Signup.css";

const Login = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        user_email: "",
        password: ""
    });

    function handleChange(e) {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

    }

    async function handleLogin() {

        try {

            const res = await fetch("http://localhost:8082/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(form)

            });

            const data = await res.json();

            if (res.ok) {

                localStorage.setItem("user_email", form.user_email);
                localStorage.setItem("seenIntro", "true");

                alert("Login successful");

               setTimeout(() => {
        navigate("/app");
        window.location.reload();
    }, 50);

            } else {

                alert(data.message || "Login failed");
            }

        } catch (err) {

            console.log(err);
            alert("Something went wrong");

        }

    }

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Login</h2>

                <input
                    className="auth-input"
                    name="user_email"
                    placeholder="Email"
                    value={form.user_email}
                    onChange={handleChange}
                />

                <input
                    className="auth-input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button
                    className="auth-button"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <p style={{ color: "white", textAlign: "center" }}>
                    New user?{" "}
                    <span
                        style={{ color: "#b8c7e6", cursor: "pointer" }}
                        onClick={() => navigate("/signup")}
                    >
                        Signup
                    </span>
                </p>

            </div>

        </div>

    );

};

export default Login;