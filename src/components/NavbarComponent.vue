<template>
  <nav>
    <LogoComponent />
    <div class="menu">
      <MenuButtonComponent path="/collections" icon="library_books" text="Collections" />
      <MenuButtonComponent path="/allrecords" icon="grid_on" text="All Records" />
      <MenuButtonComponent path="/favourites" icon="stars" text="Favourites" />
      <MenuButtonComponent path="/map" icon="map" text="Map" />
      <MenuButtonComponent path="/about" icon="description" text="About" />
    </div>
  </nav>
</template>
  
<script setup>
import MenuButtonComponent from './MenuButtonComponent.vue'
import LogoComponent from './LogoComponent.vue'
</script>
  
<style scoped>
nav {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  top: 0;
  left: 0;

  /*need for sticky position*/
  z-index: 1;
  max-width: 100%;
  width: 100%;
  position: relative;
  height: var(--navbar-height);

  background-color: #1a1c1d;

  padding: 0rem 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .9), 0 0px 2px rgba(0, 0, 0, .9);
}

.logo{
  height: var(--navbar-height);
  margin-right: 2rem;
}

.menu {
  /*overflow-y: hidden;*/
  overflow: auto;
  display: flex;
  margin-left: auto;
  gap: 8px;
}

</style>