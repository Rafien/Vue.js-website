

<script>
import axios from "axios";

export default {
  name: "SearchComponent",
  data(){
    return {
      search: "",
      name: "",
    }
  },
  watch:{
    search(newSearch){
      axios.get('https://api.scryfall.com/cards/named',{params: {fuzzy:newSearch}} ).then(
            (result) => {
                this.name = result.data.name
            }
        )
    }
  },
  methods:{
    changeTo(){
      this.$router.push({path: `/card/${this.name}`}),
      this.search = ""
  }
  }
    
}


</script>

<template>

  <input type="text" v-model="search" placeholder="Search for a card">

  <button @click="changeTo()"><slot>Clique moi</slot></button>

</template>
<style scoped>
</style>