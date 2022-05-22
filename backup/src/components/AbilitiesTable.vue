<template>
    
    <div class="row row-cols-3 g-2">
        <div class="card col" style="width: 18rem;" v-for="ability in store.roster.abilities">
            <div class="card-body">
                <h5 class="card-title">{{ ability.name }}<span class="float-right" v-if="ability.cost">({{ ability.cost }}AP)</span></h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ ability.type }}</h6>
                <p v-if="ability.description">{{ ability.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { Store } from '../store';
    const store = Store();

</script>

<style scoped>
</style>
