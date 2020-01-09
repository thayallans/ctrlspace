'use strict';

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({currentWindow: true, active: true},function(tabArray) {
    chrome.tabs.sendMessage(tabArray[0].id, "current_website", (result) => {
      console.log(result.site);
      let file = '';
      if(result.site.includes('airtable.com')) {
        file = 'mac_content/mac_airtable.json'
      } else if(result.site.includes('asana.com')) {
        file = 'mac_content/mac_asana.json'
      } else if(result.site.includes('discordapp.com')) {
        file = 'mac_content/mac_discord.json'
      } else if(result.site.includes('evernote.com')) {
        file = 'mac_content/mac_evernote.json'
      } else if(result.site.includes('figma.com')) {
        file = 'mac_content/mac_figma.json'
      } else if(result.site.includes('framer.com')) {
        file = 'mac_content/mac_framer-x.json'
      } else if(result.site.includes('github.com')) {
        file = 'mac_content/mac_github.json'
      } else if(result.site.includes('drive.google.com')) {
        file = 'mac_content/mac_google-drive.json'
      } else if(result.site.includes('jira.com')) {
        file = 'mac_content/mac_jira.json'
      } else if(result.site.includes('monday.com')) {
        file = 'mac_content/mac_monday.json'
      } else if(result.site.includes('notion.so')) {
        file = 'mac_content/mac_notion.json'
      } else if(result.site.includes('proto.io')) {
        file = 'mac_content/mac_proto-io.json'
      } else if(result.site.includes('quip.com')) {
        file = 'mac_content/mac_quip.json'
      } else if(result.site.includes('slack.com')) {
        file = 'mac_content/mac_slack.json'
      } else if(result.site.includes('trello.com')) {
        file = 'mac_content/mac_trello.json'
      } else if(result.site.includes('youtube.com')) {
        file = 'mac_content/mac_youtube.json'
      }
      $.getJSON(file, function(json) {
        const all_sections = json.sections;
        let all_shortcuts = [];
        const main_div = document.getElementById('mainDiv');
        all_sections.forEach((section) => {
          section.shortcuts.forEach((shortcut) => {
            var outer_div = document.createElement('div');
            outer_div.classList.add('flex');
            var first_outer_div = document.createElement('div');
            first_outer_div.classList.add('w-1/2');
            first_outer_div.classList.add('bg-gray-900');
            first_outer_div.classList.add('h-12');
            var first_inner_div = document.createElement('div');
            first_inner_div.classList.add('px-6');
            first_inner_div.classList.add('py-4');
            var inner_p = document.createElement('p');
            inner_p.classList.add('text-lg');
            inner_p.classList.add('font-semibold');
            inner_p.classList.add('text-gray-100');
            inner_p.style.textAlign = 'center';

            var desc = shortcut.description;
            if (desc[desc.length-1] === " ") {
              inner_p.style.fontSize = "12px";
              desc = desc.slice(0,desc.length - 1);
              if (desc[desc.length-1] === " ") {
                inner_p.style.fontSize = "10px";
                desc = desc.slice(0,desc.length - 1);
              }
            }
            inner_p.innerText = desc;
            
            var second_outer_div = document.createElement('div');
            second_outer_div.classList.add('w-1/2');
            second_outer_div.classList.add('bg-gray-900');
            second_outer_div.classList.add('h-12');
            var second_inner_div = document.createElement('div');
            second_inner_div.classList.add('px-6');
            second_inner_div.classList.add('py-4');
            var second_even_inner_div = document.createElement('div');
            second_even_inner_div.style.textAlign = 'left';
    
            shortcut.keys.forEach((key) => {
              var key_span = document.createElement('span');
              key_span.classList.add('inline-block');
              key_span.classList.add('bg-gray-200');
              key_span.classList.add('rounded-full');
              key_span.classList.add('px-4');
              key_span.classList.add('mx-1');
              key_span.classList.add('py-1');
              key_span.classList.add('text-sm');
              key_span.classList.add('font-semibold');
              key_span.classList.add('text-gray-700');
              key_span.innerText = key;
              second_even_inner_div.appendChild(key_span);
            });
    
            first_inner_div.appendChild(inner_p);
            first_outer_div.appendChild(first_inner_div);
            second_inner_div.appendChild(second_even_inner_div);
            second_outer_div.appendChild(second_inner_div);
            outer_div.appendChild(first_outer_div);
            outer_div.appendChild(second_outer_div)
            main_div.appendChild(outer_div);
            all_shortcuts.push(shortcut);
          });
        });
      });
      return true;
    });
  });
  chrome.storage.sync.get(['logged_in'], (result) => {
    if(result.logged_in == 'false') {      
      window.location.href = "login.html";
    }
    return true;
  });
});

document.addEventListener("keydown", function (event) {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  var elements = document.getElementsByClassName('w-1/2 bg-gray-900 h-12');
  var current_elements = [];
  for (i = 0; i < elements.length; i++) {
    if(elements[i].getElementsByTagName("p")[0]) {
      if (elements[i].parentElement.style.display != "none") {
        current_elements.push(elements[i]);
      }
    }
  }
  let current_index = 0;
  for(i=0; i < current_elements.length; i++) {
    if(current_elements[i].parentElement == document.activeElement) {
      current_index = i;
    }
  }
  if (event.keyCode === 32 && event.ctrlKey && event.shiftKey) {
    window.location.href = "shortcut_map.html";
  }
  else if(event.keyCode === 40 && event.target.nodeName === 'INPUT') {
    event.preventDefault();
    let el = current_elements[0]
    el.parentElement.focus();
  } else if (event.keyCode === 40 && event.target.nodeName === 'DIV') {
    event.preventDefault();
    current_elements[current_index + 1].parentElement.focus();
  } else if (event.keyCode === 38 && event.target.nodeName === 'DIV') {
    event.preventDefault();
    current_elements[current_index - 1].parentElement.focus();
  } else if (event.keyCode === 13) {
    let keys = [];
    const elements = document.activeElement.getElementsByTagName('span')
    for (i = 0; i < elements.length; i++) {
      keys.push(elements[i].innerText.toLowerCase());
    }
    chrome.tabs.query({currentWindow: true, active: true},function(tabArray) {
      chrome.tabs.sendMessage(tabArray[0].id, keys);
    });
    window.close();
  } else {
    document.getElementById("search").focus();
  }
});

function filter() {
  var input, filter, a, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  var elements = document.getElementsByClassName('w-1/2 bg-gray-900 h-12');
  var current_elements = [];
  for (i = 0; i < elements.length; i++) {
    if(elements[i].getElementsByTagName('p')[0]) {
      elements[i].parentElement.tabIndex = i/2;
      a = elements[i].getElementsByTagName('p')[0];
      txtValue = a.innerText;
      const words = txtValue.split(" ");
      if(txtValue.toUpperCase().indexOf(filter) > -1) {
        elements[i].parentElement.style.display = "";
        if(!current_elements.includes(txtValue)){
          current_elements.push(txtValue);
        }
      } else {
        let total = 0;
        words.forEach((word) => {
          if (smart_search(filter.toLowerCase(), word.toLowerCase())) {
            elements[i].parentElement.style.display = "";
            if(!current_elements.includes(txtValue)) {
              current_elements.push(txtValue);
              total++;
            }
          }
        });
        if(total == 0 && filter != "") {
          elements[i].parentElement.style.display = "none";
          console.log(current_elements);
          current_elements.splice(i, 1);
        }
        total = 0;
      }
    }
  }
}

const input = document.getElementById("search"); 
input.addEventListener("keyup", function (event) {
  filter();
  return true;
});
