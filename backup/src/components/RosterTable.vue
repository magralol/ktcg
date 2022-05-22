<template>

    <table class="table">
        <thead>
            <tr>
            <th scope="col">Operative</th>
            <th scope="col">M</th>
            <th scope="col">APL</th>
            <th scope="col">GA</th>
            <th scope="col">DF</th>
            <th scope="col">SV</th>
            <th scope="col">W</th>
            <th scope="col">Weapons</th>
            <th scope="col">Abilities</th>
            <th scope="col">Equipments</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="operative in store.roster.operatives">
                <th scope="row">{{ operative.name }}</th>
                <td>{{ operative.m }}</td>
                <td>{{ operative.apl }}</td>
                <td>{{ operative.ga }}</td>
                <td>{{ operative.df }}</td>
                <td>{{ operative.sv }}</td>
                <td>{{ operative.w }}</td>
                <td>
                    <a href="#" v-for="weapon in operative.weapons">
                        <span v-show="weapon.type == 'range'">⌖</span>
                        <span v-show="weapon.type == 'melee'">⚔</span>
                        {{ weapon.name }}
                        <br>
                    </a>
                </td>
                <td>
                    <a href="#">Manifest Psychic Power (1AP)</a>
                </td>
                <td></td>
            </tr>
    </tbody>
</table>


</template>

<script setup>

    import { Store } from '../store';
    const store = Store();

</script>

<style scoped>
</style>
