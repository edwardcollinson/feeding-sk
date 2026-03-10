import { NextResponse } from "next/server";
import { Resend } from "resend";

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

    const resend = new Resend(RESEND_API_KEY);

    await resend.emails.send({
      from: "Feeding SK Website <noreply@feedingsk.com>",
      to: ["hello@feedingsk.com"],
      replyTo: email,
      subject: `[${inquiryType}] New inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
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
