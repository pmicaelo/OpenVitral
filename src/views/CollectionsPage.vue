<template>
	<main>
		<div class="results-container">
			<CollectionCardComponent v-for="group in groupedResults" :key="group.dataProvider" :collection="group.dataProvider"
				:image="group.image" />
		</div>
	</main>
</template>
  
<script setup>
import { computed, inject } from 'vue';
import CollectionCardComponent from '../components/CollectionCardComponent.vue';

const results = inject('records');

const groupedResults = computed(() => {
	const groups = {};
	results.value.forEach((result) => {
		const dataProvider = result.DataProvider.value;
		if (!groups[dataProvider]) {
			groups[dataProvider] = { dataProvider, image: result.Image.value };
		}
	});
	return Object.values(groups);
});

</script>
  
<style scoped>

.results-container {
	margin-top: 16px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	row-gap: 16px;
	column-gap: 16px;
	align-items: flex-end;
}
</style>