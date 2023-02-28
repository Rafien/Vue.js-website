<script>
import axios from "axios";

export default {
  name: "RandomComponent",
  data(){
    return {
        // init
      toGuess:"",
      name : "",
      img: "",

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
    }
  },
  watch:{
    toGuess(newGuess){
        axios.get('https://api.scryfall.com/cards/named',{params: {fuzzy:newGuess}} ).then(
            (guessResult) => {
                this.guessedName = guessResult.data.name
                console.log(guessResult)
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
        this.guessedNameDisplay = this.guessedName
        this.toGuess = ""
    }
  }
}
</script>

<template>
    <div><img :src="this.img" class="main_img"/></div>
    <div>  For testing purposes : name : {{ this.name }}</div>
    <input type="text" v-model="toGuess">

  <button @click="guess()"><slot>guess</slot></button>
  <div>Score : {{  this.score }}</div>
  <div v-if="oldName != ''">{{ this.resultat }} it was <!--Add routerlink (bug?)--><router-link :to="{name: 'card_page', params:{nom: this.oldName}}" target="_blank" class="link-to-art">{{ this.oldName }}</router-link> and you guessed {{ this.guessedNameDisplay }}</div>
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
}
</style>