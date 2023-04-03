<script>
export default {
  name: 'FooterComponent'
}
</script>

<template>
  <footer>
    Ceci est mon footer
  </footer>
</template>


<style>
footer {
  display: block;
  position: fixed;
  bottom: 0%;
  margin-top: 50px;
}

@media (max-width : 1024px){
  footer{
    position: relative;
  }
}
</style>