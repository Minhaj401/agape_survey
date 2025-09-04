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
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 12px; background: #ffffff;">
    <h2 style="color: #1976d2; text-align: center; margin-bottom: 20px;">
      Personality Quiz Result
    </h2>

    <div style="margin-bottom: 20px; font-size: 16px; color: #333;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age}</p>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="color: #1976d2; margin-bottom: 10px;">Trait Scores</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${Object.entries(result.traits)
          .map(
            ([trait, score]) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #eaeaea; text-transform: capitalize;">
              ${trait.replace("_", " ")}
            </td>
            <td style="padding: 8px; border: 1px solid #eaeaea; text-align: right;">
              ${score}
            </td>
          </tr>`
          )
          .join("")}
      </table>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="color: #1976d2; margin-bottom: 10px;">Dominant Trait</h3>
      <div style="padding: 12px; background: #f4f8ff; border-left: 4px solid #1976d2; border-radius: 6px; font-size: 15px; color: #333;">
        ${result.dominantTrait.replace("_", " ")}
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="color: #1976d2; margin-bottom: 10px;">Suggestions</h3>
      <ul style="padding-left: 20px; font-size: 14px; color: #333; line-height: 1.6;">
        ${result.suggestions
          .map((s: string) => `<li style="margin-bottom: 6px;">${s}</li>`)
          .join("")}
      </ul>
    </div>

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
