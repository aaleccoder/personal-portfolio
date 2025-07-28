"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendEmail(data: z.infer<typeof formSchema>) {
  try {
    const { name, email, message } = formSchema.parse(data);

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

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten() };
    }
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
}
