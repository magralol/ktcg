import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import App from './App.vue';
import HomePage from './pages/Home.vue';
import RosterPage from './pages/Roster.vue';
import NewEntryPage from './pages/NewEntry.vue';
import Home from './components/Home.vue';
import Print from './components/Print.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/roster', component: RosterPage },
        { path: '/new/:type', component: NewEntryPage },
        { path: '/card-builder', component: Home },
        { path: '/print', component: Print },
    ],
});

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
