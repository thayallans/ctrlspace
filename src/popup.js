'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.href.includes('figma.com')) {
    var link = $('<link />', {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css',
    });
    $('head').append(link);
  }
});

document.addEventListener('keydown', function(event) {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search');
  if (input != undefined) {
    filter = input.value.toUpperCase();
    var elements = document.getElementsByClassName('w-1/2 h-12');
    var current_elements = [];
    for (i = 0; i < elements.length; i++) {
      if (elements[i].getElementsByTagName('p')[0]) {
        if (elements[i].parentElement.style.display != 'none') {
          current_elements.push(elements[i]);
        }
      }
    }
    var current_index = 0;
    for (let j = 0; j < current_elements.length; j++) {
      if (current_elements[j].parentElement == document.activeElement) {
        current_index = j;
      }
    }
  }
  let file = '';
  if (window.location.href.includes('airtable.com')) {
    file = 'mac_content/mac_airtable.json';
  } else if (window.location.href.includes('asana.com')) {
    file = 'mac_content/mac_asana.json';
  } else if (window.location.href.includes('discordapp.com')) {
    file = 'mac_content/mac_discord.json';
  } else if (window.location.href.includes('evernote.com')) {
    file = 'mac_content/mac_evernote.json';
  } else if (window.location.href.includes('figma.com')) {
    file = 'mac_content/mac_figma.json';
  } else if (window.location.href.includes('framer.com')) {
    file = 'mac_content/mac_framer-x.json';
  } else if (window.location.href.includes('github.com')) {
    file = 'mac_content/mac_github.json';
  } else if (window.location.href.includes('drive.google.com')) {
    file = 'mac_content/mac_google-drive.json';
  } else if (window.location.href.includes('jira.com')) {
    file = 'mac_content/mac_jira.json';
  } else if (window.location.href.includes('monday.com')) {
    file = 'mac_content/mac_monday.json';
  } else if (window.location.href.includes('notion.so')) {
    file = 'mac_content/mac_notion.json';
  } else if (window.location.href.includes('proto.io')) {
    file = 'mac_content/mac_proto-io.json';
  } else if (window.location.href.includes('quip.com')) {
    file = 'mac_content/mac_quip.json';
  } else if (window.location.href.includes('slack.com')) {
    file = 'mac_content/mac_slack.json';
  } else if (window.location.href.includes('trello.com')) {
    file = 'mac_content/mac_trello.json';
  } else if (window.location.href.includes('youtube.com')) {
    file = 'mac_content/mac_youtube.json';
  }
  if (event.keyCode === 88 && document.getElementById('main_element')) {
    const selected_elements = document.getElementsByClassName('bg-gray-700');
    selected_elements[0].classList.add('bg-gray-500');
    selected_elements[1].classList.add('bg-gray-500'); 
    selected_elements[0].classList.remove('bg-gray-700');
    selected_elements[0].classList.remove('bg-gray-700');
  } else if (event.keyCode === 32 && event.ctrlKey && event.shiftKey && !document.getElementById('shortcut_map_element')) {
    if (file != '') {
      if(document.getElementById('main_element')){
        document.body.removeChild(document.getElementById('main_element'));
      }
      var shortcut_map_element = document.createElement('div');
      shortcut_map_element.id = 'shortcut_map_element';
      var background_element = document.createElement('div');
      background_element.style.zIndex = '1000';
      background_element.style.backgroundColor = '#000000';
      background_element.style.position = 'fixed';
      background_element.style.top = '0px';
      background_element.style.left = '0px';
      background_element.style.width = '100%';
      background_element.style.height = '100%';
      background_element.style.opacity = '75%';
      background_element.style.transition = '2.5s';

      var popup_element = document.createElement('div');
      popup_element.innerHTML = '<div style="height: 100%; overflow: hidden;"><div id="mainDiv" style="width: 100%; height: 100%; overflow-y: scroll;"><div class="flex"></div></div></div>';
      popup_element.style.width = '80%';
      popup_element.style.height = '75%';
      popup_element.style.zIndex = '1000';
      popup_element.style.position = 'absolute';
      popup_element.style.top = '0px';
      popup_element.style.bottom = '0px';
      popup_element.style.left = '0px';
      popup_element.style.right = '0px';
      popup_element.style.margin = 'auto';
      popup_element.style.opacity = '99%';
      popup_element.classList.add('bg-gray-900');
      shortcut_map_element.appendChild(background_element);
      shortcut_map_element.appendChild(popup_element);
      document.body.appendChild(shortcut_map_element);
      file = chrome.runtime.getURL(file);
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
            const val = Math.ceil(parseInt(json.meta_description.match(/\d+/)[0])/3);
            console.log(val);
            if (counter == val) {
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
            first_inner_div.style.width = '250px';
            var inner_p = document.createElement('p');
            inner_p.classList.add('text-lg');
            inner_p.classList.add('font-semibold');
            inner_p.classList.add('text-gray-100');
            inner_p.style.textAlign = 'center';

            //note: json files were modded to have spaces at the end of descriptions depending how long it was
            var desc = shortcut.description;
            if (desc[desc.length-1] === " ") { //if the last char of the description is a blank space, make font smaller
              inner_p.style.fontSize = "12px";
              desc = desc.slice(0,desc.length - 1);
              if (desc[desc.length-1] === " ") {//if there was another space at the end, make it even smaller
                inner_p.style.fontSize = "10px";
                desc = desc.slice(0,desc.length - 1); //delete empty space
              }
            }

            inner_p.innerText = desc;

            var second_outer_div = document.createElement('div');
            second_outer_div.classList.add('w-1/2');
            second_outer_div.classList.add('bg-gray-900');
            second_outer_div.classList.add('h-12');
            var second_inner_div = document.createElement('div');
            second_inner_div.classList.add('px-2');
            second_inner_div.classList.add('py-3');
            second_inner_div.style.width = '250px';
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
    }
  } else if (event.keyCode === 32 && event.ctrlKey && event.shiftKey && document.getElementById('shortcut_map_element')) {
    document.body.removeChild(document.getElementById('shortcut_map_element'));
  } else if (
    event.keyCode === 32 &&
    event.ctrlKey &&
    !document.getElementById('main_element')
  ) {
    if (file != '') {
      if(document.getElementById('shortcut_map_element')) {
        document.body.removeChild(document.getElementById('shortcut_map_element'));
      }
      var main_element = document.createElement('div');
      main_element.id = 'main_element';
      var background_element = document.createElement('div');
      background_element.style.zIndex = '1000';
      background_element.style.backgroundColor = '#000000';
      background_element.style.position = 'fixed';
      background_element.style.top = '0px';
      background_element.style.left = '0px';
      background_element.style.width = '100%';
      background_element.style.height = '100%';
      background_element.style.opacity = '75%';
      background_element.style.transition = '2.5s';

      var popup_element = document.createElement('div');
      popup_element.innerHTML =
        '<div style="overflow: hidden;" class="shadow-2xl bg-gray-900"><div id="mainDiv" style="width: 700px; height: 500px; overflow-y: scroll;"><div class="flex"><form class="w-full bg-gray-800" autocomplete="off"><div class="flex items-center border-b-2 border-teal-500 py-3"><input style="text-align: center;" class="appearance-none bg-transparent border-none w-full text-base text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none" id="search" type="text" placeholder="Search for a shortcut" aria-label="search" autofocus></div></form></div></div></div>';
      popup_element.style.width = '700px';
      popup_element.style.height = '500px';
      popup_element.style.zIndex = '1000';
      popup_element.style.position = 'absolute';
      popup_element.style.top = '0px';
      popup_element.style.bottom = '0px';
      popup_element.style.left = '0px';
      popup_element.style.right = '0px';
      popup_element.style.margin = 'auto';
      popup_element.style.opacity = '99%';
      main_element.appendChild(background_element);
      main_element.appendChild(popup_element);
      document.body.appendChild(main_element);

      file = chrome.runtime.getURL(file);
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
            first_inner_div.classList.add('py-3');
            var inner_p = document.createElement('p');
            inner_p.classList.add('text-lg');
            inner_p.classList.add('font-semibold');
            inner_p.classList.add('text-gray-100');
            inner_p.style.textAlign = 'center';
            
            //note: json files were modded to have spaces at the end of descriptions depending how long it was
            var desc = shortcut.description;
            if (desc[desc.length-1] === " ") { //if the last char of the description is a blank space, make font smaller
              inner_p.style.fontSize = "12px";
              desc = desc.slice(0,desc.length - 1);
              if (desc[desc.length-1] === " ") {//if there was another space at the end, make it even smaller
                inner_p.style.fontSize = "10px";
                desc = desc.slice(0,desc.length - 1); //delete empty space
              }
            }

            inner_p.innerText = desc;
            
            var second_outer_div = document.createElement('div');
            second_outer_div.classList.add('w-1/2');
            second_outer_div.classList.add('bg-gray-900');
            second_outer_div.classList.add('h-12');
            var second_inner_div = document.createElement('div');
            second_inner_div.classList.add('px-6');
            second_inner_div.classList.add('py-3');
            var second_even_inner_div = document.createElement('div');
            second_even_inner_div.style.textAlign = 'left';
            shortcut.keys.forEach((key) => {
              var key_span = document.createElement('span');
              key_span.classList.add('inline-block');
              key_span.classList.add('bg-gray-200');
              key_span.classList.add('rounded-full');
              key_span.classList.add('px-3');
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
            outer_div.appendChild(second_outer_div);
            main_div.appendChild(outer_div);
            outer_div.style.outline = 'none';
            all_shortcuts.push(shortcut);
          });
        });
      });
      const input = document.getElementById('search');
      input.addEventListener('keyup', function(event) {
        filter_words();
        return true;
      });
      input.focus();
    }
  } else if (
    event.keyCode === 32 &&
    event.ctrlKey &&
    document.getElementById('main_element')
  ) {
    document.body.removeChild(document.getElementById('main_element'));
  } else if (event.keyCode === 40 && event.target.nodeName === 'INPUT') {
    event.preventDefault();
    event.stopImmediatePropagation();
    let el = current_elements[0];
    el.parentElement.focus();
    let elements = document.activeElement.getElementsByClassName('bg-gray-900');
    let length = elements.length;
    for (let r = 0; r < length; r++) {
      elements[0].classList.add('bg-gray-700');
      elements[0].classList.remove('bg-gray-900');
    }
  } else if (event.keyCode === 40 && event.target.nodeName === 'DIV') {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (current_index + 1 < current_elements.length) {
      let el = current_elements[current_index + 1];
      el.parentElement.focus();
      const elements = document.activeElement.getElementsByClassName(
        'bg-gray-900',
      );
      const prev_elements = document.activeElement.parentElement.getElementsByClassName(
        'bg-gray-700',
      );
      if(prev_elements[0] != undefined) {
        prev_elements[0].classList.add('bg-gray-900');
        prev_elements[1].classList.add('bg-gray-900');
        prev_elements[0].classList.remove('bg-gray-700');
        prev_elements[0].classList.remove('bg-gray-700');
      }
      elements[0].classList.add('bg-gray-700');
      elements[1].classList.add('bg-gray-700');
      elements[0].classList.remove('bg-gray-900');
      elements[0].classList.remove('bg-gray-900');
    }
  } else if (event.keyCode === 38 && event.target.nodeName === 'DIV') {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (current_index - 1 >= 0) {
      current_elements[current_index - 1].parentElement.focus();
      const elements = document.activeElement.getElementsByClassName(
        'bg-gray-900',
      );
      const prev_elements = document.activeElement.parentElement.getElementsByClassName(
        'bg-gray-700',
      );
      if(prev_elements[0] != undefined) {
        prev_elements[0].classList.add('bg-gray-900');
        prev_elements[1].classList.add('bg-gray-900');
        prev_elements[0].classList.remove('bg-gray-700');
        prev_elements[0].classList.remove('bg-gray-700');
      }
      elements[0].classList.add('bg-gray-700');
      elements[1].classList.add('bg-gray-700');
      elements[0].classList.remove('bg-gray-900');
      elements[0].classList.remove('bg-gray-900');
    }
  } else if (event.keyCode === 13) {
    event.preventDefault();
    let keys = [];
    if(document.getElementsByClassName('bg-gray-500').length > 0) {
      const els = document.getElementsByClassName('bg-gray-500');
      for(let x = 0; x < els.length/2; x++) {
        const val = els[x*2+1].getElementsByTagName('span');
        for (let s = 0; s < val.length; s++) {
          keys.push(val[s].innerText.toLowerCase());
          if(keys[s].charCodeAt(0) >= 32 && keys[s].charCodeAt(0) <= 127 && keys[s].length == 1) {
            keyboard_trigger(keys);
          }
        }
        keys = [];
      }
      document.body.removeChild(document.getElementById('main_element'));
    } else {
      const elements = document.activeElement.getElementsByTagName('span');
      for (i = 0; i < elements.length; i++) {
        keys.push(elements[i].innerText.toLowerCase());
        if(keys[i].charCodeAt(0) >= 32 && keys[i].charCodeAt(0) <= 127 && keys[i].length == 1) {
          keyboard_trigger(keys);
        }
      }
      document.body.removeChild(document.getElementById('main_element'));
    }
  } else if ((document.getElementById('main_element') || document.getElementById('shortcut_map_element')) && document.getElementById('search') != document.activeElement) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const elements = document.getElementsByClassName('bg-gray-700');
    if(elements[0] != undefined) {
      elements[0].classList.add('bg-gray-900');
      elements[1].classList.add('bg-gray-900');
      elements[0].classList.remove('bg-gray-700');
      elements[0].classList.remove('bg-gray-700');
    }
    const input = document.getElementById('search');
    input.value = event.key;
    input.focus();
  }
});

