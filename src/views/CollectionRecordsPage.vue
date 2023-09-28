<template>
	<main class="main">
        <h1 class="collection-title">{{ collection }}</h1>
        <div class="page-header">
            <router-link class="back-button" :to="{
                name: 'collections'
            }">
                <span class="material-icons">arrow_back</span>
            </router-link>
            <input class="search-input" v-model="filter" placeholder="Search" />
            <select v-model="selectedFilter" class="filter-dropdown">
                <option value="title">Title</option>
                <option value="description">Description</option>
                <option value="creator">Creator</option>
            </select>
            <p style="margin-left: auto; color: #adadad; font-weight:500; white-space: nowrap;">  {{filteredResults.length}} Records</p>
        </div>
        <div class="results-container">
            <router-link class="card-link" v-for="result in displayedResults" :key="result.uniqueId.value" :to="{
                name: 'collectionrecords',
                params: { collection: collection },
                query: { record: result.uniqueId.value },
            }">
                <RecordCardComponent :record="result" />
            </router-link>
        </div>
        <div class="footer">
            <PaginationComponent :items="filteredResults" @updatePage="updateDisplayedResults" />
        </div>

        <transition name="backdrop-transition">
            <div class="modal-backdrop" v-if="record"> </div>
        </transition>
        <transition name="modal-transition">
            <RecordModalComponent :record="record" v-if="record" />
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

const collectionResults = results.value.filter((result) => {
    if (result.Collection) {
        return result.Collection.value === collection;
    } return false
});

const record = computed(() => { return collectionResults.find(result => result.uniqueId.value === route.query.record) });

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
        }
        return false;
    });
});

function updateDisplayedResults(data) {
    displayedResults.value = data
}

</script>
  
<style scoped>
.main {
    z-index: unset;
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
    outline: none;
}

.search-input::placeholder {
    color: #adadad;
}

.filter-dropdown {
    cursor: pointer;
    color: #adadad;
    width: 110px;
    height: 35px;
    font-size: 14px;
    border: 1px solid #616161;
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
    /*text-decoration: none;
    max-width: 310px;
    width: 100%;
    height: 100%;*/

    width: fit-content;
    text-decoration: none;
}

.results-container {
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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