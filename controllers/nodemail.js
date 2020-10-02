const nodemailer = require('nodemailer')

module.exports = {
    sendTestMail
}

function sendTestMail(req,res){
    sendMail(req.body.subject, req.body.message, req.body.email, req.body.name)
    res.status(200).json('Email sent...')
}

function sendMail(subject, name, email, message){
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'meetyourmaker727@gmail.com',
            pass: process.env.GOOGLE_APP_PASSWORD
        }
    });
    transporter.sendMail({
        from: 'meetyourmaker727@gmail.com',
        to: 'meetyourmaker727@gmail.com',
        subject: `${subject}`,
        text: `${name} 
        
        From:(${email})${message}`
    })
}