import firebase from "firebase/app"

class AuthController {

    init() {
        let config = {
            apiKey: "AIzaSyBNMohLbPiSKwpGwfARopdeW_6LLXujcUo",
            authDomain: "clinfhir.firebaseapp.com",
            databaseURL: "https://clinfhir.firebaseio.com",
            storageBucket: ""
        }

        firebase.initializeApp(config)
       
    }
}

export const AuthService = new AuthController()