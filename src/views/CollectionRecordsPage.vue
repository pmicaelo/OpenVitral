<template>
    <div class="page-and-modal">
        <main>
            <h1 class="collection-title">{{ collection }}</h1>
            <div class="page-header">
                <router-link class="back-button" :to="{
                    name: 'collections'
                }">
                    <span class="material-icons">arrow_back</span>
                </router-link>
                <input class="search-input" v-model="filter" placeholder="Search" />
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
        </main>
        <transition name="backdrop-transition">
            <div class="modal-backdrop" v-if="record"> </div>
        </transition>
        <transition name="modal-transition">
            <RecordModalComponent :record="record" v-if="record" />
        </transition>
    </div>
</template>
  
<script setup>
import { ref, computed, inject } from 'vue';
import { useRoute } from 'vue-router';

import RecordCardComponent from '../components/RecordCardComponent.vue';
import PaginationComponent from '../components/PaginationComponent.vue';
import RecordModalComponent from '../components/RecordModalComponent.vue';


const results = inject('records');
const displayedResults = ref([]);


const route = useRoute();

const filter = ref('');
const collection = route.params.collection;
const record = computed(() => { return results.value.find(result => result.uniqueId.value === route.query.record) });
//const path = '/collections/' + encodeURIComponent(collection) + '/';


const filteredResults = computed(() => {
    const filterText = filter.value.toLowerCase();
    if (filterText == "") return results.value.filter((result) => {
        if (result.Collection) {
            return result.Collection.value.includes(collection);
        } return false
    });
    return results.value.filter((result) => {
        if (result.Title && result.Collection && result.Collection.value.includes(collection)) {
            return result.Title.value.toLowerCase().includes(filterText);
        }
        return false;
    });
});


function updateDisplayedResults(data) {
    displayedResults.value = data
}

/*async function queryEuropeanaEndpoint() {
    try {
        results.value = [];

        const sparqlQuery = `
        PREFIX dc: <http://purl.org/dc/elements/1.1/> 
        PREFIX edm: <http://www.europeana.eu/schemas/edm/> 
        PREFIX ore: <http://www.openarchives.org/ore/terms/> 
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
        PREFIX dcterms: <http://purl.org/dc/terms/> 
        PREFIX wgs84_pos: <http://www.w3.org/2003/01/geo/wgs84_pos#> 
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#> 
    
        SELECT DISTINCT (SAMPLE(?item) AS ?item) (SAMPLE(?DataProvider) AS ?DataProvider) (SAMPLE(?Title) AS ?Title) (SAMPLE(?Description) AS ?Description) (SAMPLE(?Image) AS ?Image) (SAMPLE(?Date) AS ?Date) (SAMPLE(?Provider) AS ?Provider)
        WHERE { 
        ?item dc:subject ?subject . 
        OPTIONAL { ?item dc:title ?Title . }
        OPTIONAL { ?item dc:description ?Description . }
        ?item ore:proxyIn ?Aggregation . 
        ?Aggregation edm:aggregatedCHO ?ProvidedCHO . 
        ?Aggregation edm:dataProvider ?DataProvider . 
        OPTIONAL { ?item dc:date ?Date . } 
        ?Aggregation edm:object ?Image .
        OPTIONAL { ?Aggregation edm:provider ?Provider . } 
        FILTER(?subject IN ("stained glass",
            "Stained glass", "Glasmalerei", "Glassmaleri", "Витраж", "Вітраж", "Lasimaalaus",
            "Vitral", "Стъклопис", "Vitražas", "Vitrāža", "Vitraj", "Vitrail", "Üvegfestés",
            "Vitraž", "Vitráž (chrám)", "Gloine dhaite", "Vitrall", "Glasmålning",
            "스테인드 글라스", "Vidreira gótica", "Υαλογραφία", "Vetrata", "花窗玻璃",
            "Beirate", "زجاج معشق", "Gwydr lliw", "ステンドグラス", "Witraż", "Vitraliu",
            "Gebrandschilderd glas"
        )AND ?DataProvider = ("${collection}")) 
        } 
        GROUP BY ?item
        LIMIT 10000
        `;

        const response = await axios.get('https://sparql.europeana.eu/', {
            params: {
                query: sparqlQuery,
                format: 'json',
            },
        });

        results.value = response.data.results.bindings;
        results.value.s
    } catch (error) {
        console.error('Error querying Europeana SPARQL endpoint:', error);
    }
}*/
</script>
  
<style scoped>
.page-and-modal {
	height: 100%;
	width: 100%;
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