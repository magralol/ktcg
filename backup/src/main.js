import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import presistStore from './presistStore';

import App from './App.vue';
import HomePage from './pages/Home.vue';
import RostersPage from './pages/Rosters.vue';
import RosterPage from './pages/Roster.vue';
import OperativeForm from './pages/OperativeForm.vue';
import NewEntryPage from './pages/NewEntry.vue';
import PrintPage from './pages/Print.vue';
import Home from './components/Home.vue';
import Print from './components/Print.vue';
import Icon from './pages/Icon.vue';

const store = createPinia();
store.use(presistStore);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/rosters', component: RostersPage },
        { path: '/roster/:id', component: RosterPage },
        { path: '/roster/:rosterid/operative/:operativeid?', component: OperativeForm },
        { path: '/print/:rosterid?', component: PrintPage },
        { path: '/new/:type', component: NewEntryPage },
        { path: '/legacy/card-builder', component: Home },
        { path: '/legacy-print', component: Print },
        // this is just for development off icons
        { path: '/icon', component: Icon },
    ],
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
