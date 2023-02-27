<template>
  <ul>
    <li><router-link :to="{name: 'card_page', params:{nom: 'Queen Kayla bin-Kroog'}}">Queen Kayla</router-link></li>
    <li><router-link :to="{name: 'card_page', params:{nom: 'Omniscience'}}">Omniscience</router-link></li>
  </ul>>
</template>

<script>
export default {
  name: "IndexComponent"
}
</script>

<style scoped>

</style>