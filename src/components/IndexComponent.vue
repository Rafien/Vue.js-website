<template>
  <ul>
    <li><router-link :to="{name: 'card_page', params:{nom: 'Queen Kayla bin-Kroog'}}">Queen Kayla (creature)</router-link></li>
    <li><router-link :to="{name: 'card_page', params:{nom: 'Omniscience'}}">Omniscience (non-creature)</router-link></li>
    <li><router-link :to="{name: 'card_page', params:{nom: 'Assure'}}">Assure // Assemble (split-cards)</router-link></li>
    <li><router-link :to="{name: 'card_page', params:{nom: 'Love struck beast'}}">Love struck beast (adventure-card)</router-link></li>
    <li><router-link :to="{name: 'card_page', params:{nom: 'Extus, Oriq Overlord'}}">Extus, Oriq Overlord // Awaken the Blood Avatar (transform-card)</router-link></li>
  </ul>
</template>

<script>
export default {
  name: "IndexComponent"
}
</script>

<style scoped>
  a{
    text-decoration: none;
    color : white
  }
</style>