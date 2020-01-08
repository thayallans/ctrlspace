
function smart_search(input, txt_value) {
  if(compareTwoStrings(input, txt_value) <= 0.5) {
    if(dictionary[input]) {
      for(section in dictionary[input]) {
        dictionary[input][section].forEach((option) => {
          if(option == txt_value) {
            console.log(option);
            return true;
          }
        });
      }
    }
    return false;
  } else {
    return true;
  }
}


try {
  module.exports = { smart_search }
} catch (err) {
  // eslint ignore
}
