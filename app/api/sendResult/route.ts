import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  const { name, age, result } = await req.json();

  /** ------------------------
   *  1. Gmail transporter
   * ------------------------- */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful");
  } catch (err) {
    console.error("❌ SMTP verify error:", err);
    return NextResponse.json(
      { success: false, error: "SMTP verification failed" },
      { status: 500 }
    );
  }

  /** ------------------------
   *  2. Google Sheets Auth
   * ------------------------- */
  // Ensure required environment variables are present
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error("Missing Google service account credentials in environment variables.");
  }
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  try {
    await auth.authorize(); // 🔥 force token fetch
    console.log("✅ Google Auth success");
  } catch (err) {
    console.error("❌ Google Auth failed:", err);
    return NextResponse.json(
      { success: false, error: "Google Auth failed" },
      { status: 500 }
    );
  }

  const sheets = google.sheets({ version: "v4", auth });

  /** ------------------------
   *  3. Save to Google Sheets
   * ------------------------- */
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:D", // change "Sheet1" if your tab name is different
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[new Date().toISOString(), name, age, JSON.stringify(result)]],
      },
    });
    console.log("✅ Data saved to Google Sheets");
  } catch (error) {
    console.error("❌ Google Sheets error:", error);
  }

  /** ------------------------
   *  4. Send Email
   * ------------------------- */
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
    text: `Name: ${name}\nAge: ${age}\nResult: ${JSON.stringify(
      result,
      null,
      2
    )}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully!");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error);
    let errorMessage = "Unknown error";
    if (error instanceof Error) errorMessage = error.message;
    else if (typeof error === "string") errorMessage = error;

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
