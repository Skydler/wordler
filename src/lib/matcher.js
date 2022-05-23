export function filterMatching(words, letters) {
  const matching_words = words.filter((word) =>
    isMatchingWord(word, normalize_letters(letters))
  );
  return matching_words;
}

export function filterContains(words, letters) {
  const matching_words = words.filter((word) =>
    hasLetters(word, normalize_letters(letters))
  );
  return matching_words;
}

export function filterExcludes(words, letters) {
  const matching_words = words.filter((word) =>
    excludeWithLetters(word, normalize_letters(letters))
  );
  return matching_words;
}

function normalize_letters(letters) {
  return Array.from(letters).map((letter) => letter.toLowerCase());
}

function isMatchingWord(word, match) {
  for (let index = 0; index < 5; index++) {
    const match_letter = match[index];
    const word_letter = word[index];

    if (match_letter === "") {
      continue;
    }

    if (match_letter !== word_letter) {
      return false;
    }
  }

  return true;
}

function hasLetters(word, contains) {
  for (let i = 0; i < contains.length; i++) {
    const letter = contains[i];
    if (!word.includes(letter) || word[i] === letter) {
      return false;
    }
  }
  return true;
}

function excludeWithLetters(word, exclude) {
  for (let i = 0; i < exclude.length; i++) {
    const letter = exclude[i];
    if (word.includes(letter)) {
      return false;
    }
  }
  return true;
}
