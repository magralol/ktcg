<template>
    <div>
        <label for="weapon-name" class="form-label">Name</label>
        <input type="text" class="form-control" id="weapon-name" v-model="weapon.name" placeholder="">

        <br>

        <select class="form-select" v-model="weapon.type">
            <option value="range">Range</option>
            <option value="melee">Melee</option>
        </select>

        <br>

        <div class="row row-cols-3">
            <div class="col">
            <label for="weapon-attack" class="form-label">A</label>
            <input type="number" class="form-control" id="weapon-attack" v-model="weapon.A" placeholder="">      
            </div>
            <div class="col">
            <label for="weapon-bs-ws" class="form-label">BS/WS</label>
            <input type="number" class="form-control" id="weapon-bs-ws" v-model="weapon.BSWS" placeholder="">
            </div>
            <div class="col">
            <label for="weapon-damage" class="form-label">D</label>
            <input type="number" class="form-control" id="weapon-damage" v-model="weapon.D" placeholder=""> 
            </div>
        </div>

        <br>

        <label for="weapon-sr" class="form-label">SR</label>
        <input type="text" class="form-control" id="weapon-sr" v-model="weapon.SR" placeholder="">

        <br>

        <label for="weapon-crit" class="form-label">!</label>
        <input type="text" class="form-control" id="weapon-crit" v-model="weapon.CRIT" placeholder="">

        <div class="d-grid gap-2 mt-4 d-block">
            <button class="btn btn-primary" type="button" @click="save()">Save</button>
            <button v-show="isUpdate(props.data)" class="btn btn-danger" type="button" @click="emit('remove', 'weapon')">Remove</button>
        </div>
    </div>

</template>

<script setup>
    import { ref, watch, defineExpose, defineProps } from 'vue';
    import { Store } from '../store';

    const emit = defineEmits(["save", "remove"]);
    const props = defineProps(["data"]);
    const store = Store();

    const newForm = ref(true);

    let weapon = ref({
        name: "",
        A: "",
        type:"range",
        BSWS: "",
        D: "",
        SR: "",
        CRIT: ""
    });

    if(isUpdate(props.data))
        weapon.value = props.data;

    watch(() => props.data, (newVal) => {
        if(isUpdate(newVal))
            weapon.value = newVal;
    });

    function isUpdate(data) {
        return (Object.keys(data).length > 0);
    }

    function save() {
        emit('save', "weapon", isUpdate(props.data), weapon.value);
    }

    function newWeapon() {
        store.addWeapon(props.rosterId, weapon.value);
        weapon.value = {
            name: "",
            A: "",
            type:"range",
            BSWS: "",
            D: "",
            SR: "",
            CRIT: ""
        }
        emit('onComplete', store.getWeapons(props.rosterId).length);
    }

    function updateWeapon(){
        store.getWeapon(props.rosterId, weapon.value);
        emit('onComplete', props.weaponId);
    }

    function removeWeapon(){
        store.removeWeapon(props.rosterId, weapon.value);
        emit('onComplete', props.weaponId);
    }

</script>

<style scoped>
</style>
