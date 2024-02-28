<template>
    <div class="expandable-param" v-if="paramEntries.length > 0">
        <div class="expandable-param-title" @click="toggleExpanded" style="cursor:pointer">
            <span class="text"> {{ paramName }} </span>
            <span class="material-symbols-rounded">
                {{ expanded ? 'do_not_disturb_on' : 'add_circle' }}
            </span>
        </div>
        <div class="expandable-section" v-if="expanded">
            <div class="param" v-for="([key, value], index) in getSortedEntries()" :key="index">
                <span class="param-name">{{ key }}</span>
                <span v-if="!value.trim().startsWith('http')" class="param-value">{{ value }}</span>
                <a :href="value" target="_blank" rel="noopener noreferrer" v-else
                    class="param-value">{{ value }}</a>
            </div>
        </div>
    </div>
</template>

<script setup>

const { paramEntries, paramName } = defineProps(['paramEntries', 'paramName']);

 
import { ref } from 'vue'

const expanded = ref(false);

const toggleExpanded = () => {
    expanded.value = !expanded.value;
};

const getSortedEntries= () => {
      return paramEntries.sort((a, b) => a[0].localeCompare(b[0]));
}
</script>
  
<style scoped>

.expandable-param-title {
    display: flex;
    width: fit-content;
    align-items: center;
    max-width: 100%;
}

.expandable-param-title .text {
    max-width: 100%;
    color: #888888;
    font-size: 15.5px;
    font-weight: 500;
}

.expandable-param-title .material-symbols-rounded {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
    margin-left: 3px;
    font-size: 16px;
}

.expandable-param-title:hover .material-symbols-rounded {
    font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
    transition: 0.2s ease-in-out;
}

.expandable-section {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    gap: 5px;
}

.param {
    margin-left: 35px;
    display: flex;
    flex-direction: column;
}

.param-name {
    color: #888888;
    font-size: 14.5px;
    font-weight: 500;
}

.param-value {
    color: rgb(247, 247, 247);
    font-size: 14.5px;
}
</style>