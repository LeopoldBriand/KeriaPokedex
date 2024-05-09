<template>
  <div :style="``">
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img :src="`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${img}`" :alt="info?.champion" style="width:200px;height:200px;">
        </div>
        <div class="flip-card-back">
          <h1>{{ info?.champion }}</h1>
          <p>Win: {{ info?.win }}, Loose: {{ info?.loose }}</p>
          <p>KDA: {{ info?.kda }}</p>
        </div>
      </div>
    </div>
  </div> 
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChampionCard',
  props: {
    info: Object,
    img: String,
    index: {type: Number, required: true}
  },
  computed: {
    gridStyles() {
      return {
        'grid-column': this.index % 5,
        'grid-row': Math.floor(this.index/5)
      }
    }
  }
})
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 200px;
  height: 200px;
  border: 0px;
  perspective: 1000px;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
.flip-card-front {
  background-color: #bbb;
  color: black;
}
.flip-card-back {
  background-color: transparent;
  color: white;
  transform: rotateY(180deg);
}
</style>
