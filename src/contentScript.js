'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message == "current_website") {
    sendResponse({site: window.location.href});
    return true;
  } else {
    const mac_keypress = message.join('+');
    let main_key = mac_keypress.split('+').pop(); //last letter/key
    let main_key_code = 'Key'+main_key.toUpperCase();
    let diff = 32;  
    let char_code = main_key.charCodeAt(0); //ascii value of key pressed
    let key_code = main_key.charCodeAt(0)-diff; //value of js keypress event
    if(key_codes[main_key]) { //checks if diff between ascii 
      main_key = key_codes[main_key].main_key;
      main_key_code = key_codes[main_key].main_key_code;
      key_code = key_codes[main_key].key_code;
    }
    const keyevent = new KeyboardEvent('keydown', {
      key: main_key,
      code: main_key_code,
      location: document,
      ctrlKey: mac_keypress.includes('ctrl'),
      shiftKey: mac_keypress.includes('shift'),
      altKey: mac_keypress.includes('alt'),
      metaKey: mac_keypress.includes('cmd'),
      repeat: true,
      isComposing: false,
      charCode: char_code,
      keyCode: key_code,
      which: key_code,
      bubbles: true, // Needed for google docs..
    });
    document.activeElement.dispatchEvent(keyevent);
  }
});

