'use strict';

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({currentWindow: true, active: true},function(tabArray) {
    chrome.tabs.sendMessage(tabArray[0].id, "current_website", (result) => {
      console.log(result.site);
      let file = '';
      if(result.site.includes('airtable.com')) {
        file = 'content/airtable.json'
      } else if(result.site.includes('asana.com')) {
        file = 'content/asana.json'
      } else if(result.site.includes('discord.com')) {
        file = 'content/discord.json'
      } else if(result.site.includes('evernote.com')) {
        file = 'content/evernote.json'
      } else if(result.site.includes('figma.com')) {
        file = 'content/figma.json'
      } else if(result.site.includes('framer.com')) {
        file = 'content/framer-x.json'
      } else if(result.site.includes('github.com')) {
        file = 'content/github.json'
      } else if(result.site.includes('drive.google.com')) {
        file = 'content/google-drive.json'
      } else if(result.site.includes('jira.com')) {
        file = 'content/jira.json'
      } else if(result.site.includes('monday.com')) {
        file = 'content/monday.json'
      } else if(result.site.includes('notion.so')) {
        file = 'content/notion.json'
      } else if(result.site.includes('proto.io')) {
        file = 'content/proto-io.json'
      } else if(result.site.includes('quip.com')) {
        file = 'content/quip.json'
      } else if(result.site.includes('slack.com')) {
        file = 'content/slack.json'
      } else if(result.site.includes('trello.com')) {
        file = 'content/trello.json'
      } else if(result.site.includes('youtube.com')) {
        file = 'content/youtube.json'
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
            inner_p.innerText = shortcut.description;
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
      if (elements[i].style.display != "none") {
        current_elements.push(elements[i]);
      } 
    }
  }
  if(event.keyCode === 40 && event.target.nodeName === 'INPUT') {
    event.preventDefault();
    let el = current_elements[0]
    el.parentElement.focus();
  } else if (event.keyCode === 40 && event.target.nodeName === 'DIV') {
    event.preventDefault();
    let el = document.activeElement.nextElementSibling;
    el.focus();
  } else if (event.keyCode === 38 && event.target.nodeName === 'DIV') {
    event.preventDefault();
    let el = document.activeElement.previousElementSibling;
    el.focus();
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
      elements[i].parentElement.tabIndex = i;
      a = elements[i].getElementsByTagName('p')[0];
      txtValue = a.innerText;
    }
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        elements[i].style.display = "";
        current_elements.push(elements[i]);
    } else {
        elements[i].style.display = "none";
        current_elements.splice(i, 1);
    }
  }
}

const input = document.getElementById("search"); 
input.addEventListener("keyup", function (event) {
  filter();
  return true;
});