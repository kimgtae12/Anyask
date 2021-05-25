
//firebase 연결 코드
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAausUoaQvD2SePUEmt1ucav5eiqP2yJPw",
    authDomain: "anyask-a1a5f.firebaseapp.com",
    databaseURL: "https://anyask-a1a5f-default-rtdb.firebaseio.com",
    projectId: "anyask-a1a5f",
    storageBucket: "anyask-a1a5f.appspot.com",
    messagingSenderId: "913453891807",
    appId: "1:913453891807:web:05e67d5ada2e8229a7a96a",
    measurementId: "G-Q2FRTYGT7C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var user_id_list = [];

//user_list 받아오기.
var userDbRef = database.ref('/users/');
userDbRef.orderByKey().once('value').then(function (snapshot) {
    snapshot.forEach(function (userSnapshot) {
        var userKey = userSnapshot.key;
        user_id_list.push(userKey);
    });
});
