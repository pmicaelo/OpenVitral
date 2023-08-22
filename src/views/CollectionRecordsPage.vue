<template>
    <div class="page-and-modal">
        <main>
            <input v-model="filter" placeholder="Title" />
            <div class="results-container">
                <router-link class="card-link" v-for="result in displayedResults" :key="result.item.value" :to="{
                    name: 'collectionrecords',
                    params: { collection: collection },
                    query: { record: result.uniqueId.value },
                }">
                    <RecordCard :record="result" />
                </router-link>
            </div>
            <Pagination :items="filteredResults" @updatePage="updateDisplayedResults" />
        </main>

        <transition name="backdrop-transition">
            <div class="modal-backdrop" v-if="record"> </div>
        </transition>
        <transition name="modal-transition">
            <RecordModal :record="record" v-if="record" />
        </transition>
    </div>
</template>
  
<script setup>
import { ref, computed, inject} from 'vue';
import { useRoute } from 'vue-router';

import RecordCard from '../components/RecordCard.vue';
import Pagination from '../components/Pagination.vue';
import RecordModal from '../components/RecordModal.vue';


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
        if (result.DataProvider) {
            return result.DataProvider.value.includes(collection);
        } return false
    });
    return results.value.filter((result) => {
        if (result.Title && result.DataProvider && result.DataProvider.value.includes(collection)) {
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
    overflow: clip;
    /*behind navbar (index 1)*/
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

.card-link {
    width: fit-content;
    text-decoration: none;
}

.results-container {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    align-items: flex-end;
}
</style>