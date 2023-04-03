import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import axios from "axios";
import VueAxios from "vue-axios";

import './assets/main.css'

// J'importe mes composants
import IndexComponent from "@/components/IndexComponent.vue";
import CardComponent from "@/components/CardComponent.vue";
import RandomComponent from "@/components/RandomComponent.vue";
import ArtGameComponent from "@/components/ArtGameComponent.vue";
import SearchedComponent from "@/components/SearchedComponent.vue"

const routes = [
    {path: '/', name:'homepage', component: IndexComponent},
    {path: '/random', name:'randomCard', component: RandomComponent},
    {path: '/card/:nom', name:'card_page', component: CardComponent, props: true},
    {path: '/art-game', name: 'art-game', component: ArtGameComponent},
    {path: '/searched/:search', name: 'searched', component: SearchedComponent, props: true}
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);

app.use(router, VueAxios, axios)

app.mount('#app')
