import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SmsService {
    private readonly baseURL = "https://notify.eskiz.uz/api"
    private readonly email = "ibodullayevamunisa570@gmail.com"
    private readonly password = "kqohFpgYT9HH2iej3ZgrXkvFyjCfe697bS19b3tO"
    private token: string | null = null

    async authenticate (){
        try {
            let { data } = await axios.post(`${this.baseURL}/auth/login`,
                {
                    email: this.email,
                    password: this.password
                }
            )
            this.token =  data?.data?.token
        } catch (error) {
            return error
        }
    }

    async ensureAuthenticate(){
        if(!this.token){
            await this.authenticate()
        }
    }

    async sendSMS(phone: string, message: string){
        await this.ensureAuthenticate()
        console.log(message)

        try {
            let res = await axios.post(`${this.baseURL}/message/sms/send`, 
                {
                    mobile_phone: phone,
                    message: message,
                    from: "4546"
                },
                {
                    headers: {Authorization: `Bearer ${this.token}`}
                }
            )
            return res
        } catch (error) {
            this.token = null
            await this.sendSMS(phone, message)
        }
    }
}
