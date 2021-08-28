import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import Home from './components/Home.vue';
import Print from './components/Print.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/print', component: Print },
    ],
});

const app = createApp(App);
app.use(router);
app.mount('#app');
