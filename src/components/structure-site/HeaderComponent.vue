<script>
export default {
  name: 'HeaderComponent'
}
</script>

<template>
  <nav>
    <ul class="liste_nav">
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/random">Random card</router-link></li>
      <li><router-link :to="{name: 'card_page', params:{nom: 'Queen Kayla bin-Kroog'}}">Queen Kayla</router-link></li>
      <li><router-link :to="{name: 'card_page', params:{nom: 'Omniscience'}}">Omniscience</router-link></li>
      <li><router-link :to="{name: 'art-game'}">Art Game</router-link></li>
    </ul>
  </nav>
</template>

<style>
  nav{
    display: block;
    justify-content: center;
    position: sticky;
    min-width: 50vw;
  }
  .liste_nav{
    display: flex;
    flex-direction: row;
  }
  li{
    margin-left: 5%;
  }
  
  
  @media (max-width : 1024px){
    nav{
      min-width: 60vw;
    }
    .liste_nav{
      flex-direction: row;
    }
  }
  @media (max-width : 768px){
    nav{
      min-width: 50vw;
    }
    .liste_nav{
      flex-direction: row;
    }
  }
  @media (max-width : 425px){
    .liste_nav{
      flex-direction: column;
    }
  }
  
</style>