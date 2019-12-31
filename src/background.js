'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.sync.set({'logged_in': 'false'}, function() {
    console.log('user not logged in');
  });
});

firebase.initializeApp({
  apiKey: 'AIzaSyAFcFucaZr6IoJo8ew56PpC5N7NIKw1jKg',
  authDomain: 'lipid-327dc.firebaseapp.com',
  projectId: 'lipid-327dc'
});

function on_message() {
  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log(msg);
    if (msg.command == "login"){
      firebase.auth().signOut();
      firebase.auth().signInWithEmailAndPassword(msg.email, msg.password).then(() => {
        console.log(firebase.auth().current_user);
        response({status: 'success'});
        return true;
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
      chrome.storage.sync.set({'logged_in': 'true'}, function() {
        console.log('user logged in');
      });
    } else if (msg.command == "get_current_user") {
      response({user: firebase.auth().currentUser});
    }
    return true;
  });
}

on_message();