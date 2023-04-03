
  <script>
  import { stringifyExpression } from "@vue/compiler-core";
import axios from "axios";
import { routerKey } from "vue-router";
  
  export default {
    name: "CardComponent",
    data(){
      return {
        //names
        name : "",
        name1: "",
        //mana_costs
        mana_cost : 0,
        mana_cost1: 0,
        //Set
        set : "",
        //types
        type : "",
        type1: "",
        //text
        text : "",
        text1 : "",
        //power
        power : 0,
        power1 : 0,
        //toughness
        toughness : 0,
        toughness1 : 0,
        //imgs
        img: "",
        img1: "",
        affimg: "",
        //layout
        layout: "",
        //choix de l'image a afficher
        which_card : 1,
      }
    },
    props: ['nom'],
    mounted(){
      this.setup()
    },
    methods:{
      async setup(){
        // this.getNom()
        this.getCard(this.nom)
      },
      // async getNom(){
      //   var nom = document.getElementById('nom').firstChild.nodeValue
      // },
      async getCard(needed){
        axios.get('https://api.scryfall.com/cards/named', {params: {exact : needed}}).then(
            (result) => {
              this.layout = result.data.layout
              this.set = result.data.set
              this.getSet(this.set)
              // verifie layout de la carte pour bonne recup d'infos
              if (this.layout == 'split' || this.layout == 'flip' || this.layout == 'transform' || this.layout == 'modal_dfc' || this.layout == 'adventure'){
                //recup infos
                //name
                this.name = result.data.card_faces[0].name
                this.name1 = result.data.card_faces[1].name
                //text
                this.text = result.data.card_faces[0].oracle_text
                this.text1 = result.data.card_faces[1].oracle_text
                //cmc
                this.mana_cost = result.data.card_faces[0].mana_cost
                this.mana_cost1 = result.data.card_faces[1].mana_cost
                //types
                this.type = result.data.card_faces[0].type_line
                this.type1 = result.data.card_faces[1].type_line
                //power
                this.power = result.data.card_faces[0].power
                this.power1 = result.data.card_faces[1].power
                //toughness
                this.toughness = result.data.card_faces[0].toughness
                this.toughness1 = result.data.card_faces[1].toughness
                //img
                // pour cartes a double cartes sur une face
                if(this.layout == 'split' || this.layout == 'flip' || this.layout == 'adventure'){
                  this.img = result.data.image_uris.png
                  this.affimg = this.img
                } else {
                  // pour les cartes a double face
                  this.img = result.data.card_faces[0].image_uris.png
                  this.img1 = result.data.card_faces[1].image_uris.png
                  this.affimg = this.img
                }
              } else {
                // pour les cartes ne necessitant pas de gestion differente

                this.name = result.data.name
                this.text = result.data.oracle_text
                this.mana_cost = result.data.mana_cost
                this.type = result.data.type_line
                this.power = result.data.power
                this.toughness = result.data.toughness
                this.img = result.data.image_uris.png
                this.affimg = this.img
              }
              
            }
        )
      },
      // recuperation du set en nom complet
      async getSet(set){
        axios.get('https://api.scryfall.com/sets/'+ set).then(
        (setResult) => {
          this.set = setResult.data.name
        }
      )
      },
      // fonction pour changer image de cartes a double face
      transform(){
        if (this.which_card == 1){
          this.affimg = this.img1
          this.which_card = 2 
        } else {
          this.affimg = this.img
          this.which_card = 1
        }
            
      },
        //https://scryfall.com/docs/api/card-symbols/all
        //https://scryfall.com/docs/api/colors
      // async analyseManaCost(mana_cost){
      //   const regex = '\{[\w/]*}'
      //   for ( let i = 0; i< mana_cost.lenght; i++){
      //     mana_cost.replace()
      //   }
        /*
      //   lire string
      //   reperer regex   
      //   https://stackoverflow.com/questions/52424306/add-html-element-in-div-vuejs
      //   ajouter symbol dans ?
      //   supprimer symbol de string        
        
      //   */
      // }
    }
  }
  </script>
  <template>

    <div class="card_grid">
      <span class="img">
        //image de la carte
        <img :src="this.affimg"/>
        <!-- si layout a 2 faces : ajouter un bouton pour la retourner -->
        <div v-if="this.layout == 'transform' || this.layout == 'modal_dfc'" class="transform">
          <button @click="$event => transform()"> Transform</button>
      
        </div>
      </span>
      <!-- affichage infos carte normale -->
      <span class="card_infos">
        <div class="card_info">Nom : <span id="nom">{{ this.name }}</span> </div>
        <div v-if=" this.mana_cost != 0" class="card_info">Mana Cost : {{ this.mana_cost }}</div>
        <div class="card_info">Type : {{ this.type }}</div>
        <div v-if="this.text != ''" class="card_info">Text : {{ this.text }}</div>
        <div v-if=" this.power != undefined" class="card_info">Power : {{ this.power }}</div>
        <div v-if=" this.toughness != undefined" class="card_info">Toughness : {{ this.toughness }}</div>
        <div class="card_info">Set : {{ this.set }}</div>
        <!-- affichage pour les cartes necessitant une gestion differente-->
        <div v-if="this.layout == 'split' || this.layout == 'flip' || this.layout == 'transform' || this.layout == 'modal_dfc' || this.layout == 'adventure'" class="card_info card_2">
          <!-- nom -->
          <div class="card_info"> Nom alt : <span id="nom">{{ this.name1 }}</span></div>
          <!-- mana cost -->
          <div v-if=" this.mana_cost1 != 0" class="card_info">Mana Cost alt : {{ this.mana_cost1 }}</div>
          <!-- set -->
          <div class="card_info">set : {{ this.set }}</div>
          <!-- type -->
          <div class="card_info">Type : {{ this.type1 }}</div>
          <!-- oracle_text -->
          <div v-if="this.text1 != ''" class="card_info">Text alt : {{ this.text1 }}</div>
          <!-- power -->
          <div v-if=" this.power1 != undefined" class="card_info">Power : {{ this.power1 }}</div>
          <!-- toughness -->
          <div v-if=" this.toughness1 != undefined" class="card_info">Toughness : {{ this.toughness1 }}</div>
        
        </div>
      </span>
    </div>
    <!-- <div class= "card-symbol-R">&nbsp;</div> -->
    
    
  </template>
  
  <style scoped>
  /* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_flip_card */

  img {
    height: 500px;
    width: auto;
    grid-column: 1;
  }
  .img{
    margin-top: 10%;
  }

  .card_infos{
    display: flex;
    flex-direction:column;
    max-width: 25vw;
    grid-column: 2;
    padding-top: 10%;
  }

  .card_info{
    margin-top: 2%;
  }

  .card_2 {
    margin-top: 15%;
  }

  .card_grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2.5%;
    padding: 15px 5%;
  }

  .transform{
    margin-left: 28%;
  }
