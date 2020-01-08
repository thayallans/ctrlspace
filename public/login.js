
document.addEventListener("DOMContentLoaded", function(event) {
  chrome.storage.sync.get(['logged_in'], (result) => {
    if(result.logged_in == 'false') {      
      document.getElementById('login').onclick = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        chrome.runtime.sendMessage({command: "login", email: email, password: password}, (msg) => {
          if (msg.status == 'success') {
            window.location.href = "popup.html";
          };
          return true;
        }); 
        return true;
      };
    }
    return true;
  });
});
