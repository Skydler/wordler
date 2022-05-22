export function isMatchingWord(word, match) {
  for (let index = 0; index < 5; index++) {
    const match_letter = match[index];
    const word_letter = word[index];

    if (match_letter === "_") {
      continue;
    }

    if (match_letter !== word_letter) {
      return false;
    }
  }

  return true;
}

export function hasLetters(word, contains, reverse = false) {
  if (reverse) {
    for (let i = 0; i < contains.length; i++) {
      const letter = contains[i];
      if (word.includes(letter)) {
        return false;
      }
    }
    return true;
  } else {
    console.log(contains);
    for (let i = 0; i < contains.length; i++) {
      const letter = contains[i];
      if (!word.includes(letter)) {
        return false;
      }
    }
    return true;
  }
}
