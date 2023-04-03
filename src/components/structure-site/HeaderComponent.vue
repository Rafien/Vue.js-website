<script>
export default {
  name: 'HeaderComponent'
}
</script>

<template>
  <!-- navigation -->
  <nav>
      <router-link to="/" class="nav-link">Accueil</router-link>
      <!-- router vers Random Card -->
      <router-link to="/random" class="nav-link">
        <!-- tentative ajout de svg -->
        <!-- <svg width="18" height="18" viewBox="0 0 30 30" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.594 18.406l3.594 3.594h-6.188l-.341-.034c-.229.655-.569 1.256-.997 1.786.421.151.867.248 1.338.248h6.188l-3.594 3.594 1.406 1.406 6-6-6-6-1.406 1.406zm3.594-10.406l-3.594 3.594 1.406 1.406 6-6-6-6-1.406 1.406 3.594 3.594h-6.188c-2.2 0-4 1.8-4 4v10c0 1.103-.897 2-2 2h-10v2h10c2.2 0 4-1.8 4-4v-10c0-1.103.896-2 2-2h6.188zm-11.848.034c.229-.654.565-1.258.993-1.787-.419-.15-.864-.247-1.333-.247h-10v2h10l.34.034z">
          </path>
        </svg> -->
        Random card</router-link>
        <!-- router vers Art-Game -->
      <router-link :to="{name: 'art-game'}" class="nav-border-right nav-link">Art Game</router-link>
  </nav>
</template>

<style>
  nav{
    display: flex;
    justify-content: center;
    position: sticky;
    min-width: 50vw;
    
  }
  .nav-link{
    min-height: 3.5vh;
    padding-top: 1.25%;
    padding-left: 5%;
    padding-right: 5%;
    align-self: center;
    text-decoration: none;
    color:#fffffe;
    border-left: solid 0.5px rgba(48, 52, 54, 0.4);
    
  }
  .nav-border-right{
    border-right: solid 0.5px rgba(48, 52, 54, 0.4);
  }
  
  
  /* @media (max-width : 1024px){
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
  @media (min-width : 2560px){
    a {
      padding-top: 3%;
      font-size:x-large;
    }
  } */
  
</style>