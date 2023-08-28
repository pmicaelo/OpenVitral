<template>
	<main>
		<input class="search-input" v-model="filter" placeholder="Search" />
		<div class="results-container">
			<CollectionCardComponent v-for="group in filteredResults" :key="group.collection" :collection="group.collection"
				:records="group.records" />
		</div>
	</main>
</template>
  
<script setup>
import { computed, inject, ref } from 'vue';
import CollectionCardComponent from '../components/CollectionCardComponent.vue';

const results = inject('records');
const filter = ref('');

const groupedResults = computed(() => {
	const groups = {};
	results.value.forEach((result) => {
		const collection = result.DataProvider.value;
		if (!groups[collection]) {
			groups[collection] = {
				collection,
				records: []
			};
		}
		groups[collection].records.push(result);
	});
	return Object.values(groups);
});

const filteredResults = computed(() => {
  const filterText = filter.value.toLowerCase().trim();
  if (filterText == "") return groupedResults.value;
  return groupedResults.value.filter(group => {
    return group.collection.toLowerCase().includes(filterText);
  });
});

</script>
  
<style scoped>
.results-container {
	justify-items: center;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 32px;
	row-gap: 24px;
}


.search-input {
  margin-bottom: 2rem;
  font-size: 14.5px;
  border-radius: 20px;
  padding-left: 15px;
  height: 35px;
  width: 350px;
  background-color: transparent;
  border: 1px solid #616161;
}

.search-input::placeholder {
  color: #adadad;
}
</style>