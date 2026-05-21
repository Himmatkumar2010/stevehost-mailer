const nodemailer = require("nodemailer");

export default async function handler(req, res) {

    if(req.method !== "POST"){

        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { email } = req.body;

    const otp = Math.floor(
        100000 + Math.random() * 900000
    );

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "YOUR_GMAIL@gmail.com",
            pass: "YOUR_APP_PASSWORD"
        }
    });

    try {

        await transporter.sendMail({

            from: '"SteveHost Security" <YOUR_GMAIL@gmail.com>',

            to: email,

            subject: "Password Reset Code",

            html: `
            <div style="
                font-family:sans-serif;
                padding:20px;
            ">

                <h2>Password Reset</h2>

                <p>Your OTP Code:</p>

                <div style="
                    background:#111;
                    color:#00ff99;
                    padding:15px;
                    font-size:35px;
                    border-radius:10px;
                    width:max-content;
                    font-weight:bold;
                    letter-spacing:5px;
                ">
                    ${otp}
                </div>

            </div>
            `
        });

        return res.status(200).json({
            success:true,
            otp
        });

    } catch(err){

        console.log(err);

        return res.status(500).json({
            success:false,
            error: err.message
        });
    }
}
