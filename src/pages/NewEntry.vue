<template>
    <div style="max-width: 500px; margin:0 auto;">
        <br>
        <h1 style="text-align:center;">Create a new {{ route.params.type }}</h1>

        <div class="card">
        <div class="card-body">
            <OperativeForm v-if="route.params.type=='operative'"/>
            <WeaponForm v-if="route.params.type=='weapon'"/>
        </div>
        </div>
        <br>
        <button class="btn btn-primary float-end">Create</button>
    </div>
</template>

<script setup>
   import { useRoute } from 'vue-router'
   import OperativeForm from "../components/OperativeForm.vue";
   import WeaponForm from "../components/WeaponForm.vue";

    const route = useRoute();

</script>

<style scoped>

</style>

