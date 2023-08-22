<template>
  <main>
    <button @click="queryAll">Refresh Data</button>
    <input v-model="filter" placeholder="Title" />
    <div class="results-container">
      <RecordCard v-for="result in displayedResults" :key="result.item.value" :record="result" />
    </div>
    <Pagination :items="filteredResults" @updatePage="updateDisplayedResults" />
  </main>
</template>

<script setup>
//this is the version with local fetching of the data, no global
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import RecordCard from '../components/RecordCard.vue';
import Pagination from '../components/Pagination.vue';

const results = ref([]);
const displayedResults = ref([]);
const filter = ref('');

const filteredResults = computed(() => {
  const filterText = filter.value.toLowerCase();
  return results.value.filter((result) => {
    if (result.Title) {
      return result.Title.value.toLowerCase().includes(filterText);
    }
    else if (!result.Title){
      return true
    }
    return false;
  });
});

onMounted(() => {
  console.log("mounted parent")
  const cachedResults = localStorage.getItem('cachedResults');
  if (cachedResults) {
    results.value = JSON.parse(cachedResults);
    console.log(results)
    console.log(filteredResults)
  } else {
    queryAll();
  }
});

function updateDisplayedResults(data) {
  console.log("ran");
  displayedResults.value = data
}

async function queryEndpoint(sparqlEndpoint, sparqlEndpointQuery) {
  try {
    const response = await axios.get(sparqlEndpoint, {
      params: {
        query: sparqlEndpointQuery,
        format: 'json',
      },
    });
    console.log(response.data.results.bindings);
    return response.data.results.bindings;
  } catch (error) {
    console.error('Error querying the endpoint:', error);
    return []
  }
}

async function queryEuropeanaEndpoint() {
  return await queryEndpoint('https://sparql.europeana.eu/', `
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
      )) 
    } 
    GROUP BY ?item
    LIMIT 10000
    `)
}

async function querynNFDI4CultureEndpoint() {
  return await queryEndpoint('https://nfdi4culture.de/sparql', `
    PREFIX schema: <http://schema.org/>
    PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>

    SELECT ?item ?Title ?height ?DataProvider ?Image  ?coords
    WHERE {
      ?item schema:height ?height ;
              schema:name ?Title;
              schema:contentLocation ?DataProvider ;
              schema:contentUrl ?Image ;
              schema:keywords ?coords
      FILTER(contains(str(?item), "corpusvitrearum") && contains(str(?coords),"geonames"))
    }
    `)
}

async function queryAll() {
  results.value = [];
  const all = [];
  //all.push(...await queryEuropeanaEndpoint())
  all.push(...await querynNFDI4CultureEndpoint())
  results.value = all;
  console.log(results.value);
}

</script>

<style scoped>
main {
  min-height: calc(100vh - var(--navbar-height));
  overflow: auto;
  /*overflow: auto;*/
  /*min-height: calc(100vh - var(--navbar-height));*/
}

.results-container {
  /*
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-evenly;*/
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  align-items: flex-end;
}

button {
  background-color: rgb(31, 31, 31);
  padding: 1rem 1.0rem;
  margin-right: 2rem;

  top: 0;
  color: var(--light);
  font-family: "Overpass", sans-serif;
  border-radius: 10px;
  position: sticky;
}

button:hover {
  background-color: var(--dark-alt);
}
</style>