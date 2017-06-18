   // Initialize Firebase
var config = {
    apiKey: "AIzaSyDos3zgZ9DoB8j40av-ZfCM-kjXOE1_KH8",
    authDomain: "web-quickstart-edc16.firebaseapp.com",
    databaseURL: "https://web-quickstart-edc16.firebaseio.com",
    storageBucket: "web-quickstart-edc16.appspot.com",
    messagingSenderId: "175050742006"
  };
  firebase.initializeApp(config);

  //Get elements
  const preObject = document.getElementById('object');
  const ulList = document.getElementById('list');
  //create references
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefList = dbRefObject.child('hobbies');
  //sync object changs
  dbRefObject.on('value',snap => {
  	preObject.innerText = JSON.stringify(snap.val(), null,	3);
  });
  dbRefList.on('child_added',snap=>{
    const li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key;
    ulList.appendChild(li);
    });
  dbRefList.on('child_changed',snap=>{

    const liChanged = document.getElementById(snap.key);
    liChanged.innerText = snap.val();

    });
  dbRefList.on('child_removed',snap=>{
    
    const liToRemoved = document.getElementById(snap.key);
    liToRemoved.remove();

    });