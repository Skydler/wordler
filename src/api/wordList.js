export async function retrieveWords() {
  let words_txt = await fetch(
    "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words"
  ).then((res) => res.text());
  return words_txt.split("\n");
}
