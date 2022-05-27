import { createPinia } from 'pinia';

export default defineNuxtPlugin(app => {
    
    app.vueApp.use(createPinia());

});
  