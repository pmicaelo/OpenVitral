<template>
	<main>
		<div class="page-header">
			<input class="search-input" v-model="filter" placeholder="Search" />
		</div>
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
		if (result.Collection) {
			const collection = result.Collection.value;
			if (!groups[collection]) {
				groups[collection] = {
					collection,
					records: []
				};
			}
			groups[collection].records.push(result);
		}
	});
	return Object.values(groups);
});

const filteredResults = computed(() => {
	const filterText = filter.value.toLowerCase();
	if (filterText == "") return groupedResults.value;
	return groupedResults.value.filter(group => {
		return group.collection.toLowerCase().includes(filterText);
	});
});

</script>
  
<style scoped>

.page-header {
    display: flex;
    align-items: center;
    height: 35px;
    margin-bottom: 2rem;
}

.search-input {
	font-size: 14.5px;
	border-radius: 20px;
	padding-left: 15px;
	height: 35px;
	width: 350px;
	min-width: 80px;
	background-color: transparent;
	border: 1px solid #616161;
}

.search-input::placeholder {
	color: #adadad;
}

.results-container {
	justify-items: center;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 32px;
	row-gap: 24px;
}
</style>