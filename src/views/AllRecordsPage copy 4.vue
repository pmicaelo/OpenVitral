<template>
  <main>
    <button @click="queryEuropeanaEndpoint">Refresh Data</button>
    <div v-if="results" class="results-container">
      <RecordCard v-for="result in results" :key="result.item.value" :record="result" />
    </div>
  </main>
</template>

<script setup>
//this is the version without pagination
import { ref, onMounted } from 'vue';
import axios from 'axios';
import RecordCard from '../components/RecordCard.vue';

const results = ref([]);

onMounted(() => {
  const cachedResults = localStorage.getItem('cachedResults');
  if (cachedResults) {
    results.value = JSON.parse(cachedResults);
  } else {
    queryEuropeanaEndpoint();
  }
});

async function queryEuropeanaEndpoint() {
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
      )) 
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
    /*for (let i = results.value.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [results.value[i], results.value[j]] = [results.value[j], results.value[i]];
    }*/
    localStorage.setItem('cachedResults', JSON.stringify(results.value));
    console.log(results.value)
  } catch (error) {
    console.error('Error querying Europeana SPARQL endpoint:', error);
  }
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
  position: static;
  /*display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;*/
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  row-gap: 1rem;
  column-gap: 1rem;
  align-items: flex-end;

}

button {
  background-color: var(--dark);
  padding: 1rem 1.0rem;
  top: 0;
  color: var(--light);
  font-family: "Overpass", sans-serif;
  position: sticky;
}

button:hover {
  background-color: var(--dark-alt);
}
</style>