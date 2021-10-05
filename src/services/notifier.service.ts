import nodeMailer from 'nodemailer';
import { Configuration } from '../config';
import { NotifierDto } from '../dto/notifier.dto';

export class NotifierService {
    
    public sendEmail(notifierDto: NotifierDto ){
        const configuration = new Configuration();

        var transporter = nodeMailer.createTransport(configuration.smtp());

        var mailMessage = {
            from: configuration.smtpUser,
            to: notifierDto.email,
            subject: notifierDto.subject,
            text: notifierDto.message
        };

        transporter.sendMail(mailMessage, function(error, data){
            if (error) {
                console.log(error);
                
                throw error;
            }

            return {
                data
            }
        });
    }
}