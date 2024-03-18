<template>
    <main class="main">
        <h1 class="collection-title">{{ collection }}</h1>
        <div class="page-header">
            <router-link class="back-button" :to="{
                name: 'collections'
            }">
                <span class="material-icons">arrow_back</span>
            </router-link>
            <input class="search-input" name="search-input" v-model="filter" placeholder="Search" />
            <select v-model="selectedFilter" class="filter-dropdown" name="filter-dropdown">
                <option value="creator">Creator</option>
                <option value="date">Date</option>
                <option value="description">Description</option>
                <option value="location">Location</option>
                <option value="title">Title</option>
            </select>
            <p style="margin-left: auto; font-size: 15px; color: rgb(247, 247, 247); font-weight:500; white-space: nowrap;">
                {{ filteredResults.length }} Records</p>
        </div>
        <div class="results-container">
            <router-link class="card-link" v-for="result in displayedResults" :key="result.uniqueId.value" :to="{
                name: 'collectionrecords',
                params: { collection: collection },
                query: { ...$route.query, record: result.uniqueId.value },
            }">
                <RecordCardComponent :record="result" />
            </router-link>
        </div>
        <div class="footer">
            <PaginationComponent :items="filteredResults" @updatePage="updateDisplayedResults" />
        </div>
        <transition name="backdrop-transition">
            <div class="modal-backdrop" v-if="query_record"> </div>
        </transition>
        <transition name="modal-transition">
            <RecordModalComponent :record="query_record" v-if="query_record" />
        </transition>
    </main>
</template>
  
<script setup>
import { ref, computed, inject } from 'vue';
import { useRoute } from 'vue-router';

import RecordCardComponent from '../components/RecordCardComponent.vue';
import PaginationComponent from '../components/PaginationComponent.vue';
import RecordModalComponent from '../components/RecordModalComponent.vue';

const route = useRoute();

const results = inject('records');
const displayedResults = ref([]);


const filter = ref('');
const selectedFilter = ref('title');

const collection = route.params.collection;

const query_record = computed(() => { 
  return findRecord(route.query.record) 
});

const dateProps = ["Date", "Date_of_origin"];

const locationProps = ["Country", "Building", "SpatialLabel", "City",
    "Former_or_original_locations",
    "State_or_region"];

const collectionResults = results.value.filter((result) => {
    if (result.Collection) {
        return result.Collection.value === collection;
    } return false
});

const filteredResults = computed(() => {
    const filterText = filter.value.toLowerCase();
    if (filterText === "") {
        return collectionResults;
    }
    return collectionResults.filter((result) => {
        if (selectedFilter.value === 'title' && result.Title) {
            return result.Title.value.toLowerCase().includes(filterText);
        } else if (selectedFilter.value === 'description' && result.Description) {
            return result.Description.value.toLowerCase().includes(filterText);
        } else if (selectedFilter.value == 'creator' && result.Creator) {
            return result.Creator.value.toLowerCase().includes(filterText);
        } else if (selectedFilter.value === 'date') {
            for (const prop of dateProps) {
                if (result[prop] && result[prop].value.toLowerCase().includes(filterText)) {
                    return true;
                }
            }
            return false;
        } else if (selectedFilter.value === 'location') {
            for (const prop of locationProps) {
                if (result[prop] && result[prop].value.toLowerCase().includes(filterText)) {
                    return true;
                }
            }
            return false;
        }
        return false;
    });
});

function findRecord(record_id){
  return collectionResults.find(result => result.uniqueId.value === record_id) 
}

function updateDisplayedResults(data) {
    displayedResults.value = data
}

</script>
  
<style scoped>
/*.main {
    z-index: unset;
}*/

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

.page-header {
    display: flex;
    align-items: center;
    height: 35px;
    margin-bottom: 2rem;
}

.back-button {
    height: 35px;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    background-color: #1d1d1d;
    width: 35px;
    min-width: 35px;
    border-radius: 8px;
    margin-right: 1rem;
    display: flex;
}

.back-button:hover {
    transition: 0.2s ease-in-out;
    background-color: #4d4d4d;
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
    width: 110px;
    height: 35px;
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

.collection-title {
    min-width: fit-content;
    height: fit-content;
    width: 100%;
    margin-bottom: 2rem;
    font-weight: 600;
    font-size: 20px;
    border-radius: 15px;
    padding: 10px;
    background-color: #181818;
    text-align: center;
}

.card-link {
    max-width: 200px;
    width: 100%;

    /*width: fit-content;*/
    text-decoration: none;
}

.results-container {
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
}

.footer {
    margin-top: auto;
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
</style>