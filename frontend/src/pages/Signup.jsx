import React, { useState } from "react";
import { redirect } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    try {
      const result = await api.post("/auth/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", result.data.token);
      alert("Registration successful!");
      redirect("/data");
    } catch (error) {
      alert("Failed to register. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button type="button" value="Submit" onClick={handleRegister} />
      </form>
    </div>
  );
}

export default Signup;
