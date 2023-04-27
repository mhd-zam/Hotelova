// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
    signInWithPhoneNumber,
    getAuth,
    RecaptchaVerifier,
} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APPID,
    measurementId: process.env.REACT_MESUREMENTID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export function recaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
            size: 'invisible',
            callback: () => {},
        },
        auth
    )
}

export function onSigninssubmit(countryCode, phonenumber) {
    const phoneNumber = countryCode + phonenumber
    const appVerifier = window.recaptchaVerifier
    return new Promise((resolve, reject) => {
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult
                resolve()
            })
            .catch((err) => {
                reject(err)
            })
    })
}
