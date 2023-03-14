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
    min-width: 85vw;
    padding-left: 10%;
    border-bottom: 1px solid black;
    background-color: #402e75;
  }
.page{
  padding: 2% 5%;
}
</style>
