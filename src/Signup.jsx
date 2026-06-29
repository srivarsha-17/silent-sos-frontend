import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    user_email: "",
    password: "",
    contacts: [{ name: "", phone: "" }],
    locationEnabled: false
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  }

  function handleContactChange(index, field, value) {
    const updatedContacts = [...form.contacts];
    updatedContacts[index][field] = value;

    setForm({
      ...form,
      contacts: updatedContacts
    });
  }

  function addContact() {
    setForm({
      ...form,
      contacts: [...form.contacts, { name: "", phone: "" }]
    });
  }

  function removeContact(index) {
    const updatedContacts = form.contacts.filter((_, i) => i !== index);

    setForm({
      ...form,
      contacts: updatedContacts
    });
  }

  async function submitForm() {
    try {
      const res = await fetch("http://localhost:8082/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>

        <input
          className="auth-input"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

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

        <h3 className="section-title">Emergency Contacts</h3>

        {form.contacts.map((contact, index) => (
          <div key={index} className="contact-box">
            <input
              className="auth-input"
              placeholder="Contact Name"
              value={contact.name}
              onChange={(e) =>
                handleContactChange(index, "name", e.target.value)
              }
            />

            <input
              className="auth-input"
              placeholder="Contact Phone"
              value={contact.phone}
              onChange={(e) =>
                handleContactChange(index, "phone", e.target.value)
              }
            />

            {form.contacts.length > 1 && (
              <button
                className="small-button"
                onClick={() => removeContact(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button className="small-button" onClick={addContact}>
          + Add Contact
        </button>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="locationEnabled"
            checked={form.locationEnabled}
            onChange={handleChange}
          />
          Enable Location
        </label>

        <button className="auth-button" onClick={submitForm}>
          Submit
        </button>

        <p style={{ color: "white", textAlign: "center", marginTop: "10px" }}>
          Already registered?{" "}
          <span
            style={{ color: "#b8c7e6", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;