/* .card-symbol-R{
    width: 15px;
    height: 15px;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdC b3g9JzAgMCAxMDAgMTAwJz48ZyBmaWxsPSdub25lJz48Y2lyY2xlIGZpbGw9 JyNFNDk5NzcnIGN4PSc1MCcgY3k9JzUwJyByPSc1MCcvPjxwYXRoIGQ9J005 MS45NjUgNjYuNjE3Yy0zLjczNiA4LjkxMi0xMS4xNiAxMy4zNjctMjIuMjc1 IDEzLjM2Ny0yLjAzNyAwLTQuMjQ2LjI1NC02LjYyMS43NjItMy41NjQuNzY0 LTUuMzQ2IDEuODI4LTUuMzQ2IDMuMTg2IDAgLjQyNC4yOTUuOTEuODkxIDEu NDYzLjU5Mi41NTMgMS4xMDQuODI2IDEuNTI3LjgyNi0yLjEyMyAwLS42OC4w NjQgNC4zMjYuMTkxIDUuMDA4LjEyNyA4LjE0OC4xOTEgOS40MjIuMTkxLTcu MzgzIDQuMzI2LTE5LjczMiA2LjMxOS0zNy4wNDMgNS45ODEtNS42ODgtLjA4 NC0xMC41NjYtMi41ODgtMTQuNjM5LTcuNTEtMy45OTItNC42NjktNS45ODQt OS44ODgtNS45ODQtMTUuNjU4IDAtNi4xMDggMi4wNTctMTEuMzA4IDYuMTc2 LTE1LjU5NSA0LjExMy00LjI4MiA5LjIyOS02LjQyNyAxNS4zMzgtNi40Mjcg MS4zNTcgMCAzLjE2LjI5NyA1LjQxLjg5MSAyLjI0OC41OTQgMy43NTYuODkx IDQuNTE4Ljg5MSAzLjEzOSAwIDcuMDQ1LTEuMjkzIDExLjcxMy0zLjg4MyA0 LjY2Ni0yLjU4OCA2Ljg3NS0zLjg4MyA2LjYyMS0zLjg4My0uODUgOC45MTIt My44MiAxNC44OTYtOC45MTQgMTcuOTQ4LTMuNjQ4IDIuMTIzLTUuNDczIDQu MjAxLTUuNDczIDYuMjM2IDAgMS4yNzMuNzY0IDIuMjkzIDIuMjkxIDMuMDU3 IDEuMTg4LjU5NSAyLjUwMi44OTIgMy45NDUuODkyIDIuMjA3IDAgNC4zNzEt MS4zNTYgNi40OTQtNC4wNzEgMi4xMTktMi43MTggMy4wNTUtNS4xNzcgMi44 MDEtNy4zODYtLjI1NC0yLjU0NS0uMDg0LTUuNjAzLjUxLTkuMTY0LjE2OC0x LjAyLjc4My0yLjI3IDEuODQ0LTMuNzU0IDEuMDYxLTEuNDg2IDIuMDE2LTIu Mzk4IDIuODY1LTIuNzM4IDAgLjc2Mi0uMjc1IDIuMDM3LS44MjggMy44MTgt LjU1MyAxLjc4MS0uODI2IDMuMS0uODI2IDMuOTQ3IDAgMS44NjcuNTA4IDMu MzA5IDEuNTI3IDQuMzI2IDEuNTI1LS41OTIgMi44ODMtMi41MDIgNC4wNzQt NS43MjkgMS4wMTYtMi40NTkgMS42MDktNC44MzYgMS43ODEtNy4xMjctMy41 NjYtLjE3LTYuOTgyLTEuNzgxLTEwLjI0OC00LjgzOC0zLjI2OC0zLjA1Ny00 LjktNi4zNjUtNC45LTkuOTI4IDAtLjU5NC4wODItMS4xODguMjU2LTEuNzgz LjUwOC43NjQgMS4yNzEgMS45NTMgMi4yODkgMy41NjQgMS40NDMgMi4xMjEg Mi41NDcgMy4xODIgMy4zMTMgMy4xODIgMS4wMTYgMCAxLjUyNS0xLjA2MSAx LjUyNS0zLjE4MiAwLTIuNzE1LS43MjMtNS4xNzYtMi4xNjQtNy4zODMtMS42 MTMtMi42MzEtMy42OTMtMy45NDctNi4yMzgtMy45NDctMS4xODkgMC0yLjk3 MS42MzctNS4zNDQgMS45MS0yLjM3OSAxLjI3MS00LjU0MyAxLjkxLTYuNDky IDEuOTEtLjU5NiAwLTMuMjI5LS43NjYtNy44OTUtMi4yOTMgOC4yMy0xLjM1 NSAxMi4zNDgtMi41ODYgMTIuMzQ4LTMuNjkxIDAtMi44ODUtNS42NDUtNC44 MzgtMTYuOTMtNS44NTUtMS4xMDUtLjA4NC0zLjE0MS0uMjU0LTYuMTExLS41 MS4zMzgtLjQyNCAyLjc1OC0uODkxIDcuMjU4LTEuNCAzLjgxOC0uNDIyIDYu NDkyLS42MzcgOC4wMTgtLjYzNyAyMC4xOTcgMCAzMy4wMTIgOS44MDUgMzgu NDQzIDI5LjQwOC45MzQtLjc3MyAxLjQwMi0yLjA2NiAxLjQwMi0zLjg3MSAw LTIuMzI0LS42OC01LjI1LTIuMDM3LTguNzc3LS41MTItMS4zNzUtMS4zMTgt My40NDEtMi40Mi02LjE5MyA2Ljk1NyA4Ljg2NyAxMC40MzkgMTcuMjcgMTAu NDM5IDI1LjE5OSAwIDQuMTc4LS45NzkgNy45NzMtMi45MyAxMS4zODEtMS4y NyAyLjMwMy0zLjY1IDUuMjQ0LTcuMTI3IDguODI2LTMuNDggMy41OC01Ljg1 NyA2LjM1Mi03LjEzMSA4LjMxMyA0LjY2OC0xLjI3MSA3LjcyNS0yLjI0OCA5 LjE2OC0yLjkyOCAzLjIyMy0xLjQ0IDYuMTUtMy42MDYgOC43ODMtNi40OTIg MCAxLjEwNi0uNDY3IDIuNzYyLTEuNCA0Ljk2N3ptLTU1LjUwMi01MC4wMjVj MCAxLjUyNS0uODUgMi41MDItMi41NDUgMi45MjZsLTMuMzExLjUxYy0xLjE4 OS41OTQtMi45MjggMi45MjgtNS4yMTkgNy0uMjU2LTEuMjcxLS42MzctMy4w NTMtMS4xNDYtNS4zNDYtLjc2NC4wODYtMi4wMzUuNzY0LTMuODE4IDIuMDM3 LS43NjQuNTk0LTEuOTk2IDEuNDg0LTMuNjkzIDIuNjcyLjUxMi0zLjA1NSAy LjIwNy02LjE0OCA1LjA5NC05LjI5MyAzLjA1NS0zLjQ3NyA2LjAyNS01LjIx NyA4LjkxLTUuMjE3IDMuODE4IDAgNS43MjggMS41NzIgNS43MjggNC43MTF6 bTIyLjE1IDExLjcwOWMwIDEuNDQzLS43ODUgMi42NTQtMi4zNTUgMy42Mjkt MS41Ny45NzctMy4xMTkgMS40NjUtNC42NDYgMS40NjUtMi4wMzcgMC0zLjg2 My0xLjE0Ni01LjQ3My0zLjQzOC0xLjk1NS0yLjgwMS0zLjk0Ny00LjYyNS01 Ljk4NC01LjQ3Ny40MjQtLjQyMi45MzQtLjYzNSAxLjUyOS0uNjM1Ljc2NCAw IDIuMDU1LjU5NCAzLjg4MSAxLjc4MSAxLjgyNCAxLjE4OSAyLjk5IDEuNzgz IDMuNTAyIDEuNzgzLjQyNCAwIDEuMTIzLS41OTQgMi4xLTEuNzgzLjk3NS0x LjE4OCAyLjA1Ny0xLjc4MSAzLjI0Ni0xLjc4MSAyLjguMDAxIDQuMiAxLjQ4 NyA0LjIgNC40NTZ6JyBmaWxsPScjMEQwRjBGJy8+PC9nPjwvc3ZnPgo= ");
  } */
  </style>