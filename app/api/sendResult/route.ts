import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, age, result } = await req.json();

  // Gmail-specific transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // your 16-char Google App Password
    },
  });

  // Verify connection before sending
  try {
    await transporter.verify();
    console.log("SMTP connection successful ✅");
  } catch (err) {
    console.error("SMTP verify error ❌:", err);
    return NextResponse.json(
      { success: false, error: "SMTP verification failed" },
      { status: 500 }
    );
  }

  // HTML email template
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; background: #fafafa;">
      <h2 style="color: #1976d2; text-align: center; margin-bottom: 20px;">Personality Quiz Result</h2>
      
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age}</p>

      <h3 style="margin-top: 20px; color: #333;">Result</h3>
      <pre style="background: #f4f4f4; padding: 12px; border-radius: 6px; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">
${JSON.stringify(result, null, 2)}
      </pre>

      <p style="font-size: 12px; color: #777; text-align: center; margin-top: 30px;">
        This email was generated automatically by Agape Quiz.
      </p>
    </div>
  `;

  const mailOptions = {
    from: `"Agape Quiz" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Personality Quiz Result for ${name}`,
    text: `Name: ${name}\nAge: ${age}\nResult: ${JSON.stringify(result, null, 2)}`, // fallback for non-HTML clients
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("EMAIL SEND ERROR ❌:", error);
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}