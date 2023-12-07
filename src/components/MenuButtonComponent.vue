<template>
    <router-link :to="path" class="menu-button">
        <span class="material-icons">{{ icon }}</span>
        <span class="text">{{ text }}</span>
    </router-link>
</template>
    
<script setup>

const { path, icon, text } = defineProps(['path', 'icon', 'text']);

</script>
    
<style scoped>
.menu-button {
    display: flex;
    align-items: center;
    text-decoration: none;
    height: var(--navbar-height);
    padding: 0px 16px;
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
}

.menu-button .material-symbols-rounded,
.menu-button .material-icons-outlined,
.menu-button .material-icons {
    font-size: 22px;
    color: #888888;color:#bebebe ;
    
}

.menu-button .text {
    white-space: nowrap;

    font-weight: 600;
    font-family: "Overpass", sans-serif;

    margin-left: 3px;
    font-size: 15px;
    color: var(--light); 
    color:#bebebe ;
    
}

.menu-button:hover {
    transition: 0.2s ease-in-out;
    background-color: var(--dark-alt);
}

.menu-button:hover .material-symbols-rounded,
.menu-button:hover .material-icons,
.menu-button:hover .material-icons-outlined,
.menu-button:hover .text {
    transition: 0.2s ease-in-out;
    color: var(--primary);
    color: var(--light);

}

.menu-button.router-link-active {
    transition: 0.2s ease-in-out;
    background-color: var(--dark-alt);
    border-bottom: 3px solid var(--primary);
    border-bottom: 3px solid var(--light);
}

.menu-button.router-link-active .material-symbols-rounded,
.menu-button.router-link-active .material-icons,
.menu-button.router-link-active .material-icons-outlined,
.menu-button.router-link-active .text {
    color: var(--primary);
    color: var(--light);
}
</style>