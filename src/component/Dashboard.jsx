import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);
  // console.log("Logged in User in Dashboard:",user)
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
    } else {
      window.location.reload();
    }
  }
////////////////////////////////////////////////////////////
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const { data: userData } = await supabase.auth.getUser();

      const userId = userData?.user?.id;

      if (!userId) {
        alert("User not found");
        return;
      }

      const res = await fetch("http://localhost:5000/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      alert("Account deleted successfully");

      // logout after deletion
      await supabase.auth.signOut();
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  }
/////////////////////////////////////////////////////////////////////

  return (
    <div
  style={{
    minHeight: "100vh",
    backgroundColor: "#0b0f19",
    color: "#fff",
    display: "flex",
  }}
>
  {/* Sidebar */}
  <aside
    style={{
      width: "288px",
      backgroundColor: "#111827",
      borderRight: "1px solid #374151",
      display: "flex",
      flexDirection: "column",
      padding: "24px",
    }}
  >
    <h1
      style={{
        fontSize: "24px",
        fontWeight: "700",
        background: "linear-gradient(to right, #22d3ee, #3b82f6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      DarkPanel
    </h1>

    <nav
      style={{
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          borderRadius: "12px",
          backgroundColor: "rgba(37,99,235,0.2)",
          color: "#60a5fa",
        }}
      >
        Dashboard
      </div>

      <div
        style={{
          padding: "12px 16px",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        Profile
      </div>

      <div
        style={{
          padding: "12px 16px",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        Settings
      </div>
    </nav>

    <button
      onClick={handleLogout}
      style={{
        marginTop: "auto",
        backgroundColor: "rgba(239,68,68,0.1)",
        color: "#f87171",
        border: "1px solid rgba(239,68,68,0.2)",
        padding: "12px 16px",
        borderRadius: "12px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  </aside>

  {/* Main Dashboard */}
  <main
    style={{
      flex: 1,
      padding: "40px",
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "30px",
            fontWeight: "700",
            margin: 0,
          }}
        >
          Welcome back 👋
        </h2>

        <p
          style={{
            color: "#9ca3af",
            marginTop: "8px",
          }}
        >
          Here's your account overview
        </p>
      </div>
    </div>

    {/* User Card */}
    <div
      style={{
        background: "linear-gradient(to bottom right,#111827,#1f2937)",
        border: "1px solid #374151",
        borderRadius: "24px",
        padding: "32px",
        boxShadow: "0 10px 30px rgba(0,0,0,.4)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(to right,#22d3ee,#2563eb)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "600",
              margin: 0,
            }}
          >
            {user?.user_metadata?.full_name || "User"}
          </h3>

          <p
            style={{
              color: "#9ca3af",
              marginTop: "6px",
            }}
          >
            {user?.email}
          </p>
        </div>
      </div>
    </div>

    {/* Stats Cards */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "24px",
        marginTop: "32px",
      }}
    >
      <div
        style={{
          backgroundColor: "#111827",
          border: "1px solid #374151",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <p style={{ color: "#9ca3af" }}>Account Status</p>

        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#4ade80",
            marginTop: "8px",
          }}
        >
          Active
        </h3>
      </div>

      <div
        style={{
          backgroundColor: "#111827",
          border: "1px solid #374151",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <p style={{ color: "#9ca3af" }}>Email</p>

        <h3
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginTop: "8px",
          }}
        >
          Verified
        </h3>
      </div>

      <div
        style={{
          backgroundColor: "#111827",
          border: "1px solid #374151",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <p style={{ color: "#9ca3af" }}>Member Since</p>

        <h3
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginTop: "8px",
          }}
        >
          {user?.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : "Loading..."}
        </h3>
      </div>
    </div>

    {/* Danger Zone */}
    <div
      style={{
        marginTop: "32px",
        backgroundColor: "rgba(239,68,68,0.05)",
        border: "1px solid rgba(239,68,68,0.2)",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#f87171",
        }}
      >
        Danger Zone
      </h3>

      <p
        style={{
          color: "#9ca3af",
          marginTop: "8px",
          marginBottom: "20px",
        }}
      >
        Permanently delete your account and all associated data.
      </p>

      <button
        onClick={handleDelete}
        style={{
          backgroundColor: "#dc2626",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: "12px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Delete Account
      </button>
    </div>
  </main>
</div>
  );
}