<script>
export default {
  name: 'HeaderComponent'
}
</script>

<template>
  <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/random">Random card</router-link>
      <router-link :to="{name: 'art-game'}">Art Game</router-link>
  </nav>
</template>

<style>
  nav{
    display: flex;
    justify-content: center;
    position: sticky;
    min-width: 50vw;
    min-height: 4.5vh;
  }
  a{
    margin-left: 5%;
    padding-left: 5%;
    padding-right: 5%;
    align-self: center;
    text-decoration: none;
    color:aliceblue
  }
  
  
  @media (max-width : 1024px){
    nav{
      min-width: 60vw;
    }
  }
  @media (max-width : 768px){
    nav{
      min-width: 50vw;
    }
  }
  @media (max-width : 425px){
    nav{
      display: flex;
      flex-direction: column;
    }
  }
  
</style>