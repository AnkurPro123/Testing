import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      // 1. Create Supabase Auth User
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim()
            .split(" ")
            .filter(Boolean)
            .map(
              word =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" "),
          },
        },    
      });
      console.log("User:", data.user);
      console.log("Session:", data.session);
      console.log("Data while creating:",data);

      if (error) throw error;

      // 2. Insert into profiles table
      // if (data.user) {
      //   const { error: profileError } = await supabase
      //     .from("profiles")
      //     .insert({
      //       id: data.user.id,
      //       full_name: fullName,
      //       email,
      //     });

      //   if (profileError) throw profileError;
      // }

      // 3. CALL YOUR BACKEND (Resend email)
      await fetch("http://localhost:5000/send-welcome-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullName,
        }),
      });

      alert("🎉 Account created successfully!");

      // reset form
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-box">
      <h2>Sign Up</h2>

      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}