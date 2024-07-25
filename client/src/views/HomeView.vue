<template>
  <div class="home">
    <div class="header">
      <img src="/logo_keria_pokedex.png" alt="">
      <h1 class="title">ERIA POKEDEX</h1>
    </div>
    <div><SearchBar :champions="pokedex" @filterChampions="(filtered) => filteredChampions = filtered"/></div>
    <div class="cards">
      <ChampionCard 
        v-for="(card, index) in filteredChampions" 
        class="card"
        :key="index" 
        :info="card"
        :index="index"
      </ChampionCard>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChampionCard from '@/components/ChampionCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { KeriaData } from '@/types';

export default defineComponent({
  name: 'HomeView',
  components: {
    ChampionCard,
    SearchBar
  },
  data() {
    return {
      pokedex: [] as KeriaData[],
      filteredChampions: [] as KeriaData[]
    }
  },
  async mounted() {
    // Fetch all champion data
    let response = await fetch('/KeriaPokedex/data.json')
    this.pokedex = await response.json();
  },
})
</script>

<style scoped>
.home {
  margin-left: 5%;
  margin-right: 5%;
}
.header {
  font-family: 'Beaufort';
  display: inline-flex;
  margin: 50px
}
.title {
  padding-top: 10px;
  color: var(--gold-color);
  font-family: 'Beaufort';
  font-size: 50px;
  text-shadow: 1px 1px 2px black, 0 0 25px var(--dark-blue-color), 0 0 5px var(--dark-blue-color);
}
.cards {
  font-family: 'Beaufort';
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.card {
  width: 150px;
}
@media screen and (min-width: 700px) {
  .cards {
    font-family: 'Beaufort';
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
}
@media screen and (min-width: 1050px) {
  .cards {
    font-family: 'Beaufort';
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  }
}
@media screen and (min-width: 1400px) {
  .cards {
    font-family: 'Beaufort';
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 10px;

  }
  .selected-column {
    grid-column: 7;
    margin-right: 0;
  }
}

</style>