<script>
import { registerRuntimeHelpers } from "@vue/compiler-core";
import axios from "axios";

export default {
  name: "RandomComponent",
  data(){
    return {
        // init
      toGuess:"",
      name : "",
      img: "",
      set: "",
      //testing pruposes
      firstSet : "",

      // recup input + données
      input: "",
      guessedName:"",
      guessedNameDisplay:"",

      //affichage resultat
      score:0,
      resultat: "",

      //affichage réponse
      oldName:"",
      oldImg:"",
      oldset: "",
    }
  },
  watch:{
    // recuperation du nom exact de la carte devinée
    toGuess(newGuess){
      this.guessedName = ""
        axios.get('https://api.scryfall.com/cards/named',{params: {fuzzy:newGuess}} ).then(
            (guessResult) => {
                this.guessedName = guessResult.data.name
            }
        )
    }
  },
  mounted() {
    this.getProduct();
  },
  methods:{
    // recuperation des informations de la carte a deviner
    async getProduct(){
      
      axios.get('https://api.scryfall.com/cards/random').then(
          (result) => {
              this.name = result.data.name,
              this.img = result.data.image_uris.art_crop
              this.set = result.data.set
              //testing purposes
              this.firstSet = this.testingGetSet(this.set)
          }
      )

    },
    // essai de deviner
    guess(){
        this.verifReponse()
        this.setVariables()
        this.getProduct()
    },
    // je verifie la correspondance entre le nom deviné et le nom a deviner
    verifReponse(){
        if (this.name == this.guessedName){
            this.resultat = "Correct"
            this.score += 1
        } else {
            this.resultat = "Incorrect"
        }
    },
    // je recupere mes variables afin d'afficher la verification au joueur
    setVariables(){
        this.oldImg = this.img
        this.oldName = this.name
        this.oldset = this.getSet(this.set)
        this.guessedNameDisplay = this.guessedName
        this.toGuess = ""
    },
    // je recupere le set pour l'indiquer au joueur (les artworks ne sont pas toujours les memes)
    getSet(set){
      axios.get('https://api.scryfall.com/sets/'+ set).then(
        (setResult) => {
          this.oldset = setResult.data.name
        }
      )
    },
    //apperement c'est necessaire
    testingGetSet(set){
      axios.get('https://api.scryfall.com/sets/'+ set).then(
        (setResult) => {
          this.firstSet = setResult.data.name
        }
      )
    }
  }
}
</script>

<template>
  <!-- j'affiche mon image a deviner -->
  <div><img :src="this.img" class="main_img"/></div>
  <!--test-->
  <div>  For testing purposes : name : {{ this.name }}, set : {{ this.firstSet }}</div>

<!-- input pour guess -->
  <input type="text" v-model="toGuess">

  <button @click="guess()"><slot>guess</slot></button>
  <!-- affichage du score -->
  <div>Score : {{  this.score }}</div>
  <!-- affichage ancienne carte -->
  <div v-if="oldName != ''">{{ this.resultat }} it was <router-link :to="{name: 'card_page', params:{nom: this.oldName}}" target="_blank" class="link-to-art">{{ this.oldName }}</router-link> from {{ this.oldset }} and you guessed {{ this.guessedNameDisplay }}<span v-if="guessedNameDisplay == ''">nothing</span></div>
  <img :src="this.oldImg" class="old_img">
</template>

<style>
.old_img {
    height: 200px;
    width: auto;
  }

.main_img{
    height: 400px;
    width: auto;
}
.link-to-art{
  text-decoration: none;
  color: #7f5af0;
}
</style>