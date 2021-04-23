import nodemailer from "nodemailer";
import { __prod__ } from "../constants";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "a7jkj44cknv52fvi@ethereal.email",
    pass: "btD63yDzv8sBNpfq65",
  },
});

export const sendEmail = async (to: string, html: string) => {
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: "Hello ✔", // Subject line
    html,
  });
  console.log(nodemailer.getTestMessageUrl(info));
  return info;
};
