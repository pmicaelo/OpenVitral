<template>
  <div v-if="items.length > 0" class="pagination">
    <button :disabled="currentPage === 1" @click="prevPage">Previous</button>
    <span>{{ currentPage }}</span>
    <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
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

const props  = defineProps(['items']);

const emitPagination = defineEmits();

const currentPage = ref(1);
const itemsPerPage = 25;
const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage));
goToPage(1)

onMounted(() => {
  console.log(props.items)
  console.log("mounted child")
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
  currentPage.value = pageNumber;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = props.items.slice(startIndex, endIndex);
  emitPagination('updatePage', paginatedItems);
}

</script>
  
<style scoped>
.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  color: aliceblue;
}

button{
  color: aliceblue;
}
</style>