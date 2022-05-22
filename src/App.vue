<script setup>
import { ref } from "vue";
import {
  filterMatching,
  filterContains,
  filterExcludes,
} from "./lib/matcher.js";
import { retrieveWords } from "./api/wordList.js";

retrieveWords().then((data) => {
  total_words = m_words.value = data;
});

let total_words = [];
const m_words = ref([]);
const word_filters = ref({
  green_letters: ["", "", "", "", ""],
  yellow_letters: ["", "", "", "", ""],
  grey_letters: "",
});

function handleReset() {
  m_words.value = total_words;
}

function handleSubmit() {
  let words = m_words.value;
  const filters = word_filters.value;
  words = filterExcludes(words, filters.grey_letters);
  words = filterContains(words, filters.yellow_letters);
  words = filterMatching(words, filters.green_letters);

  m_words.value = words;
}
</script>

<template>
  <h1>Wordle helper!</h1>

  <div>
    <h3>Green letters:</h3>
    <input
      v-for="n in 5"
      :key="n"
      v-model.trim="word_filters.green_letters[n - 1]"
      maxlength="1"
      size="1"
      placeholder="_"
    />
  </div>
  <div>
    <h3>Yellow letters:</h3>
    <input
      v-for="n in 5"
      :key="n"
      v-model.trim="word_filters.yellow_letters[n - 1]"
      maxlength="1"
      size="1"
      placeholder="_"
    />
  </div>
  <div>
    <h3>Grey letters:</h3>
    <input v-model.trim="word_filters.grey_letters" />
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
