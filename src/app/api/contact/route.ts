import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, email, inquiry, message } = data;

        // Check if environment variables are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Missing EMAIL_USER or EMAIL_PASS environment variables');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sends the email to yourself
            subject: `Portfolio Signal: ${inquiry} from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nInquiry: ${inquiry}\n\nMessage:\n${message}`,
            replyTo: email, // If you hit "Reply" in Gmail, it replies to the person who filled out the form
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
