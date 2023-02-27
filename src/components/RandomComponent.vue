
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
      console.log('all')
      axios.get('https://api.scryfall.com/cards/random').then(
          (result) => {
              this.name = result.data.name,
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