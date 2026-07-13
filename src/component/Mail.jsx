import { useState } from "react";

export default function Mail() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendEmail = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Email sent!");
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto" }}>
      <form onSubmit={sendEmail}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <br />
        <br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Message"
          rows="5"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <br />
        <br />

        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
}