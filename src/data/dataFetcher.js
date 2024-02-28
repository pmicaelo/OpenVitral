import axios from 'axios';

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
        element.uniqueId = element.item;
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
            ?item smwprop:Dc-3Atype "Stained glass". 
            OPTIONAL {?item smwprop:Dc-3Atitle ?Title.}
            OPTIONAL {?item smwprop:Edm-3Aobject ?Image.}
            OPTIONAL {?item smwprop:Dc-3Acreator ?Creator.}
            OPTIONAL {?item smwprop:Dc-3Asource ?Source.}
            OPTIONAL {?item smwprop:Place_of_manufacture ?Place_of_manufacture.}
            OPTIONAL {?item smwprop:Edm-3Acountry ?Country.}
            OPTIONAL {?item smwprop:Dc-3Adescription ?Description.}
            OPTIONAL {?item smwprop:Edm-3AdatasetName ?Dataset_name.}
            OPTIONAL {?item smwprop:Dcterms-3Aextent ?Extent.}
            OPTIONAL {?item smwprop:Registry_Date ?Registry_date.}
            OPTIONAL {?item smwprop:Digital_image_source ?Digital_image_source.}
            OPTIONAL {?item smwprop:Photographic_context ?Photographic_context.}
            OPTIONAL {?item smwprop:Photographic_process ?Photographic_process.}
            OPTIONAL {?item smwprop:Photo_creation_date ?Photo_creation_date.}
            OPTIONAL {?item smwprop:Image_author ?Image_author.}
            OPTIONAL {?item smwprop:Registry_Author ?Registry_author.}
            OPTIONAL {?item smwprop:Credits ?Credits.}
            OPTIONAL {?item smwprop:License_type ?License_type.}
            OPTIONAL {?item smwprop:License_description ?License_description.}
            OPTIONAL {?item smwprop:City ?City.}
            OPTIONAL {?item smwprop:State-2FRegion ?State_or_region.}
            OPTIONAL {?item smwprop:Building ?Building.}
            OPTIONAL {?item smwprop:Direction ?Direction.}
            OPTIONAL {?item smwprop:Window_number ?Window_number.}
            OPTIONAL {?item smwprop:Row ?Row.}
            OPTIONAL {?item smwprop:Former-2FOriginal_Locations ?Former_or_original_locations.}
            OPTIONAL {?item smwprop:Identifiers_of_original-2Fformer_locations ?Identifiers_of_former_or_original_locations.}
            OPTIONAL {?item smwprop:Date_of_origin ?Date_of_origin.}
            OPTIONAL {?item smwprop:Production_technique_and_style ?Production_technique_and_style.}
            OPTIONAL {?item smwprop:Current_state_of_conservation ?Current_state_of_conservation.}
            OPTIONAL {?item smwprop:Restoration_and_conservation_history ?Restoration_and_conservation_history.}
            OPTIONAL {?item smwprop:History_related_image ?History_related_image.}
            OPTIONAL {?item smwprop:Owner-27s_name ?Owner_name.}
            OPTIONAL {?item smwprop:Owner-27s_identifier ?Owner_identifier.}
            OPTIONAL {?item smwprop:Signature ?Signature.}
            OPTIONAL {?item smwprop:Edm-3APlace ?Place.}
            OPTIONAL {?item smwprop:Edm-3AcurrentLocation ?Current_location.}
            BIND(?Building AS ?Collection).
        } 
        ORDER BY ASC(?Title)
        LIMIT 10000
    `)

    results.map((element, index) => {
        element.uniqueId = element.item;
        if (element.Current_location) {
            const [latitude, longitude] = element.Current_location.value.split(',');
            element.Lat = { type: 'literal', value: latitude.trim() };
            element.Long = { type: 'literal', value: longitude.trim() };
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
        element.uniqueId = { type: 'literal', value: `cvdeutschlandrecord${index}` };
        return element;
    });
    return results;
}


export async function fetchAll() {
    const all = [];
    all.push(...await queryVitralWikiEndpoint())
    all.push(...await queryEuropeanaEndpoint())
    //all.push(...await querynNFDI4CultureEndpoint())
    return all;
}