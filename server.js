import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// Resend
// ==========================
const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================
// Supabase Admin Client
// (Service Role Key)
// ==========================
const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ==========================
// Health Check
// ==========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
  });
});

// ==========================
// Welcome Email
// ==========================
app.post("/send-welcome-email", async (req, res) => {
  try {
    const { email, fullName } = req.body;

    console.log("📩 Sending email to:", email);

    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "🎉 Welcome!",
      html: `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8" />
              <title>Welcome!</title>
            </head>
            <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,.08);">

                      <tr>
                        <td align="center" style="background:linear-gradient(135deg,#4F46E5,#7C3AED);padding:40px;">
                          <h1 style="color:#ffffff;margin:0;font-size:34px;">
                            🎉 Congratulations!
                          </h1>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:40px;color:#333;">
                          <h2 style="margin-top:0;">
                            Welcome, ${fullName}! 👋
                          </h2>

                          <p style="font-size:16px;line-height:1.8;color:#555;">
                            Your account has been created successfully, and we're thrilled to have you join our community.
                          </p>

                          <p style="font-size:16px;line-height:1.8;color:#555;">
                            You're now ready to explore everything our platform has to offer. We hope you have an amazing experience!
                          </p>

                          <table cellpadding="0" cellspacing="0" align="center" style="margin:35px auto;">
                            <tr>
                              <td align="center" bgcolor="#4F46E5" style="border-radius:8px;">
                                <a href="https://yourwebsite.com"
                                  style="display:inline-block;padding:14px 28px;color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;">
                                  Get Started 🚀
                                </a>
                              </td>
                            </tr>
                          </table>

                          <hr style="border:none;border-top:1px solid #e5e7eb;margin:35px 0;">

                          <p style="font-size:14px;color:#777;line-height:1.7;">
                            If you have any questions, we're always here to help.
                          </p>

                          <p style="font-size:16px;font-weight:bold;color:#333;">
                            Welcome aboard! 💜
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td align="center" style="padding:20px;background:#f8fafc;color:#888;font-size:13px;">
                          © 2026 Your Company. All rights reserved.
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>`,
    });

    console.log("RESEND:", response);

    res.json({ success: true });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ==========================
// Delete User
// ==========================
app.post("/delete-user", async (req, res) => {
  try {
    console.log("Delete request:", req.body);

    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const { data, error } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.log("Supabase error:", error);
      throw error;
    }

    res.json({ success: true });
  } catch (err) {
    console.log("DELETE ERROR:", err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});