<script>
    import axios from "axios";
    export default {
        name: "SearchedComponent",
        props: ['search'],
        data(){
            return{
                list_card: []
            }
        },
        mounted(){
            this.searchAuto()
        },
        methods:{
            async searchAuto(){
                axios.get('https://api.scryfall.com/cards/autocomplete?q=' + this.search).then(
                    (result) => {
                    for ( let i=0; i<result.data.total_values; i++){
                        console.log(i)
                        axios.get('https://api.scryfall.com/cards/named?fuzzy=' + result.data.data[i]).then(
                        (resultats) => {
                            console.log(resultats.data.name)
                            this.list_card.push(resultats)
                            console.log(this.list_card)
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
        <div v-for="card in list_card" :key="card.data.image_uris.png" class="card_img card_grid">
            <span>
                <RouterLink :to="{ name: 'card_page', params: { nom:card.data.name }}"  ><img :src ="card.data.image_uris.png" ></RouterLink>
            </span>
            <span class="card_infos">
                <div class="card_info">Nom : <span id="nom">{{ card.data.name }}</span> </div>
                <div v-if=" card.data.mana_cost != 0" class="card_info">Mana Cost : {{ card.data.mana_cost }}</div>
                <div class="card_info">Type : {{ card.data.type_line }}</div>
                <div v-if="card.data.oracle_text != ''" class="card_info">Text : {{ card.data.oracle_text }}</div>
                <div v-if=" card.data.power != undefined" class="card_info">Power : {{ card.data.power }}</div>
                <div v-if=" card.data.power != undefined" class="card_info">Toughness : {{ card.data.toughness }}</div>
            </span>
            
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