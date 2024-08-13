<template>
  <div :style="``">
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img :src="`/KeriaPokedex/images/champions/${info.img}`.replace(/\s/g, '')" :alt="info?.champion" style="width:150px;height:150px;">
        </div>
        <div class="flip-card-back">
          <img :src="`/KeriaPokedex/images/champions/${info.img}`.replace(/\s/g, '')" :alt="info?.champion" class="flip-card-back-image" style="width:150px;height:150px;">
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
    info: {type: Object, required: true},
    index: {type: Number, required: true}
  },
  computed: {
    gridStyles(): object {
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
  width: 150px;
  height: 150px;
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
  background-color: #F0E6D2;
  color: black;
}
.flip-card-back {
  background-color: transparent;
  transform: rotateY(180deg);
}

.flip-card-back-image {
	position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
}
h1, p {
  color: var(--gold-color);
  text-shadow: 1px 1px 2px black, 0 0 25px var(--dark-blue-color), 0 0 5px var(--dark-blue-color);
  white-space: nowrap;
}
h1 {
  font-size:calc(10px + 0.8vw);
}
</style>
