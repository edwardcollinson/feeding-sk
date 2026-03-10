import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const { name, email, company, inquiryType, message } =
      await request.json();

    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      const subject = encodeURIComponent(`[${inquiryType}] Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}${company ? `\nCompany: ${company}` : ""}\nInquiry Type: ${inquiryType}\n\n${message}`
      );
      return NextResponse.json({
        fallback: true,
        mailto: `mailto:hello@feedingsk.com?subject=${subject}&body=${body}`,
      });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : "";
    const safeInquiryType = escapeHtml(inquiryType);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const resend = new Resend(RESEND_API_KEY);

    await resend.emails.send({
      from: "Feeding SK Website <noreply@feedingsk.com>",
      to: ["hello@feedingsk.com"],
      replyTo: email,
      subject: `[${safeInquiryType}] New inquiry from ${safeName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ""}
        <p><strong>Inquiry Type:</strong> ${safeInquiryType}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
