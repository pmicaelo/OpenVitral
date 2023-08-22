<template>
  <nav>
    <div class="logo">
      <router-link to="/" class="button">
        <img :src="logoURL" alt="Vue" />
        <span class="text">VitralWiki</span>
      </router-link>
    </div>
    <div class="menu">
      <router-link to="/" class="button">
        <span class="material-icons">map</span>
        <span class="text">Map</span>
      </router-link>
      <router-link to="/allrecords" class="button">
        <span class="material-icons">grid_on</span>
        <span class="text">All Records</span>
      </router-link>
      <router-link to="/collections" class="button">
        <span class="material-icons">library_books</span>
        <span class="text">Collections</span>
      </router-link>
      <router-link to="/about" class="button">
        <span class="material-icons">description</span>
        <span class="text">About</span>
      </router-link>
    </div>
  </nav>
</template>
  
<script setup>
import logoURL from '../assets/logoV.png'
import MenuButton from './MenuButton.vue';
</script>
  
<style scoped>
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  /*need for sticky position*/
  z-index: 1;
  max-width: 100vw;
  position: sticky;
  height: var(--navbar-height);
  
  background-color:rgba(148, 148, 148, 0.1);
  background-color:rgba(128, 128, 129, 0.1);
  background-color:rgba(167, 167, 167, 0.1);
  background-color: #18191b;
  background-color: #232425;
  background-color: #1e1f20;
  background-color: #1a1c1d;

  padding: 1rem 1rem;
  border-bottom: 0px solid #5c5c5c;
  box-shadow: 0 1px 2px rgba(0,0,0,.9),0 0px 2px rgba(0,0,0,.9);
}

.logo {
  display: flex;
  margin-right: 2rem;
}

.logo .button {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo img {
  transition: 0.2s ease-in-out;
  width: 2.5rem;
}

.logo .button .text {
  transition: 0.2s ease-in-out;
  white-space: nowrap;
  font-family: "Russo One", sans-serif;
  /*font-weight: bold;*/
  margin-left: 0.25rem;
  font-size: 1.15rem;
  color: var(--logo-font);
}

.logo .button:hover img {
  transition: 0.2s ease-in-out;
  width: 2.58rem;
}

.logo .button:hover .text {
  transition: 0.2s ease-in-out;
  font-size: 1.2rem;
  /*font-weight: bold;*/
}

.menu {
  overflow-y: hidden;
  display: flex;
  align-items: center;
  margin-left: auto;

}

.menu .button {
  display: flex;
  align-items: center;
  text-decoration: none;
  height: var(--navbar-height);
  /*height: calc(var(--navbar-height) - 1px);*/
  padding: 0rem 1.0rem;
  border-bottom: 4px solid transparent;
  border-top: 4px solid transparent;

}

.button+.button {
  margin-left: 2rem;
  /*add space between buttons*/
}

.menu .button .material-icons-outlined,
.menu .button .material-icons {
  font-size: 1.7rem;
  color: var(--light);
}

.menu .button .text {
  white-space: nowrap;

  font-weight: 500;
  font-family: "Overpass", sans-serif;

  /*font-weight: bold;*/
  margin-left: 0.2rem;
  font-size: 1rem;
  color: var(--light);
}

.menu .button:hover {
  transition: 0.3s ease-in-out;
  background-color: var(--dark-alt);
}

.menu .button:hover .material-icons,
.menu .button:hover .material-icons-outlined,
.menu .button:hover .text {
  transition: 0.3s ease-in-out;
  color: var(--primary);
}

.menu .button.router-link-exact-active {
  transition: 0.3s ease-in-out;
  background-color: var(--dark-alt);
  border-bottom: 4px solid var(--primary);
}

.menu .button.router-link-exact-active .material-icons,
.menu .button.router-link-exact-active .material-icons-outlined,
.menu .button.router-link-exact-active .text {
  color: var(--primary);
}</style>