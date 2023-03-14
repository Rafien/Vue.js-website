
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
    async getProduct(){
      axios.get('https://api.scryfall.com/cards/random').then(
          (result) => {
            this.layout = result.data.layout
                if (this.layout == 'split' || this.layout == 'transform' || this.layout == 'flip' || this.layout == 'modal_dfc' || this.layout == 'adventure'){
                  this.name = result.data.card_faces[0].name
                } else {
                  this.name = result.data.name
                }

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