<template>
	<main class="main">
		<div class="page-header">
			<input class="search-input" name="search-input" v-model="filter" placeholder="Search" />
			<select class="filter-dropdown" name="filter-dropdown" v-model="selectedFilter">
				<option value="collection">Collection</option>
				<option value="creator">Creator</option>
				<option value="date">Date</option>
				<option value="location">Location</option>
				<option value="record">Record</option>
			</select>
			<p style="margin-left: auto; font-size: 15px; color: rgb(247, 247, 247); font-weight:500; white-space: nowrap;">
				{{ filteredResults.length }} Collections</p>
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
const selectedFilter = ref('collection');

const dateProps = ["Date", "Date_of_origin"];

const locationProps = ["Country", "Building", "SpatialLabel", "City",
	"Former_or_original_locations",
	"State_or_region"];

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
		if (selectedFilter.value === 'collection') {
			return group.collection.toLowerCase().includes(filterText);
		}
		if (selectedFilter.value === 'record') {
			return group.records.some(record => {
				return record.Title && record.Title.value.toLowerCase().includes(filterText);
			});
		}
		if (selectedFilter.value === 'creator') {
			return group.records.some(record => {
				return record.Creator && record.Creator.value.toLowerCase().includes(filterText);
			});
		}
		if (selectedFilter.value === 'date') {
			return group.records.some(record => {
				for (const prop of dateProps) {
					if (record[prop] && record[prop].value.toLowerCase().includes(filterText)) {
						return true;
					}
				}
				return false;
			});
		}
		if (selectedFilter.value === 'location') {
			return group.records.some(record => {
				for (const prop of locationProps) {
					if (record[prop] && record[prop].value.toLowerCase().includes(filterText)) {
						return true;
					}
				}
				return false;
			});
		}
		return false;
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
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	padding-left: 15px;
	height: 35px;
	width: 350px;
	min-width: 80px;
	background-color: transparent;
	border: 1px solid #616161;
	border: 1px solid #424242;
	outline: none;
}

.search-input::placeholder {
	color: #adadad;
}

.filter-dropdown {
	cursor: pointer;
	color: #adadad;
	color: rgb(247, 247, 247);
	height: 35px;
	width: 110px;
	font-size: 14px;
	border: 1px solid #616161;
	border: 1px solid #424242;
	border-radius: 20px;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-left: none;
	background-color: transparent;
	background-color: #1d1d1d;
	outline: none;
	padding: 8px;
	margin-right: 12px;
}

.filter-dropdown option {
	color: #adadad;
	color: rgb(247, 247, 247);
	padding: 8px;
	font-size: 14px;
	background-color: #0f0f0f;
	background-color: #1d1d1d;
}

.results-container {
	justify-items: center;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 32px;
	row-gap: 24px;
}
</style>