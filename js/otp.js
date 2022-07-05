const nodemailer = require('nodemailer');

const buttons = document.getElementsByClassName("send-otp");

console.log("helo world")

function generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }

    return OTP;
}

  


function mailOTP(e) {
    // console.log(e.target.parentElement.nextSibling.nextSibling);
    e.target.parentElement.nextSibling.nextSibling.style.display = "block";

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "hsbthegreat57@gmail.com",
            pass: "aitchessbee"
        }
    });

    const options = {
        from: "hsbthegreat57@gmail.com",
        to: "bediharsiddak@gmail.com",
        subject: "Sending email with node.js!",
        text: "wow! That's simple"
    };

    transporter.sendMail(options, (err, info) => {
        if(err){
            console.log(err);
        }else {
            console.log(info.response);
        }
    })
    
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", otp);
}

function verifyOTP(){

}