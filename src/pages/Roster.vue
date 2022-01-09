<template>
<!--
    <h1>Dashboard</h1>
    <button @click="log">{{ store.count }}</button>

-->
    <br><br>
    <ul class="nav nav-tabs col-md-12">
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tab == 'operatives' }" href="#" @click="tab = 'operatives'">Operatives</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tab == 'weapons' }" href="#" @click="tab = 'weapons'">Weapons</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tab == 'abilities' }" href="#" @click="tab = 'abilities'">Abilities</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tab == 'equipments' }" href="#" @click="tab = 'equipments'">Equipments</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tab == 'ploys' }" href="#" @click="tab = 'ploys'">Ploys</a>
        </li>
        <li class="float-right">
            <div class="btn-group">
                <button type="button" class="btn btn-primary" @click="goToNewForm(tab)">New</button>
                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Import</a></li>
                    <li><a class="dropdown-item" href="#">Export</a></li>
                    <li><a class="dropdown-item" href="#">Print</a></li>
                </ul>
            </div>
        </li>
    </ul>
    <div class="card" style="border-top: 0px;">
        <div class="card-body">
            
           <RosterTable v-show="tab=='operatives'" />
           <WeaponsTable v-show="tab=='weapons'" />
           <AbilitiesTable v-show="tab=='abilities'" />


        </div>
    </div>
    


</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { Store } from '../store';
    import RosterTable from '../components/RosterTable.vue';
    import WeaponsTable from '../components/WeaonsTable.vue';
    import AbilitiesTable from '../components/AbilitiesTable.vue';

    const router = useRouter();
    const store = Store();

    let tab = "operatives";

    function goToNewForm(tab) {
        router.push({ path: `/new/${tab.substring(0, tab.length - 1)}` });
    }
</script>

<style scoped>
.float-right {
    margin-left: auto;
    order: 2;
}
</style>
