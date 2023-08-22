<template>
  <main>
    <input v-model="filter" placeholder="Title" />
    <div class="results-container">
      <RecordCard v-for="result in displayedResults" :key="result.item.value" :record="result" />
    </div>
    <Pagination :items="filteredResults" @updatePage="updateDisplayedResults" />
  </main>
</template>

<script setup>
//backup with no redirecting of url when popup
import { ref, computed, inject } from 'vue';
import RecordCard from '../components/RecordCard.vue';
import Pagination from '../components/Pagination.vue';

const results = inject('records');
const displayedResults = ref([]);
const filter = ref('');

const filteredResults = computed(() => {
  const filterText = filter.value.toLowerCase();
  return results.value.filter((result) => {
    if (result.Title) {
      return result.Title.value.toLowerCase().includes(filterText);
    }
    return false;
  });
});

function updateDisplayedResults(data) {
  console.log("ran");
  displayedResults.value = data
}

</script>

<style scoped>
main {
  min-height: calc(100vh - var(--navbar-height));
  overflow: auto;
}

.results-container {
  /*
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-evenly;*/
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  align-items: flex-end;
}
</style>