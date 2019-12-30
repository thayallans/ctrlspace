'use strict';

document.addEventListener('DOMContentLoaded', () => {
  $.getJSON("content/figma.json", function(json) {
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
});

document.addEventListener("keydown", function (event) {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  var elements = document.getElementsByClassName('w-1/2 bg-gray-900 h-12');
  var current_elements = [];
  for (i = 0; i < elements.length; i++) {
    a = elements[i].getElementsByTagName("p")[0];
    if (elements[i].style.display != "none") {
      current_elements.push(elements[i]);
    }
  }
  if(event.keyCode === 40 && event.target.nodeName === 'INPUT') {
    event.preventDefault();
    let elements = current_elements[0].getElementsByClassName('flex')[0].getElementsByClassName('w-1/2');
    Array.prototype.forEach.call(elements, element => {
      element.classList.remove('bg-gray-900');
      element.classList.add('bg-gray-700');
    });
    current_elements[0].getElementsByClassName('flex')[0].focus();
    current_elements[0].getElementsByClassName('flex')[0].addEventListener("focusout", () => { 
      let elements = current_elements[0].getElementsByClassName('flex')[0].getElementsByClassName('w-1/2');
      console.log(elements);
      Array.prototype.forEach.call(elements, element => {
        element.classList.remove('bg-gray-700');
        element.classList.add('bg-gray-900');
      });
      return true
    });
  } else if (event.keyCode === 40 && event.target.nodeName === 'DIV') {
    event.preventDefault();
    let elements = current_elements[current_elements.indexOf(document.activeElement.parentElement) + 1].getElementsByClassName('flex')[0].getElementsByClassName('w-1/2');
    Array.prototype.forEach.call(elements, element => {
      element.classList.remove('bg-gray-900');
      element.classList.add('bg-gray-700');
    });
    let el = current_elements[current_elements.indexOf(document.activeElement.parentElement) + 1].getElementsByClassName('flex')[0];
    el.focus();
    el.addEventListener("focusout", () => { 
      let elements = el.getElementsByClassName('w-1/2');
      Array.prototype.forEach.call(elements, element => {
        element.classList.remove('bg-gray-700');
        element.classList.add('bg-gray-900');
      });
      return true
    });
  } else if (event.keyCode === 38 && event.target.nodeName === 'DIV') {
    event.preventDefault();
    let elements = current_elements[current_elements.indexOf(document.activeElement.parentElement) - 1].getElementsByClassName('flex')[0].getElementsByClassName('w-1/2');
    Array.prototype.forEach.call(elements, element => {
      element.classList.remove('bg-gray-900');
      element.classList.add('bg-gray-700');
    });
    let el = current_elements[current_elements.indexOf(document.activeElement.parentElement) - 1].getElementsByClassName('flex')[0];
    el.focus();
    el.addEventListener("focusout", () => { 
      let elements = el.getElementsByClassName('w-1/2');
      Array.prototype.forEach.call(elements, element => {
        element.classList.remove('bg-gray-700');
        element.classList.add('bg-gray-900');
      });
      return true
    });
  } else if (event.keyCode === 13) {
    mixpanel.track("Navigation trigerred");
    chrome.tabs.query({currentWindow: true, active: true},function(tabArray) {
      chrome.tabs.sendMessage(tabArray[0].id, document.activeElement.getElementsByTagName("p")[0].innerText);
    });
    window.close();
  } else {
    const input = document.getElementById("search").focus();
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