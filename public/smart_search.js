
function smart_search(input, txt_value) {
  if(compareTwoStrings(input, txt_value) < 0.5) {
    if(dictionary[input]) {
      for(section in dictionary[input]) {
        dictionary[input][section].forEach((option) => {
          console.log(compareTwoStrings(option, txt_value));
          if(compareTwoStrings(option, txt_value) > 0) {
            return true;
          }
        });
        return false;
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
