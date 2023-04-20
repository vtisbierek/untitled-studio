import { NextApiRequest, NextApiResponse } from "next";

const nodemailer = require("nodemailer");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const name = req.body.name;
    const email = req.body.email;
    const business = req.body.business;
    const message = req.body.message;

    let config = {
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_PASSWORD
      }
    }

    let transporter = nodemailer.createTransport(config);

    let emailContent = {
      from: "untitled.studio.official@gmail.com", // sender address
      to: "metropoller@gmail.com", // list of receivers
      subject: "Inquiry from Website", // Subject line
      text: "Name: " + name + "\nEmail: " + email + "\nBusiness: " + business + "\nMessage: " + message, // plain text body
      html: `<b>Name: ${name}</b><br /><b>Email: ${email}</b><br /><b>Business: ${business}</b><br /><b>Message: ${message}</b>`, // html body
    };

    transporter.sendMail(emailContent).then((info:any) => {
      return res.status(201).json({
        msg: "email foi enviado",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info)
    })
    }).catch((err: any) => {
      return res.status(500).json({ err })
    });
}



