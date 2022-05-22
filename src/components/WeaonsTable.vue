<template>

    <table class="table">
        <thead>
            <tr>
            <th scope="col">Name</th>
            <th scope="col">A</th>
            <th scope="col">BS/WS</th>
            <th scope="col">D</th>
            <th scope="col">SR</th>
            <th scope="col">!</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="weapon in store.roster.weapons">
                <th scope="row">
                    <span v-show="weapon.type == 'range'">⌖</span>
                    <span v-show="weapon.type == 'melee'">⚔</span>
                    {{ weapon.name }}
                </th>
                <td>{{ weapon.a }}</td>
                <td>{{ weapon.bsws }}</td>
                <td>{{ weapon.d }}</td>
                <td>{{ weapon.sr }}</td>
                <td>{{ weapon.crit }}</td>
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
