import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = formSchema.parse(body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alejandroperezacosta105@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: "alejandroperezacosta105@gmail.com",
      subject: `New message from ${name} on your portfolio`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}