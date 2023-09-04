<template>
    <div class="modal-text">
        <div class="param" v-if="record.Description">
            <span class="param-name">Description</span>
            <span class="param-value">{{ record.Description.value }}</span>
        </div>
        <div class="param" v-if="record.DataProvider">
            <span class="param-name">DataProvider</span>
            <span class="param-value">{{ record.DataProvider.value }}</span>
        </div>
        <div class="param" v-if="record.Date">
            <span class="param-name">Date</span>
            <span class="param-value">{{ record.Date.value }}</span>
        </div>
        <div class="param" v-if="record.Spatial">
            <span class="param-name">Location</span>
            <span v-if="record.SpatialLabel" class="param-value">{{ record.SpatialLabel.value }}</span>
            <span v-else class="param-value">{{ record.Spatial.value }}</span>
        </div>
        <div class="param" v-if="record.Creator">
            <span class="param-name">Creator</span>
            <span class="param-value">{{ record.Creator.value }}</span>
        </div>
    </div>
</template>
  
<script setup>

const { record } = defineProps(['record']);

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

.param-name {
    color: #fcce00;
    color: #888888;
    font-size: 15.5px;
    font-weight: 500;
}

.param-value {
    color: rgb(247, 247, 247);
    font-size: 15.5px;
}
</style>