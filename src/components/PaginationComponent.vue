<template>
  <div class="pagination">
    <button class="pagination-button" :class="{ disabled: currentPage === 1 }" @click="prevPage">
      Previous
    </button>

    <input class="page-input" v-model="inputPage" :placeholder="currentPage" type="number" min="1" :max="totalPages"
      @keyup.enter="goToPage(parseInt(inputPage))" />

    <span class="page-indicator">&nbsp; of &nbsp;{{ totalPages }}</span>

    <button class="pagination-button" :class="{ disabled: currentPage === totalPages }" @click="nextPage">
      Next
    </button>
  </div>
</template>
  
<script setup>

import { ref, computed, onMounted, watch } from 'vue';

/*const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})*/

const props = defineProps(['items']);

const emitPagination = defineEmits(['updatePage']);

const inputPage = ref('');
const currentPage = ref(1);
const itemsPerPage = 24;
const totalPages = computed(() => {
  if (props.items.length == 0) return 1;
  else return Math.ceil(props.items.length / itemsPerPage)
});
goToPage(1)

onMounted(() => {

});

watch(() => props.items, (newItems) => {
  goToPage(1)
});

function prevPage() {
  if (currentPage.value > 1) {
    goToPage(--currentPage.value)
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    goToPage(++currentPage.value)
  }
}

function goToPage(pageNumber) {
  if ((pageNumber > 0) & (pageNumber <= totalPages.value)) {
    inputPage.value = '';
    currentPage.value = pageNumber;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = props.items.slice(startIndex, endIndex);
    emitPagination('updatePage', paginatedItems);
  }
}

</script>
  
<style scoped>
.pagination {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.pagination-button {
  border-radius: 10px;
  background-color: #1d1d1d;
  width: 60px;
  height: 30px;
  text-align: center;
  cursor: pointer;
}

.pagination-button:hover {
  transition: 0.2s ease-in-out;
  background-color: #4d4d4d;
}

.pagination-button.disabled {
  pointer-events: none;
  background-color: transparent;
  opacity: 0.3;
}

.page-input {
  border-radius: 10px;
  margin-left: 35px;
  width: 40px;
  height: 30px;
  text-align: center;
  background-color: transparent;
  border: 1px solid #1d1d1d;
}

.page-input::placeholder {
  color: #888888;
}

.page-indicator {
  margin-right: 35px;
  font-size: 14px;
}

.page-input::-webkit-outer-spin-button,
.page-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>