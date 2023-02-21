
<script>
import axios from "axios";

export default {
  name: "RandomComponent",
  data(){
    return {
      name : "",
      mana_cost : 0,
      set : "",
      coll_num : 0,
      type : "",
      text : "",
      power : 0,
      toughness : 0,
      img: "",
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