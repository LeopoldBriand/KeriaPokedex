<template>
  <div class="home">
    <h1>Keria pokedex</h1>
    <div class="cards">
      <ChampionCard 
        v-for="(card, index) in pokedex" 
        :key="index" 
        :info="card" 
        :img="champions[card.champion.replace(/\s/g, '') as keyof typeof champions]?.image.full"
        :index="index">
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
  }
})
</script>

<style scoped>
.home {
  margin-left: 200px;
  margin-right: 100px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
</style>