<script setup>
import { ref } from "vue";
import { isMatchingWord, hasLetters } from "./lib/matcher.js";
import { retrieveWords } from "./api/wordList.js";

retrieveWords().then((data) => {
  total_words = m_words.value = data;
});

let total_words = [];
const m_words = ref([]);
const matching_letters = ref(["", "", "", "", ""]);
const contains = ref("");
const excludes = ref("");

function filterMatching(words) {
  const normalized_letters = matching_letters.value.map((letter) =>
    letter ? letter : "_"
  );

  const matching_words = words.filter((word) =>
    isMatchingWord(word, normalized_letters)
  );

  return matching_words;
}

function filterContains(words) {
  const matching_words = words.filter((word) =>
    hasLetters(word, contains.value)
  );

  return matching_words;
}

function filterExcludes(words) {
  const matching_words = words.filter((word) =>
    hasLetters(word, excludes.value, true)
  );

  return matching_words;
}

function handleReset() {
  m_words.value = total_words;
  matching_letters.value = ["", "", "", "", ""];
}

function handleSubmit() {
  let words = m_words.value;
  words = filterExcludes(words);
  words = filterContains(words);
  words = filterMatching(words);

  m_words.value = words;
}
</script>

<template>
  <h1>Wordle helper!</h1>

  <div>
    <h3>Matching letters:</h3>
    <input
      v-for="n in 5"
      :key="n"
      v-model.trim="matching_letters[n - 1]"
      maxlength="1"
      size="1"
      placeholder="_"
    />
  </div>
  <div>
    <h3>Contains letters:</h3>
    <input v-model.trim="contains" />
  </div>
  <div>
    <h3>Exclude letters:</h3>
    <input v-model.trim="excludes" />
  </div>

  <div>
    <button @click="handleReset">Reset</button>
    <button @click="handleSubmit">Save</button>
  </div>

  <div>
    <h3>Possible words: {{ m_words.length }}</h3>
    <ul>
      <li v-for="(word, index) in m_words" :key="index">{{ word }}</li>
    </ul>
  </div>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

h1 {
  text-align: center;
}

h3 {
  margin-top: 50px;
}
</style>
