 // Your web app's Firebase configuration
 var firebaseConfig = {
     apiKey: "AIzaSyDg-ZoYApetnpOysaobdUTEW6Hq6bT3Irs",
     authDomain: "cv-emerson.firebaseapp.com",
     databaseURL: "https://cv-emerson.firebaseio.com",
     projectId: "cv-emerson",
     storageBucket: "cv-emerson.appspot.com",
     messagingSenderId: "299036566903",
     appId: "1:299036566903:web:1f87f92c76b6a601bd2d72",
     measurementId: "G-QSDT1FZ3EW"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();

 var database = firebase.database();