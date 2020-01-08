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
        main_div.style.display = 'flex';
        var column_div = document.createElement('div');
        column_div.style.float = 'left';
        column_div.style.display = 'inline-block';
        let counter = 0;
        all_sections.forEach((section) => {
          section.shortcuts.forEach((shortcut) => {
            counter++;
            if (counter == 10) {
              column_div = document.createElement('div');
              column_div.style.float = 'left';
              column_div.style.display = 'inline-block';
              counter = 0;
            }
            var outer_div = document.createElement('div');
            outer_div.classList.add('flex');
            var first_outer_div = document.createElement('div');
            first_outer_div.classList.add('w-1/2');
            first_outer_div.classList.add('bg-gray-900');
            first_outer_div.classList.add('h-12');
            var first_inner_div = document.createElement('div');
            first_inner_div.classList.add('px-6');
            first_inner_div.classList.add('py-4');
            first_inner_div.style.width = '225px';
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
            second_inner_div.classList.add('px-2');
            second_inner_div.classList.add('py-4');
            second_inner_div.style.width = '200px';
            var second_even_inner_div = document.createElement('div');
            second_even_inner_div.style.textAlign = 'left';
    
            shortcut.keys.forEach((key) => {
              var key_span = document.createElement('span');
              key_span.classList.add('inline-block');
              key_span.classList.add('bg-gray-200');
              key_span.classList.add('rounded-full');
              key_span.classList.add('px-2');
              key_span.classList.add('mx-1');
              key_span.classList.add('py-1');
              key_span.classList.add('text-sm');
              key_span.classList.add('font-semibold');
              key_span.classList.add('text-gray-700');
              key_span.innerText = key;
              key_span.style.float = 'left';
              key_span.style.display = 'inline-block';
              second_even_inner_div.appendChild(key_span);
            });
    
            first_inner_div.appendChild(inner_p);
            first_outer_div.appendChild(first_inner_div);
            second_inner_div.appendChild(second_even_inner_div);
            second_outer_div.appendChild(second_inner_div);
            outer_div.appendChild(first_outer_div);
            outer_div.appendChild(second_outer_div)
            column_div.appendChild(outer_div);
            main_div.appendChild(column_div);
            all_shortcuts.push(shortcut);
          });
        });
      });
      return true;
    });
  });
});

document.addEventListener("keydown", function (event) {
  if(event.keyCode === 32 && event.ctrlKey && event.shiftKey) {
    window.location.href = "popup.html"
  }
});