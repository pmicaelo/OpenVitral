<template>
    <router-link to="/" class="logo">
        <img :src="logoURL" alt="Vue" />
        <span class="text">VitralWiki</span>
    </router-link>
</template>
    
<script setup>
import logoURL from '../assets/logoV.png'
</script>
    
<style scoped>
.logo {
    width: 136px;
    display: flex;
    align-items: center;
    text-decoration: none;
}

.logo img {
    transition: 0.2s ease-in-out;
    width: 2.5rem;
}

.logo .text {
    transition: 0.2s ease-in-out;
    white-space: nowrap;
    font-family: "Russo One", sans-serif;
    margin-left: 0.25rem;
    font-size: 1.15rem;
    color: var(--logo-font);
}

.logo:hover img {
    transition: 0.2s ease-in-out;
    width: 2.58rem;
}

.logo:hover .text {
    transition: 0.2s ease-in-out;
    font-size: 1.2rem;
    /*font-weight: bold;*/
}
</style>