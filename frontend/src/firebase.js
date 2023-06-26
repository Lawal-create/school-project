import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC029kLMEDWJuCqdn-tWB3bTJ-Ol2QVV6s",
    authDomain: "hacktoon-tempmonitor.firebaseapp.com",
    databaseURL: "https://hacktoon-tempmonitor-default-rtdb.firebaseio.com/",
    projectId: "hacktoon-tempmonitor",
    storageBucket: "hacktoon-tempmonitor.appspot.com",
    messagingSenderId: "779404703071",
    appId: "1:779404703071:web:9af55cdbfce3e63ba332ea"
}

firebase.initializeApp(config);
export default firebase;