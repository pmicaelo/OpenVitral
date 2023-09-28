<template>
	<main class="main">
    <div class="text">
      <section class="text-element">
        <h1>Project & Goals</h1>
        <p>In 2022, the Nova Laboratory for Computer Science and Informatics (NOVALINCS) at FCT-NOVA initiated
          VitralWiki,
          a new project aimed at addressing the crucial task of preserving Portugal's culturally rich
          stained glass heritage.</p>
        <p>VitralWiki's primary objective lies in the improvement of accessibility to available stained glass resources
          on
          the Web while also
          promoting a deeper appreciation for this type of glass art.
        </p>
      </section>
      <section class="text-element">
        <h1>Content</h1>
        <p>VitralWiki contains data regarding stained glass objects that is available on the Web in the form of Linked
          Open Data (LOD).</p>
        <p>As of today, the data on this website is obtained via two different sources: </p>
        <p>• By using the data in VitralWiki's wiki page available at MediaWiki which contains the Portuguese Batalha's
          Monastery stained glass collection;</p>
        <p>• By querrying the Europeana's open access SPARQL Endpoint;</p>
      </section>
      <section class="text-element">
        <h1>Collaborators</h1>
        <p>So far, this project has counted with the collaboration of: </p>
        <p>• Research unit VICARTE - glass and ceramics for the arts; </p>
        <p>• Monastery of Santa Maria da Vitória (Batalha). </p>
      </section>
      <section class="text-element">
        <h1>Links</h1>
        <a class="link" href="https://nova-lincs.di.fct.unl.pt/" target="_blank" rel="noopener noreferrer">
          <p>NOVALINCS</p>
        </a>
        <a class="link" href="https://vicarte.org/" target="_blank" rel="noopener noreferrer">
          <p>VICARTE</p>
        </a>
        <a class="link" href="http://www.mosteirobatalha.gov.pt/en/index.php" target="_blank" rel="noopener noreferrer">
          <p>Batalha's Monastery Website</p>
        </a>
        <a class="link" href="https://cvportugal.fct.unl.pt/mediawiki-1.37.1/index.php/VitralWiki" target="_blank"
          rel="noopener noreferrer">
          <p>VitralWiki's Wiki Page</p>
        </a>
        <a class="link" href="https://sparql.europeana.eu/" target="_blank" rel="noopener noreferrer">
          <p>Europeana SPARQL Endpoint</p>
        </a>
      </section>
    </div>
  </main>
</template>

<style scoped>
.main {
  padding: 32px;
}

.text {
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 100%;
}

.text-element {
  background-color: #181818;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
  padding: 1rem;
  border-radius: 8px;
  width: 600px;
  max-width: 100%;
  min-width: 200px;
  height: fit-content;
}

.text-element h1 {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 15px;
}

.text-element .link {
  display: flex;
  width: fit-content;
}

.text-element p {
  line-height: 21px;
  font-size: 15.5px;
}
</style>