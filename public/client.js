let emailOtp = "";
let emailVerified = false;

function mailOtp(e){
    e.preventDefault();

    let email = document.getElementById("email-box").value;

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
        document.getElementById("email-box").style.borderColor = "#dddddd";
        document.getElementsByClassName("errorDiv")[0].textContent = "";

        e.target.parentElement.nextSibling.nextSibling.style.display = "block";

        fetch("/sendotp", {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                email: email,
            })
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            emailOtp = data.otp;
            console.log(data);
            return data;
        })
    } else {
        document.getElementsByClassName("errorDiv")[0].textContent = "Invalid Email ID";
        document.getElementById("email-box").style.borderColor = "red";
    }
  
  }

    

function mobileOtp(e){
    e.preventDefault();

    let mobile = document.getElementById("mobile-box").value;

    var validRegex = /^\d{10}$/;

    if (mobile.match(validRegex)) {
        document.getElementById("mobile-box").style.borderColor = "#dddddd";
        document.getElementsByClassName("errorDiv")[0].textContent = "";

        e.target.parentElement.nextSibling.nextSibling.style.display = "block";

        
    } else {
        document.getElementsByClassName("errorDiv")[0].textContent = "Invalid Mobile No.";
        document.getElementById("mobile-box").style.borderColor = "red";
    }
  
}




const mailOtpBtn = document.getElementById("send-mail-otp");
mailOtpBtn.addEventListener("click", mailOtp);

const mobileOtpBtn = document.getElementById("send-mobile-otp");
mobileOtpBtn.addEventListener("click", mobileOtp);

function checkMailOtp(e) {
    e.preventDefault();
    console.log(document.getElementById("email-otp-box").value)
    if(document.getElementById("email-otp-box").value == emailOtp){
        document.getElementById("email-otp-box").style.borderColor = "#dddddd";
        document.getElementsByClassName("errorDiv")[0].textContent = "";

        console.log("otp verified");
        emailVerified = true;
        e.target.parentElement.style.display = "none";
        mailOtpBtn.style.display = "none";
        document.getElementById("mail-checkMark").style.display = "block"
    }else {
        document.getElementById("email-otp-box").style.borderColor = "red";
        document.getElementsByClassName("errorDiv")[0].textContent = "Wrong OTP";
    }
}

function checkMobileOtp(e) {
    e.preventDefault();
}


const checkMailOtpBtn = document.getElementById("check-mail-otp");
checkMailOtpBtn.addEventListener("click", checkMailOtp);

const checkMobileOtpBtn = document.getElementById("check-mobile-otp");
checkMobileOtpBtn.addEventListener("click", checkMobileOtp);



function registerSubmit() {
    console.log("submit function run")
    let error = "";
    let inputs = document.getElementsByTagName("input")
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].value === ""){
            inputs[i].style.borderColor = "red";
            error = "*Please fill all the fields."
            document.getElementsByClassName("errorDiv")[0].textContent = error;
        }else{
            inputs[i].style.borderColor = "#dddddd";
        }
    }

    if(error == ""){
        // console.log(document.getElementsByClassName("login-form")[0]);
        document.getElementsByClassName("login-form")[0].submit();

    }else {
        console.log(error);
    }
}