<template>
  <div class="home">
    <div class="header">
      <img src="/logo_keria_pokedex.png" alt="">
      <h1 class="title">ERIA POKEDEX</h1>
    </div>
    <div class="cards">
      <ChampionCard 
        v-for="(card, index) in pokedex" 
        :key="index" 
        :info="card" 
        :img="champions[card.champion.replace(/\s/g, '') as keyof typeof champions]?.image.full"
        :index="index"
      </ChampionCard>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChampionCard from '@/components/ChampionCard.vue';
import axios from 'axios';
import { KeriaData, ChampionData } from '@/types';

export default defineComponent({
  name: 'HomeView',
  components: {
    ChampionCard
  },
  data() {
    return {
      champions: {} as ChampionData,
      pokedex: [] as KeriaData[]
    }
  },
  async mounted() {
    // Fetch all champion data
    this.champions = (await axios.get('https://ddragon.leagueoflegends.com/cdn/14.9.1/data/en_GB/champion.json')).data.data;
    this.pokedex = await(await fetch('/data.json')).json();
  },
})
</script>

<style scoped>
.home {
  padding-left: 150px;
  padding-right: 100px;
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
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
}
</style>