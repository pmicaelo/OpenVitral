<template>
    <router-link to="/" class="logo">
        <img :src="logoURL" alt="Vue" />
        <span class="text">OpenVitral</span>
    </router-link>
</template>
    
<script setup>
import logoURL from '../assets/logoV.png'
</script>
    
<style scoped>
.logo {
    width: 125px;
    display: flex;
    align-items: center;
    text-decoration: none;
}

.logo img {
    transition: 0.2s ease-in-out;
    width: 40px;
}

.logo .text {
    transition: 0.2s ease-in-out;
    white-space: nowrap;
    font-family: "Russo One", sans-serif;
    margin-left: 4px;
    font-size: 17px;
    color: var(--logo-font);
}

.logo:hover img {
    transition: 0.2s ease-in-out;
    width: 41.5px;
}

.logo:hover .text {
    transition: 0.2s ease-in-out;
    font-size: 18px;
    /*font-weight: bold;*/
}
</style>