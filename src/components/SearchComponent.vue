

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
  <form>
    <input type="text" v-model="search" placeholder="Search for a card">

    <button @click="changeTo()"><slot>Search</slot></button>
  </form>
  

</template>
<style scoped>
  input{
    min-height: 4.5vh;
    padding-top: 1.25%;
    background-color: #7f5af0;
    border: none;
    border-left: solid 1px rgba(48, 52, 54, 0.4);
  }

  ::placeholder{
    color: #fffffe;
    padding-left: 2%;
  }

  button{
    min-height: 4.5vh;
    padding-top: 1.25%;
    color: #fffffe;
    background-color: #7f5af0;
    border:none;
    border-left: solid 1px rgba(26, 26, 27, 0.4);
    border-right: solid 1px rgba(26, 26, 27, 0.4);
  }
</style>