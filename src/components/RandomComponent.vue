
<script>
import axios from "axios";

export default {
  name: "RandomComponent",
  data(){
    return {
      name : "",
    }
  },
  mounted() {
    this.getProduct();
  },
  methods:{
    //fonction pour recup une carte aleatoire
    async getProduct(){
      //taper dans l'api
      axios.get('https://api.scryfall.com/cards/random').then(
          (result) => {
            // je verifie mon layout
            this.layout = result.data.layout
                if (this.layout == 'split' || this.layout == 'transform' || this.layout == 'flip' || this.layout == 'modal_dfc' || this.layout == 'adventure'){
                  // je recupere mon nom
                  this.name = result.data.card_faces[0].name
                } else {
                  //je recupere mon nom
                  this.name = result.data.name
                }
                // je push sur la page de la carte recupérée avec son nom en parametre
              this.$router.push({path: `/card/${this.name}`})
          }
      )
      }
  }
}
</script>
<template>

</template>

<style scoped>
img {
  height: 400px;
  width: auto;
}
</style>