const nodemailer = require("nodemailer");

export default async function handler(req, res) {

    // Only POST request allowed
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    // Get email from frontend
    const { email } = req.body;

    // Generate 6 digit OTP
    const otp = Math.floor(
        100000 + Math.random() * 900000
    );

    // Gmail SMTP Setup
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "stevehostsupport@gmail.com",
            pass: "ocvr idno gmaq kkjg"
        }
    });

    try {

        // Send Email
        await transporter.sendMail({

            from: '"SteveHost Security" <stevehostsupport@gmail.com>',

            to: email,

            subject: "Password Reset OTP",

            html: `
            <div style="
                font-family:sans-serif;
                padding:20px;
                background:#f5f5f5;
            ">

                <div style="
                    max-width:500px;
                    margin:auto;
                    background:white;
                    padding:30px;
                    border-radius:15px;
                    box-shadow:0 0 10px rgba(0,0,0,0.1);
                ">

                    <h1 style="
                        color:#111;
                        margin-bottom:10px;
                    ">
                        SteveHost Security
                    </h1>

                    <p style="
                        font-size:16px;
                        color:#444;
                    ">
                        Your password reset code is:
                    </p>

                    <div style="
                        background:#111;
                        color:#00ff99;
                        font-size:40px;
                        font-weight:bold;
                        padding:20px;
                        border-radius:12px;
                        width:max-content;
                        letter-spacing:6px;
                        margin-top:20px;
                        margin-bottom:20px;
                    ">
                        ${otp}
                    </div>

                    <p style="
                        color:#666;
                        font-size:14px;
                    ">
                        This OTP expires in 10 minutes.
                    </p>

                </div>

            </div>
            `
        });

        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
} 
