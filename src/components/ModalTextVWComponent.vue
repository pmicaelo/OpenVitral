<template>
    <div class="modal-text">
        <div class="param" v-for="(value, key) in record" :key="key">
            <span class="param-name">{{ key }}</span>
            <span v-if="value.hasOwnProperty('value')" class="param-value">{{ value.value }}</span>
            <a :href="value.typeresource" v-else-if="value.hasOwnProperty('resource')" class="param-value">{{ value.typeresource }}</a>
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