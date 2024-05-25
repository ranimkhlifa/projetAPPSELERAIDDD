const form = document.getElementById('form');
const username = document.getElementById('username');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const email2 = document.getElementById('email2');
const passwordL = document.getElementById('passwordL');


form.addEventListener('submit', e => {
    e.preventDefault();
    if (form_verify()) {
        emailSendAndWhatsapp();
    }
});

// Function to handle login form submission
formLogin.addEventListener('submit', e => {
    e.preventDefault();
    form_login_verify();
});


function form_verify() {
    // Obtenir toutes les valeurs des inputs
    const userValue = username.value.trim();
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();
    const pwdValue = password.value.trim();
    const pwd2Value = password2.value.trim();
    let isValid = true;

    // Username verify
    if (userValue === "") {
        let message = "Username ne peut pas être vide";
        setError(username, message);
        isValid = false;
    } else if (!userValue.match(/^[a-zA-Z]/)) {
        let message = "Username doit commencer par une lettre";
        setError(username, message);
        isValid = false;
    } else if (userValue.length < 3) {
        let message = "Username doit avoir au moins 3 caractères";
        setError(username, message);
        isValid = false;
    } else {
        setSuccess(username);
    }

    // Phone verify
    if (phoneValue === "") {
        let message = "Le numéro de téléphone ne peut pas être vide";
        setError(phone, message);
        isValid = false;
    } else if (!phoneValue.match(/^[257]\d{7}$/)) {
        let message = "Le numéro de téléphone doit commencer par 2, 5 ou 7 et contenir 8 chiffres";
        setError(phone, message);
        isValid = false;
    } else {
        setSuccess(phone);
    }

    // Email verify
    if (emailValue === "") {
        let message = "Email ne peut pas être vide";
        setError(email, message);
        isValid = false;
    } else if (!email_verify(emailValue)) {
        let message = "Email non valide";
        setError(email, message);
        isValid = false;
    } else {
        setSuccess(email);
    }

    // Password verify
    if (pwdValue === "") {
        let message = "Le mot de passe ne peut pas être vide";
        setError(password, message);
        isValid = false;
    } else if (!password_verify(pwdValue)) {
        let message = "Le mot de passe est trop faible (8 à 12 caractères)";
        setError(password, message);
        isValid = false;
    } else {
        setSuccess(password);
    }

    // Password confirmation verify
    if (pwd2Value === "") {
        let message = "Le mot de passe de confirmation ne peut pas être vide";
        setError(password2, message);
        isValid = false;
    } else if (pwdValue !== pwd2Value) {
        let message = "Les mots de passe ne correspondent pas";
        setError(password2, message);
        isValid = false;
    } else {
        setSuccess(password2);
    }

    return isValid;
}

// Login form verification function
function form_login_verify() {
    const emailVal = email2.value.trim();
    const pwdVal = passwordL.value.trim();
    let isValid = true;

    // Email verify
    if (emailVal === "") {
        let message = "Email ne peut pas être vide";
        setError(email2, message);
        isValid = false;
    } else if (!email_verify(emailVal)) {
        let message = "Email non valide";
        setError(email2, message);
        isValid = false;
    } else {
        setSuccess(email2);
    }

    // Password verify
    if (pwdVal === "") {
        let message = "Le mot de passe ne peut pas être vide";
        setError(passwordL, message);
        isValid = false;
    } else if (!password_verify(pwdVal)) {
        let message = "Le mot de passe est trop faible (8 à 12 caractères)";
        setError(passwordL, message);
        isValid = false;
    } else {
        setSuccess(passwordL);
    }

    return isValid;
}


function setError(elem, message) {
    const formControl = elem.parentElement;
    const small = formControl.querySelector('small');

    // Ajout du message d'erreur
    small.innerText = message;

    // Ajout de la classe error
    formControl.className = "form-control error";
}

function setSuccess(elem) {
    const formControl = elem.parentElement;
    formControl.className = 'form-control success';
}

function email_verify(email) {
    /*
    * r_rona.22-t@gmail.com
    * /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    */
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
}

function password_verify(password) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(password);
}

function emailSendAndWhatsapp() {
    const userValue = username.value.trim();
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();
    
    const messageBody = "Name: " + userValue +
        "<br/> Phone: " + phoneValue +
        "<br/> Email: " + emailValue;
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "khlifaranim13@gmail.com",
            Password : "19AF308D4FD19F7FF3FFC9D5822C792A5E86",
            To : 'crmenzli.eleve@ec-tunis.com',
            From : "khlifaranim13@gmail.com",
            Subject : "Votre email a été créé avec succès",
            Body : "Votre email a été créé avec succès"
        }).then(
            message => {
                if (message === 'OK') {
                    swal("Successful", "Email sent successfully!", "success");
                } else {
                    console.error("Email sending error:", message); // Log the actual error message
                    swal("Error", "Email could not be sent. Error: " + message, "error");
                }
            }
        ).catch(
            error => {
                console.error("Email sending exception:", error); // Log any exception that occurs
                swal("Error", "Email could not be sent. Exception: " + error.message, "error");
            }
        );
        
        
     
    const whatsappUrl = "https://wa.me/" + phoneValue + "?text="
        + "Username: " + userValue + "%0a"
        + "Email: " + emailValue + "%0a";
       

    window.open(whatsappUrl, '_blank').focus();
}
