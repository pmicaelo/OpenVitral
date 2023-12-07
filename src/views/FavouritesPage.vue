<template>
    <main class="main">
        <div v-if="favourites.length > 0" style="display: flex; flex-direction: column; flex: 1 1 0;">
            <div class="results-container">
                <router-link class="card-link" v-for="result in displayedResults" :key="result.uniqueId.value" :to="{
                    name: 'favourites',
                    query: { record: result.uniqueId.value },
                }">
                    <RecordCardComponent :record="result" />
                </router-link>
            </div>
            <div class="footer">
                <PaginationComponent :items="filteredResults" @updatePage="updateDisplayedResults" />
            </div>
        </div>
        <div v-else class="message">
            <h1 class="message-subtitle">The favourites page is currently empty :[</h1>
            <p class="message-description">
                It seems you have not added any records to your favourites page ...
            </p>
            <p class="message-description">
                Try adding some, so they can be highlighted here!
            </p>
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

const record = computed(() => { return results.value.find(result => result.uniqueId.value === route.query.record) });

const favourites = ref(JSON.parse(localStorage.getItem('favourites')) || [])

window.addEventListener('updatedFav', (event) => {
    favourites.value = event.detail.newFavourites;
});

const filteredResults = computed(() => {
    return results.value.filter((result) => {
        return favourites.value.includes(result.uniqueId.value)
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

.message {
    padding-bottom: calc(1rem + var(--navbar-height));
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    text-align: center;
    justify-content: center;
}

.message-title {
    font-weight: 500;
    font-size: 100px;
}

.message-subtitle {
    font-weight: 500;
    font-size: 35px;
    margin-bottom: 20px;
}

.message-description {
    font-size: 18px;
    font-weight: 500;
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