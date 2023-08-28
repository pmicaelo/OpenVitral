import axios from 'axios';

async function queryEndpoint(sparqlEndpoint, sparqlEndpointQuery) {
    try {
        const response = await axios.get(sparqlEndpoint, {
            params: {
                query: sparqlEndpointQuery,
                format: 'json',
            },
        });

        /*response.data.results.bindings.forEach(binding => {
          const resultRow = {};
          for (const variableName in binding) {
            if (binding.hasOwnProperty(variableName)) {
              const variableData = binding[variableName];
              if (variableData) {
                resultRow[variableName] = variableData.value;
              }
            }
          }
          console.log(resultRow);
        });*/

        console.log(response.data.results.bindings);
        return response.data.results.bindings;
    } catch (error) {
        console.error('Error querying the endpoint:', error);
        return [];
    }
}

async function queryEuropeanaEndpoint() {

    const results = await queryEndpoint('https://sparql.europeana.eu/', `
      PREFIX dc: <http://purl.org/dc/elements/1.1/> 
      PREFIX edm: <http://www.europeana.eu/schemas/edm/> 
      PREFIX ore: <http://www.openarchives.org/ore/terms/> 
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
      PREFIX dcterms: <http://purl.org/dc/terms/> 
      PREFIX wgs84_pos: <http://www.w3.org/2003/01/geo/wgs84_pos#> 
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#> 
  
      SELECT DISTINCT (SAMPLE(?item) AS ?item) (SAMPLE(?DataProvider) AS ?DataProvider) (SAMPLE(?Collection) AS ?Collection) (SAMPLE(?Title) AS ?Title) (SAMPLE(?Description) AS ?Description) (SAMPLE(?Image) AS ?Image) (SAMPLE(?Date) AS ?Date) (SAMPLE(?Provider) AS ?Provider) (SAMPLE(?Creator) AS ?Creator) (SAMPLE(?Spatial) AS ?Spatial) (SAMPLE(?Lat) AS ?Lat) (SAMPLE(?Long) AS ?Long) (SAMPLE(?SpatialLabel) AS ?SpatialLabel)
      WHERE { 
        ?item ?prop ?subject . 
  
        OPTIONAL { ?item dc:title ?Title . }
        OPTIONAL { ?item dc:description ?Description . }
        OPTIONAL { ?item dc:date ?Date . } 
        OPTIONAL { ?item dc:creator ?Creator. } 
        OPTIONAL { ?item dcterms:spatial ?Spatial. OPTIONAL {?Spatial wgs84_pos:lat ?Lat.
         ?Spatial wgs84_pos:long ?Long. } OPTIONAL{?Spatial skos:prefLabel ?SpatialLabel}} 
  
        ?item ore:proxyIn ?Aggregation .
  
        ?Aggregation edm:dataProvider ?DataProvider . 
        ?Aggregation edm:object ?Image .
        OPTIONAL { ?Aggregation edm:provider ?Provider . } 

        BIND(?DataProvider AS ?Collection).

        FILTER(?subject IN ("stained glass", "Stained Glass", "Stained glass windows in Sweden","stained glass window ", "stained_glass", "Glasschilderkunst", "Church windows in Sweden", "Vitrail de la famille Jailloux",
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

    results.map((element, index) => {
        element.uniqueId = { type: 'literal', value: `EuropeanaRecord${index}` };
        return element;
    });
    return results;
}

async function querynNFDI4CultureEndpoint() {
    const results = await queryEndpoint('https://nfdi4culture.de/sparql', `
      PREFIX schema: <http://schema.org/>
      PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 

      SELECT distinct ?item ?Collection ?Title ?Image ?Date ?Spatial ?Height ?Width
      WHERE {
        ?item schema:isPartOf <https://corpusvitrearum.de/bildarchiv.html> .
      
        OPTIONAL {?item schema:name ?Title.}
        OPTIONAL {?item schema:temporalCoverage ?Date}
        OPTIONAL {?item schema:contentLocation ?Spatial.}   
        OPTIONAL {?item schema:contentUrl ?Image.}

        OPTIONAL {?item schema:height ?Height.}
        OPTIONAL {?item schema:width ?Width.}   

        BIND("Corpus Vitrearum Medii Aevi Deutschland" AS ?Collection).
    }
    `)
    results.map((element, index) => {
        element.uniqueId = { type: 'literal', value: `CVDeutschlandRecord${index}` };
        return element;
    });
    return results;
}

async function fetchLocal() {
    const filePath = '/src/data/vitralWiki.json';
    return await axios.get(filePath)
        .then(response => {
            const results = response.data.results;
            results.map((element, index) => {
                element.uniqueId = { type: 'literal', value: `VitralWikiRecord${index}` };
                return element;
            });
            return results
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return [];
        });
}

export async function fetchAll() {
    //records.value = [];
    const all = [];
    all.push(...await fetchLocal());
    /*all.push(...await queryEuropeanaEndpoint())
    /*all.push(...await querynNFDI4CultureEndpoint())

    /*all.map((element, index) => {
        element.uniqueId = { type: 'literal', value: `record${index}` };
        return element;
    });*/
    console.log(all);
    /*all.sort((a, b) => {
        const titleA = a.Title ? a.Title.value : "";
        const titleB = b.Title ? b.Title.value : "";

        if (titleA === "" && titleB === "") {
            return 0;
        } else if (titleA === "") {
            return 1;
        } else if (titleB === "") {
            return -1;
        }
        return titleA.localeCompare(titleB);
    });*/

    return all;
}