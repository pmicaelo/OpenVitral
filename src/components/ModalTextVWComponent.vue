<template>
    <div class="modal-text">
        <div class="param" v-if="record['Dc:description']">
            <span class="param-name">Description</span>
            <span class="param-value">{{ record['Dc:description'].value }}</span>
        </div>
        <div class="param" v-if="record['Dcterms:extent']">
            <span class="param-name">Dimensions</span>
            <span class="param-value">{{ record['Dcterms:extent'].value }}</span>
        </div>
        <div class="param" v-if="record['Date of origin']">
            <span class="param-name">Date</span>
            <span class="param-value">{{ record['Date of origin'].value }}</span>
        </div>
        <div class="param" v-if="record['Dc:creator']">
            <span class="param-name">Creator</span>
            <span class="param-value">{{ record['Dc:creator'].value }}</span>
        </div>
        <ExpandableParameterComponent :paramEntries="locationEntries" paramName="Location" />
        <ExpandableParameterComponent :paramEntries="productionEntries"
            paramName="Production/Conservation" />
        <ExpandableParameterComponent :paramEntries="imageEntries" paramName="Image" />
        <ExpandableParameterComponent :paramEntries="registryEntries" paramName="Registry" />
        <ExpandableParameterComponent :paramEntries="licenseEntries" paramName="License" />
        <div class="param" v-if="record['History related image']">
            <span class="param-name">Related Images</span>
            <a class="param-image" :href="record['History related image'].value" target="_blank" rel="noopener noreferrer">
                <img :src="record['History related image'].value" alt="History related image">
            </a>
        </div>
    </div>
</template>
  
<script setup>

import ExpandableParameterComponent from './ExpandableParameterComponent.vue'

const { record } = defineProps(['record']);

const locationProps = ["Building", "Direction", "City", "Edm:country", "Edm:currentLocation",
    "Former/Original Locations",
    "State/Region", "Row", "Window number"];

const licenseProps = ["License type",
    "License description"];

const registryProps = ["Registry Author",
    "Registry Date"];

const productionProps = ["Production technique and style",
    "Restoration and conservation history", "Current state of conservation"];

const imageProps = ["Image author", "Photo creation date",
    "Photographic context", "Photographic process", "Images filenames"];

const locationEntries = {}, licenseEntries = {}, productionEntries = {}, registryEntries = {}, imageEntries = {}


for (const [key, value] of Object.entries(record)) {
    if (locationProps.includes(key)) {
        locationEntries[key] = value;
    }
    if (licenseProps.includes(key)) {
        licenseEntries[key] = value;
    }
    if (imageProps.includes(key)) {
        imageEntries[key] = value;
    }
    if (registryProps.includes(key)) {
        registryEntries[key] = value;
    }
    if (productionProps.includes(key)) {
        productionEntries[key] = value;
    }
}

</script>
  
<style scoped>
.modal-text {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    gap: 13px;
}

.param {
    display: flex;
    flex-direction: column;
    line-height: 21px;
}

.param .param-name {
    color: #fcce00;
    color: #888888;
    font-size: 15.5px;
    font-weight: 500;
}

.param .param-value {
    color: rgb(247, 247, 247);
    font-size: 15.5px;
}

.param .param-image {
    margin-top: 5px;
    width: fit-content;
    max-height: 150px;
}

.param .param-image img {
    max-height: 150px;
    max-width: 100%;
    border-radius: 15px;
    object-fit: cover;
}
</style>