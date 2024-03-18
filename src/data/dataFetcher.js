import axios from 'axios';
import dataVW from './vitralWiki2.json'

async function queryEndpoint(sparqlEndpoint, sparqlEndpointQuery) {
    try {
        const response = await axios.get(sparqlEndpoint, {
            params: {
                query: sparqlEndpointQuery,
                format: 'json',
            },
        });
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

        SELECT DISTINCT (SAMPLE(?Item) AS ?Item) (SAMPLE(?Proxy) AS ?Proxy) (SAMPLE(?DataProvider) AS ?DataProvider) (SAMPLE(?Collection) AS ?Collection) (SAMPLE(?Title) AS ?Title) (SAMPLE(?Description) AS ?Description) (SAMPLE(?Image) AS ?Image) (SAMPLE(?Date) AS ?Date) (SAMPLE(?Provider) AS ?Provider) (SAMPLE(?Creator) AS ?Creator) (SAMPLE(?Spatial) AS ?Spatial) (SAMPLE(?Lat) AS ?Lat) (SAMPLE(?Long) AS ?Long) (SAMPLE(?SpatialLabel) AS ?SpatialLabel)
        WHERE { 
            ?Proxy ?Prop ?Subject . 
            ?Proxy ore:proxyFor ?Item .
            ?Proxy ore:proxyIn ?Aggregation .
            ?Aggregation edm:object ?Image .
            ?Aggregation edm:dataProvider ?DataProvider .
            ?Aggregation edm:provider ?Provider . 
            OPTIONAL { ?Proxy dc:title ?Title . }
            OPTIONAL { ?Proxy dc:description ?Description . }
            OPTIONAL { ?Proxy dc:date ?Date . } 
            OPTIONAL { ?Proxy dc:creator ?Creator. } 
            OPTIONAL { ?Proxy dcterms:spatial ?Spatial. OPTIONAL {?Spatial wgs84_pos:lat ?Lat.
            ?Spatial wgs84_pos:long ?Long. } OPTIONAL{?Spatial skos:prefLabel ?SpatialLabel}} 

            BIND(?DataProvider AS ?Collection).

            FILTER(?Subject IN ("stained glass", "Stained Glass", "Stained glass windows in Sweden","stained glass window ", "stained_glass", "Glasschilderkunst", "Church windows in Sweden", "Vitrail de la famille Jailloux",
            "Stained glass", "Glasmalerei", "Glassmaleri", "Витраж", "Вітраж", "Lasimaalaus",
            "Vitral", "Стъклопис", "Vitražas", "Vitrāža", "Vitraj", "Vitrail", "Üvegfestés",
            "Vitraž", "Vitráž (chrám)", "Gloine dhaite", "Vitrall", "Glasmålning",
            "스테인드 글라스", "Vidreira gótica", "Υαλογραφία", "Vetrata", "花窗玻璃",
            "Beirate", "زجاج معشق", "Gwydr lliw", "ステンドグラス", "Witraż", "Vitraliu",
            "Gebrandschilderd glas"
            )) 
        } 
        GROUP BY ?Proxy
        LIMIT 10000
    `)

    results.map((element, index) => {
        element.uniqueId = element.Item;
        return element;
    });
    //console.log(results)
    return results;
}

async function queryVitralWikiEndpoint() {

    const results = await queryEndpoint('https://cvportugal.fct.unl.pt/virtuoso/sparql', `
        PREFIX smwprop: <http://cvportugal.fct.unl.pt/mediawiki-1.37.1/index.php/Special:URIResolver/Property-3A>
        PREFIX swivt: <http://semantic-mediawiki.org/swivt/1.0#>
        
        SELECT DISTINCT *
        WHERE { 
            ?Item smwprop:Dc-3Atype "Stained glass". 
            OPTIONAL {?Item smwprop:Dc-3Atitle ?Title.}
            OPTIONAL {?Item smwprop:Edm-3Aobject ?Image.}
            OPTIONAL {?Item smwprop:Dc-3Acreator ?Creator.}
            OPTIONAL {?Item smwprop:Dc-3Asource ?Source.}
            OPTIONAL {?Item smwprop:Place_of_manufacture ?Place_of_manufacture.}
            OPTIONAL {?Item smwprop:Edm-3Acountry ?Country.}
            OPTIONAL {?Item smwprop:Dc-3Adescription ?Description.}
            OPTIONAL {?Item smwprop:Edm-3AdatasetName ?Dataset_name.}
            OPTIONAL {?Item smwprop:Dcterms-3Aextent ?Extent.}
            OPTIONAL {?Item smwprop:Registry_Date ?Registry_date.}
            OPTIONAL {?Item smwprop:Digital_image_source ?Digital_image_source.}
            OPTIONAL {?Item smwprop:Photographic_context ?Photographic_context.}
            OPTIONAL {?Item smwprop:Photographic_process ?Photographic_process.}
            OPTIONAL {?Item smwprop:Photo_creation_date ?Photo_creation_date.}
            OPTIONAL {?Item smwprop:Image_author ?Image_author.}
            OPTIONAL {?Item smwprop:Registry_Author ?Registry_author.}
            OPTIONAL {?Item smwprop:Credits ?Credits.}
            OPTIONAL {?Item smwprop:License_type ?License_type.}
            OPTIONAL {?Item smwprop:License_description ?License_description.}
            OPTIONAL {?Item smwprop:City ?City.}
            OPTIONAL {?Item smwprop:State-2FRegion ?State_or_region.}
            OPTIONAL {?Item smwprop:Building ?Building.}
            OPTIONAL {?Item smwprop:Direction ?Direction.}
            OPTIONAL {?Item smwprop:Window_number ?Window_number.}
            OPTIONAL {?Item smwprop:Row ?Row.}
            OPTIONAL {?Item smwprop:Former-2FOriginal_Locations ?Former_or_original_locations.}
            OPTIONAL {?Item smwprop:Identifiers_of_original-2Fformer_locations ?Identifiers_of_former_or_original_locations.}
            OPTIONAL {?Item smwprop:Date_of_origin ?Date_of_origin.}
            OPTIONAL {?Item smwprop:Production_technique_and_style ?Production_technique_and_style.}
            OPTIONAL {?Item smwprop:Current_state_of_conservation ?Current_state_of_conservation.}
            OPTIONAL {?Item smwprop:Restoration_and_conservation_history ?Restoration_and_conservation_history.}
            OPTIONAL {?Item smwprop:History_related_image ?History_related_image.}
            OPTIONAL {?Item smwprop:Owner-27s_name ?Owner_name.}
            OPTIONAL {?Item smwprop:Owner-27s_identifier ?Owner_identifier.}
            OPTIONAL {?Item smwprop:Signature ?Signature.}
            OPTIONAL {?Item smwprop:Edm-3APlace ?Place.}
            OPTIONAL {?Item smwprop:Edm-3AcurrentLocation ?Current_location.}
            BIND(?Building AS ?Collection).
        } 
        ORDER BY ASC(?Title)
        LIMIT 10000
    `)

    results.map((element, index) => {
        element.uniqueId = element.Item;
        if (element.Current_location) {
            const [latitude, longitude] = element.Current_location.value.split(',');
            if (parseFloat(latitude) && parseFloat(longitude)) {
                element.Lat = { type: 'literal', value: latitude };
                element.Long = { type: 'literal', value: longitude };
            }
        }
        return element;
    });
    return results;
}

async function querynNFDI4CultureEndpoint() {
    const results = await queryEndpoint('https://nfdi4culture.de/sparql', `
      PREFIX schema: <http://schema.org/>
      PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 

      SELECT DISTINCT ?Item ?Collection ?Title ?Image ?Date ?Spatial ?Height ?Width
      WHERE {
        ?Item schema:contentUrl ?Image .
        OPTIONAL {?Item schema:name ?Title}
        OPTIONAL {?Item schema:temporalCoverage ?Date}
        OPTIONAL {?Item schema:contentLocation ?Spatial}
        OPTIONAL {?Item schema:height ?Height}
        OPTIONAL {?Item schema:width ?Width}
        BIND("Corpus Vitrearum Medii Aevi Deutschland" AS ?Collection).
        
        FILTER(STRSTARTS(str(?Item), "https://corpusvitrearum.de")).
    }
    `)
    results.map((element, index) => {
        element.uniqueId = { type: 'literal', value: `cvdeutschlandrecord${index}` };
        return element;
    });
    return results;
}

function fetchLocal() {
    const results = dataVW.results;
    results.map((element, index) => {
        element.uniqueId = element.item;
        if (element.Current_location) {
            const [latitude, longitude] = element.Current_location.value.split(',');
            if (parseFloat(latitude) && parseFloat(longitude)) {
                element.Lat = { type: 'literal', value: latitude };
                element.Long = { type: 'literal', value: longitude };
            }
        }
        return element;
    });
    return results
}

export async function fetchAll() {
    const all = [];
    all.push(...fetchLocal());
    //all.push(...await queryVitralWikiEndpoint())
    all.push(...await queryEuropeanaEndpoint())
    //all.push(...await querynNFDI4CultureEndpoint())
    return all;
}