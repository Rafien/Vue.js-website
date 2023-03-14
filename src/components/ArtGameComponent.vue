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
    guess(){
        this.verifReponse()
        this.setVariables()
        this.getProduct()
    },
    verifReponse(){
        if (this.name == this.guessedName){
            this.resultat = "Correct"
            this.score += 1
        } else {
            this.resultat = "Incorrect"
        }
    },
    setVariables(){
        this.oldImg = this.img
        this.oldName = this.name
        this.oldset = this.getSet(this.set)
        this.guessedNameDisplay = this.guessedName
        this.toGuess = ""
    },
    getSet(set){
      axios.get('https://api.scryfall.com/sets/'+ set).then(
        (setResult) => {
          this.oldset = setResult.data.name
        }
      )
    },
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
  <div><img :src="this.img" class="main_img"/></div>
  <!--test-->
  <div>  For testing purposes : name : {{ this.name }}, set : {{ this.firstSet }}</div>


  <input type="text" v-model="toGuess">

  <button @click="guess()"><slot>guess</slot></button>
  <div>Score : {{  this.score }}</div>
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