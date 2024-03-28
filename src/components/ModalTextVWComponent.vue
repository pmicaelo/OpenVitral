<template>
    <div class="modal-text">
        <div class="param" v-if="record.Description">
            <span class="param-name">Description</span>
            <span class="param-value">{{ record.Description.value }}</span>
        </div>
        <div class="param" v-if="record.Extent">
            <span class="param-name">Dimensions</span>
            <span class="param-value">{{ record.Extent.value }}</span>
        </div>
        <div class="param" v-if="record.Date_of_origin">
            <span class="param-name">Date</span>
            <span class="param-value">{{ record.Date_of_origin.value }}</span>
        </div>
        <div class="param" v-if="record.Creator">
            <span class="param-name">Creator</span>
            <span class="param-value">{{ record.Creator.value }}</span>
        </div>
        <ExpandableParameterComponent :paramEntries="locationEntries" paramName="Location" />
        <ExpandableParameterComponent :paramEntries="productionEntries" paramName="Production/Conservation" />
        <ExpandableParameterComponent :paramEntries="imageEntries" paramName="Image" />
        <ExpandableParameterComponent :paramEntries="registryEntries" paramName="Registry" />
        <ExpandableParameterComponent :paramEntries="licenseEntries" paramName="License" />
        <div class="param" v-if="record.History_related_image">
            <span class="param-name">Related Images</span>
            <a class="param-image" :href="record.History_related_image.value" target="_blank" rel="noopener noreferrer">
                <img :src="record.History_related_image.value" alt="History_related_image">
            </a>
        </div>
        <div class="param" v-if="record.Item">
            <span class="param-name">Source</span>
            <a class="param-value" :href="record.Item.value" target="_blank"
                    rel="noopener noreferrer" >{{ record.Item.value }}</a>
        </div>
    </div>
</template>
  
<script setup>

import ExpandableParameterComponent from './ExpandableParameterComponent.vue'

const { record } = defineProps(['record']);

const locationProps = ["Building", "Direction", "City", "Country", "Current_location",
    "Former_or_original_locations",
    "State_or_region", "Row", "Window_number"];

const licenseProps = ["License_type",
    "License_description"];

const registryProps = ["Registry_author",
    "Registry_date"];

const productionProps = ["Production_technique_and_style",
    "Restoration_and_conservation_history"];

const imageProps = ["Image_author", "Photo_creation_date",
    "Photographic_context", "Photographic_process"];

const locationEntries = [], licenseEntries = [], productionEntries = [], registryEntries = [], imageEntries = []

for (const [key, value] of Object.entries(record)) {
    if (locationProps.includes(key)) {
        const displayKey = key.replace(/_/g, " ");
        locationEntries.push([displayKey,value.value]);
        //locationEntries[displayKey] = value.value;
    }
    if (licenseProps.includes(key)) {
        const displayKey = key.replace(/_/g, " ");
        licenseEntries.push([displayKey,value.value]);
        //licenseEntries[displayKey] = value.value;
    }
    if (imageProps.includes(key)) {
        const displayKey = key.replace(/_/g, " ");
        imageEntries.push([displayKey,value.value]);
        //imageEntries[displayKey] = value.value;
    }
    if (registryProps.includes(key)) {
        const displayKey = key.replace(/_/g, " ");
        registryEntries.push([displayKey,value.value]);
        //registryEntries[displayKey] = value.value;
    }
    if (productionProps.includes(key)) {
        const displayKey = key.replace(/_/g, " ");
        productionEntries.push([displayKey,value.value]);
        //productionEntries[displayKey] = value.value;
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