<script>

import HeaderComponent from "@/components/structure-site/HeaderComponent.vue";
import FooterComponent from "@/components/structure-site/FooterComponent.vue";
import SearchComponent from "./components/SearchComponent.vue";



export default {
  components: { HeaderComponent, FooterComponent, SearchComponent },
  
}

</script>

<template>
  <header>
    <HeaderComponent></HeaderComponent>
    <SearchComponent></SearchComponent>
  </header>
  <div class="page">
    <router-view></router-view>
  </div>


  <FooterComponent></FooterComponent>
</template>

<style>
header{
    display: flex;
    flex-direction: row;
    min-width: 100vw;
    justify-content: center;
  }
.page{
  padding: 2% 5%;
}
</style>
