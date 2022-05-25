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

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

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
  <h1 class="display-1">Wordle helper!</h1>

  <form>
    <div class="upper-form">
      <div>
        <h3 class="title">Green letters:</h3>
        <div class="input-wrapper">
          <va-input
            v-for="n in 5"
            :key="n"
            v-model.trim="word_filters.green_letters[n - 1]"
            maxlength="1"
            placeholder="_"
            outline
            color="success"
          />
        </div>
      </div>

      <div>
        <h3 class="title">Yellow letters:</h3>
        <div class="input-wrapper">
          <va-input
            v-for="n in 5"
            :key="n"
            v-model.trim="word_filters.yellow_letters[n - 1]"
            maxlength="1"
            placeholder="_"
            outline
            color="warning"
          />
        </div>
      </div>
    </div>
    <div>
      <h3 class="title">Grey letters:</h3>
      <va-input v-model.trim="word_filters.grey_letters" outline color="gray" />
    </div>

    <div class="btn-wrapper">
      <va-button
        icon="restart_alt"
        color="info"
        gradient
        :rounded="false"
        @click="handleReset"
        >Reset</va-button
      >
      <va-button
        icon="check_circle"
        color="success"
        gradient
        :rounded="false"
        @click="handleSubmit"
        >Save</va-button
      >
    </div>
  </form>

  <div v-if="m_words.length" class="words-container">
    <h3 class="display-6">Possible words: {{ m_words.length }}</h3>
    <RecycleScroller
      class="scroller"
      :items="sliceIntoChunks(m_words, 3)"
      :item-size="45"
      :keyField="null"
      page-mode
      v-slot="{ item }"
    >
      <va-button
        class="word-option"
        :rounded="false"
        v-for="(word, index) in item"
        :key="index"
      >
        {{ word }}
      </va-button>
    </RecycleScroller>
  </div>
  <div v-else class="loading-div">
    <va-progress-circle indeterminate />
  </div>
</template>

<style>
@import "./assets/base.css";
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

h1.display-1 {
  text-align: center;
  margin-bottom: 50px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form > div {
  margin: 10px 0;
}

.input-wrapper {
  display: flex;
  max-width: 250px;
}

.upper-form {
  display: flex;
}

.upper-form > div {
  margin: 0 20px;
}

.btn-wrapper > button {
  margin: 0 5px;
}

.loading-div {
  margin: 50px 0;
  display: flex;
  justify-content: center;
}

.word-option {
  margin: 5px !important;
  width: 100px;
}

.words-container {
  text-align: center;
  margin: 50px 0px;
}
</style>
