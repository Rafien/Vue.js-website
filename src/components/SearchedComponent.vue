<script>
    import axios from "axios";
    export default {
        name: "SearchedComponent",
        //recup props
        props: ['search'],
        //setup liste de cartes a afficher
        data(){
            return{
                list_card: []
            }
        },
        mounted(){
            this.searchAuto()
        },
        methods:{
            // fonction qui renvoie dans une liste les 20 premieres cartes ayant la recherche dans leur nom
            async searchAuto(){
                //tape l'api en auto-complete ( renvoie 20 premeirs)
                axios.get('https://api.scryfall.com/cards/autocomplete?q=' + this.search).then(
                    (result) => {
                        // boucle pour chaque carte
                    for ( let i=0; i<result.data.total_values; i++){
                        // tape l'api pour recup la carte exact
                        axios.get('https://api.scryfall.com/cards/named?fuzzy=' + result.data.data[i]).then(
                        (resultats) => {
                            //ajoute la carte dans la liste
                            this.list_card.push(resultats)
                        }
                    )
                }
        }
      )
    }
    }

    
    }
</script>

<template>
    <!-- cree une div pour chaque carre dans ma liste -->
        <div v-for="card in list_card">
            <!-- verifie le layout pour bonne recup de données dans la liste -->
                <div class="card_grid" v-if="card.data.layout == 'modal_dfc' || card.data.layout == 'transform' || card.data.layout == 'flip'">
                    <!-- cree une image avec l'image de la carde-->
                    <span class="card_img">
                        <RouterLink :to="{ name: 'card_page', params: { nom:card.data.card_faces[0].name }}"  ><img :src ="card.data.card_faces[0].image_uris.png" ></RouterLink>
                        
                    </span>
                    <!-- cree des div pour chaque info de la carte -->
                    <span class="card_infos">
                        <div class="card_info">Nom : <span id="nom">{{ card.data.card_faces[0].name }}</span> </div>
                        <div v-if=" card.data.card_faces[0].mana_cost != 0" class="card_info">Mana Cost : {{ card.data.card_faces[0].mana_cost }}</div>
                        <div class="card_info">Type : {{ card.data.card_faces[0].type_line }}</div>
                        <div v-if="card.data.card_faces[0].oracle_text != ''" class="card_info">Text : {{ card.data.card_faces[0].oracle_text }}</div>
                        <div v-if=" card.data.card_faces[0].power != undefined" class="card_info">Power : {{ card.data.card_faces[0].power }}</div>
                        <div v-if=" card.data.card_faces[0].toughness != undefined" class="card_info">Toughness : {{ card.data.card_faces[0].toughness }}</div>
                    </span>
                </div>
                <!-- cartes ne neccessitant pas de gestion differente -->
                <div v-else class="card_grid">
                    <!-- cree une image avec l'image de la carte -->
                    <span class="card_img">
                        <RouterLink :to="{ name: 'card_page', params: { nom:card.data.name }}"  ><img :src ="card.data.image_uris.png" ></RouterLink>
                        
                    </span>
                    <!--  cree des div pour chaque info de la carte -->
                    <span class="card_infos">
                        <div v-if="card.data.layout !== 'adventure' && card.data.layout !== 'split'" class="card_info">Nom : <span id="nom">{{ card.data.name }}</span> </div>
                        <div v-if="card.data.layout == 'adventure' || card.data.layout == 'split'" class="card_info">Nom : {{ card.data.card_faces[0].name }}</div>
                        <div v-if="card.data.mana_cost != 0 && card.data.layout !== 'adventure' && card.data.layout !== 'split'" class="card_info">Mana Cost : {{ card.data.mana_cost }}</div>
                        <div v-if="card.data.layout == 'adventure' || card.data.layout == 'split'" class="card_info">Mana Cost : {{ card.data.card_faces[0].mana_cost }}</div>
                        <div v-if="card.data.layout !== 'adventure' && card.data.layout !== 'split'" class="card_info">Type : {{ card.data.type_line }}</div>
                        <div v-if="card.data.layout == 'adventure' || card.data.layout == 'split'" class="card_info">Type :  {{ card.data.card_faces[0].type_line }}</div>
                        <div v-if="card.data.oracle_text != '' && card.data.layout !== 'adventure' && card.data.layout !== 'split'" class="card_info">Text : {{ card.data.oracle_text }}</div>
                        <div v-if="card.data.layout == 'adventure' || card.data.layout == 'split'" class="card_info">Text : {{ card.data.card_faces[0].oracle_text }}</div>
                        <div v-if=" card.data.power != undefined" class="card_info">Power : {{ card.data.power }}</div>
                        <div v-if=" card.data.power != undefined" class="card_info">Toughness : {{ card.data.toughness }}</div>
                    </span>
                </div>
            
            
            
        </div>

</template>

<style>
    img {
        height: 500px;
        width: auto;
        grid-column: 1;
    }

    .card_img{
        padding: 2%;
        border-bottom: solid 0.5px #402e75;
    }
    .card_infos{
        display: flex;
        flex-direction:column;
        max-width: 25vw;
        grid-column: 2;
        margin-top: 20%;
    }
    .card_info{
        margin-top: 2%;
    }
    .card_grid{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2.5%;
        padding: 15px 5%;
    }
</style>