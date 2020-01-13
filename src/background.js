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

function on_message() {
  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log(msg);

    if (msg.text == "log_user_in"){
      chrome.storage.sync.set({'logged_in': 'true'}, () => {
        var date = new Date();
        date.setDate(date.getDate()+7);
        chrome.storage.sync.set({'rundown_date': date.toISOString()}, () => {
          console.log(date.toISOString());
        });
      });
    }

    if (msg.email) {
      chrome.storage.sync.set({'user_email': msg.email}, () => {
        console.log(msg.email);
      });
    }
  });
}

on_message();