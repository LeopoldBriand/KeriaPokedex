<template>
    <div class="search-container">
        <input class="input" v-model="searchText" type="text" placeholder="Search.." name="search">
        <i class="gg-search"></i>
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Fuse from 'fuse.js'
import { KeriaData } from '@/types';

export default defineComponent({
    name: 'SearchBar',
    data() {
        return {
            searchText: '',
        }
    },
    props: {
        champions:{
            type: Array as () => KeriaData[],
            required: true,
        }
    },
    watch: {
        searchText: 'handleSearch',
        champions: {
            handler: 'handleSearch',
            deep: true,
        }
    },
    methods: {
        handleSearch() {
            if (this.searchText.length) {
                const fuse = new Fuse(this.champions, {
                    keys: ["champion"],
                    threshold: 0.2
                });
                let result = fuse.search(this.searchText).map(r => r.item);
                this.$emit('filterChampions',result)
            } else {
                this.$emit('filterChampions', this.champions)
            }
        }
    }
})
</script>

<style scoped>
.search-container {
    position: relative;
    width: 10%;
    margin-bottom: 20px;
    margin-right: 5%;
    margin-left: auto;
    
}
.search-container input {
    width: 100%;
    padding: 10px 10px 10px 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline-color: var(--dark-blue-color);
}
.search-container i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #888;
}
</style>
  