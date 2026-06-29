import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/History.css";

const History = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        user_email: "",
        password: "",
        contacts: [],
        locationEnabled: false
    });

    const [edit, setEdit] = useState(false);

    const userEmail = localStorage.getItem("user_email");

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            const res = await fetch(
                `https://silent-sos-backend.onrender.com/user?user_email=${userEmail}`
            );

            const data = await res.json();

            setUser(data.user || {
                name: "",
                user_email: "",
                password: "",
                contacts: [],
                locationEnabled: false
            });

        } catch (e) {
            alert("Something went wrong");
        }
    };

    function handleChange(e) {
        const { name, value, checked, type } = e.target;

        setUser({
            ...user,
            [name]: type === "checkbox" ? checked : value
        });
    }

    function handleContactChange(index, field, value) {
        const updatedContacts = [...user.contacts];
        updatedContacts[index][field] = value;

        setUser({
            ...user,
            contacts: updatedContacts
        });
    }

    function addContact() {
        setUser({
            ...user,
            contacts: [
                ...user.contacts,
                { name: "", phone: "" }
            ]
        });
    }

    function removeContact(index) {
        const updated = user.contacts.filter((_, i) => i !== index);

        setUser({
            ...user,
            contacts: updated
        });
    }

    async function updateDetails() {
        try {
            const res = await fetch("https://silent-sos-backend.onrender.com/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_email: user.user_email,
                    name: user.name,
                    contacts: user.contacts,
                    locationEnabled: user.locationEnabled
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                setEdit(false);
                fetchDetails();
            } else {
                alert(data.message);
            }

        } catch (e) {
            alert("Something went wrong");
        }
    }

    function handleLogout() {
    localStorage.removeItem("user_email");
    window.dispatchEvent(new Event("storage")); // 🔥 triggers App update
    navigate("/login", { replace: true });
}
    

    return (
        <div className="history-container">

            <div className="history-card">

                {/* HEADER */}
                <div className="history-header">
                    <button
                        className="back-button"
                        onClick={() => navigate("/app")}
                    >
                        ← Back
                    </button>

                    <h2>Profile</h2>
                </div>

                {/* NAME */}
                <div className="field">
                    <label>Name</label>
                    <input
                        className="history-input"
                        name="name"
                        value={user.name}
                        disabled={!edit}
                        onChange={handleChange}
                    />
                </div>

                {/* EMAIL */}
                <div className="field">
                    <label>Email</label>
                    <input
                        className="history-input"
                        value={user.user_email}
                        disabled
                    />
                </div>

                {/* CONTACTS */}
                <h3 className="section-title">Emergency Contacts</h3>

                {(user.contacts || []).map((contact, index) => (
                    <div className="contact-card" key={index}>

                        <label>Name</label>
                        <input
                            className="history-input"
                            value={contact.name}
                            disabled={!edit}
                            onChange={(e) =>
                                handleContactChange(index, "name", e.target.value)
                            }
                        />

                        <label>Phone</label>
                        <input
                            className="history-input"
                            value={contact.phone}
                            disabled={!edit}
                            onChange={(e) =>
                                handleContactChange(index, "phone", e.target.value)
                            }
                        />

                        {edit && (
                            <button
                                className="small-button"
                                onClick={() => removeContact(index)}
                            >
                                Remove
                            </button>
                        )}

                    </div>
                ))}

                {edit && (
                    <button className="small-button" onClick={addContact}>
                        + Add Contact
                    </button>
                )}

                {/* LOCATION */}
                <div className="location-card">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="locationEnabled"
                            checked={user.locationEnabled}
                            disabled={!edit}
                            onChange={handleChange}
                        />
                        Enable Live Location
                    </label>
                </div>

                {/* EDIT / SAVE */}
                {!edit ? (
                    <button
                        className="history-button"
                        onClick={() => setEdit(true)}
                    >
                        Edit Profile
                    </button>
                ) : (
                    <button
                        className="history-button"
                        onClick={updateDetails}
                    >
                        Save Changes
                    </button>
                )}

                {/* LOGOUT */}
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
        </div>
    );
};

export default History;