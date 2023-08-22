<template>
  <div class="page-and-modal">
    <main>
      <input v-model="filter" placeholder="Title" />
      <div class="results-container">
        <router-link class="card-link" v-for="result in displayedResults" :key="result.item.value" :to="{
          name: 'allrecords',
          query: { record: result.uniqueId.value },
        }">
          <RecordCard :record="result" />
        </router-link>
      </div>
      <Pagination :items="filteredResults" @updatePage="updateDisplayedResults" />
    </main>
    <Transition name="backdrop-transition">
      <div class="modal-backdrop" v-if="record"> </div>
    </Transition>
    <Transition name="modal-transition">
      <RecordModal :record="record" v-if="record" />
    </Transition>
  </div>
</template>

<script setup>

import { ref, computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import RecordModal from '../components/RecordModal.vue';
import RecordCard from '../components/RecordCard.vue';
import Pagination from '../components/Pagination.vue';

const results = inject('records');
const displayedResults = ref([]);
const filter = ref('');

const route = useRoute();
const record = computed(() => { return results.value.find(result => result.uniqueId.value === route.query.record) });

/*onMounted(() => {
  //maybe not needed, pushes the 
  if(route.query.record && !record.value){
    router.push(route.path)
  }
});

watch(() => route.fullPath, () => {
  if(route.query.record && !record.value){
    router.go(-1)
  }
});*/

const filteredResults = computed(() => {
  const filterText = filter.value.toLowerCase();
  if (filterText == "") return results.value;
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
.page-and-modal {
  display: flex;
  overflow: clip;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
}

.modal-transition-enter-active,
.modal-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-transition-enter-from,
.modal-transition-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.backdrop-transition-enter-active,
.backdrop-transition-leave-active {
  transition: opacity 0.3s ease
}

.backdrop-transition-enter-from,
.backdrop-transition-leave-to {
  opacity: 0;
}

.card-link {
  width: fit-content;
  text-decoration: none;
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
  /*align-items: flex-end;*/
}
</style>