function filter_words() {
  var input, filter, a, i, txtValue;
  input = document.getElementById('search');
  if (input != undefined) {
    filter = input.value ? input.value.toUpperCase() : '';
    var elements = document.getElementsByClassName('w-1/2 bg-gray-900 h-12');
    var current_elements = [];
    for (i = 0; i < elements.length; i++) {
      if (elements[i].getElementsByTagName('p')[0]) {
        elements[i].parentElement.tabIndex = i / 2;
        a = elements[i].getElementsByTagName('p')[0];
        txtValue = a.innerText;
        const words = txtValue.split(' ');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          elements[i].parentElement.style.display = '';
          if (!current_elements.includes(txtValue)) {
            current_elements.push(txtValue);
          }
        } else {
          let total = 0;
          words.forEach((word) => {
            if (smart_search(filter.toLowerCase(), word.toLowerCase())) {
              elements[i].parentElement.style.display = '';
              if (!current_elements.includes(txtValue)) {
                current_elements.push(txtValue);
                total++;
              }
            }
          });
          if (total == 0 && filter != '') {
            elements[i].parentElement.style.display = 'none';
            current_elements.splice(i, 1);
          }
          total = 0;
        }
      }
    }
  }
}

function keyboard_trigger(keys) {
  const mac_keypress = keys.join('+');
  let main_key = mac_keypress.split('+').pop();
  let main_key_code = 'Key' + main_key.toUpperCase();
  let diff = 32;
  let char_code = main_key.charCodeAt(0);
  let key_code = main_key.charCodeAt(0) - diff;
  if (key_codes[main_key]) {
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
  console.log(keyevent);
  document.body.dispatchEvent(keyevent);
}
