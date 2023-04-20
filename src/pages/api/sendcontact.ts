import { NextApiRequest, NextApiResponse } from "next";

const nodemailer = require("nodemailer");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
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
      text: "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\nBusiness: " + business + "\nMessage: " + message, // plain text body
      html: `<b>Name: </b><span>${name}</span><br /><b>Email: </b><span>${email}</span><br /><b>Phone: </b><span>${phone}</span><br /><b>Business: </b><span>${business}</span><br /><b>Message: </b><span>${message}</span>`, // html body
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



