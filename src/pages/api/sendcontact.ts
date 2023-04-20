import { NextApiRequest, NextApiResponse } from "next";

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const name = req.body.name;
    const email = req.body.email;
    const business = req.body.business;
    const message = req.body.message;

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let emailContent = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(emailContent).then((info:any) => {
      return res.status(201).json({
        msg: "email foi enviado",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info)
    })
    }).catch((err: any) => {
      return res.status(500).json({ err })
    })

    //res.json(name + ", " + email + ", " + business + ", " + message);
}



