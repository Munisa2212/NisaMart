import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'


@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ibodullayevamunisa570@gmail.com",
            pass: "mffm duhx fcip vrkb"
        }
    })

    async sendMail(email: string, subject: string, text: string){
        const mail = {
            to: email,
            subject: subject,
            text: text
        }

        try {
            const info = await this.transporter.sendMail(mail)
            return info
        } catch (error) {
            throw new BadRequestException("Wrong email")
        }
    }
}
