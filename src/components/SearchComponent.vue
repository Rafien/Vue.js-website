

<script>
  import { transform } from "@vue/compiler-core";
  import axios from "axios";

  export default {
    name: "SearchComponent",
    data(){
      return {
        search: "",
        name: "",
        layout: "",
      }
    },
    watch:{
      //je verifie la string a chaque modification
      search(newSearch){
        axios.get('https://api.scryfall.com/cards/named',{params: {fuzzy:newSearch}} ).then(
              (result) => {
                // je verifie le layout
                  this.layout = result.data.layout
                  if (this.layout == 'split' || this.layout == 'transform' || this.layout == 'flip' || this.layout == 'modal_dfc' || this.layout == 'adventure'){
                    // je recupere le nom
                    this.name = result.data.card_faces[0].name
                  } else {
                    // je recupere le nom
                    this.name = result.data.name
                  }
              }
          )
      },
    },
    methods:{
      // change la page en fonction du parametre en recherche
      changeTo(){
        // je verifie que j'ai une unique carte
        if (this.name !== ""){
          // je push sur la carte en question avec son nom en parametre
          this.$router.push({path: `/card/${this.name}`})
        } else {
          // si je n'ai pas de carte unique, je renvoie sur la recherche approximative avec la recherche en parametre
          this.$router.push({path: `/searched/${this.search}`, params:{search:this.search}})
        }
        // je reset mes valeurs pour eviter les erreurs
        this.name = ""
        this.search = ""
    }
  }
    
  }


</script>

<template>
  <!-- form pour recuperer la recherche -->
  <form>
    <input type="text" v-model="search" placeholder="Search for a card">

    <button @click="changeTo()"><slot>Search</slot></button>
  </form>
  

</template>
<style scoped>
  input{
    min-height: 4.5vh;
    padding-top: 1.25%;
    background-color: #402e75;
    border: none;
    border-left: solid 1px rgba(48, 52, 54, 0.4);
    color: #fffffe;
  }

  ::placeholder{
    color: #fffffe;
    padding-left: 2%;
  }

  button{
    min-height: 4.5vh;
    padding-top: 1.25%;
    color: #fffffe;
    background-color: #402e75;
    border:none;
    border-left: solid 1px rgba(26, 26, 27, 0.4);
    border-right: solid 1px rgba(26, 26, 27, 0.4);
  }
</style>