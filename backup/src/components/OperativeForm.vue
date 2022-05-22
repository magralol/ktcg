<template>
    
    <label for="card-name" class="form-label">Name</label>
    <input type="text" class="form-control" id="card-name" v-model="operative.name" placeholder="">
    <hr>
    <div class="row row-cols-3">
    <div class="col">
        <label for="card-moment" class="form-label">M</label>
        <input type="text" class="form-control" id="card-moment" v-model="operative.m" placeholder="">      
    </div>
    <div class="col">
        <label for="card-action-points" class="form-label">APL</label>
        <input type="text" class="form-control" id="card-action-points" v-model="operative.apl" placeholder="">
    </div>
    <div class="col">
        <label for="card-group-activation" class="form-label">GA</label>
        <input type="text" class="form-control" id="card-group-activation" v-model="operative.ga" placeholder=""> 
    </div>

    <div class="col">
        <label for="card-defence" class="form-label">DF</label>
        <input type="text" class="form-control" id="card-defence" v-model="operative.df" placeholder="">    
    </div>
    <div class="col">
        <label for="card-save" class="form-label">SV</label>
        <input type="text" class="form-control" id="card-save" v-model="operative.sv" placeholder="">
    </div>
    <div class="col">
        <label for="card-wounds" class="form-label">W</label>
        <input type="text" class="form-control" id="card-wounds" v-model="operative.w" placeholder=""> 
    </div>

    </div>

    <hr>
    <label class="form-label" style="width:100%;">Weapons <span class="badge bg-primary" style="float: right; cursor: pointer;" @click="toggleModal('weapon')"><i class="fas fa-plus"></i></span></label>
    <table style="width:100%">
    <tr v-for="(weapon, index) in operative.weapons">
        <td>
            <span v-show="weapon.type == 'range'">⌖</span>
            <span v-show="weapon.type == 'melee'">⚔</span>
            {{ weapon.name }} {{ weapon.id }}
        </td>
        <!--<td>e</td>-->
        <td style="float: right; cursor: pointer;" v-on:click="removeWeapon(index)"><i class="fas fa-times"></i></td>
    </tr>
    </table> 


    <hr>
    <label class="form-label" style="width:100%;">Abilities <span class="badge bg-primary" style="float: right; cursor: pointer;" @click="toggleModal('ability')"><i class="fas fa-plus"></i></span></label>
    <table style="width:100%">
    <tr v-for="(ability, index) in operative.abilities">
        <td><b>{{ ability.name }}</b><small class="text-muted">({{ ability.type }})</small></td>
        <!--<td>e</td>-->
        <td style="float: right; cursor: pointer;" v-on:click="removeAbility(index)"><i class="fas fa-times"></i></td>
    </tr>
    </table>

    <hr>
    <label class="form-label" style="width:100%;">Equipments <span class="badge bg-primary" style="float: right; cursor: pointer;" v-on:click="$refs.abilityModal.toggleModal('ability')"><i class="fas fa-plus"></i></span></label>
    <table style="width:100%">
    <tr >
        <td><b></b></td>
        <!--<td>e</td>-->
        <td style="float: right; cursor: pointer;" v-on:click="removeAbility('ability', index)"><i class="fas fa-times"></i></td>
    </tr>
    </table>

    <!-- add weapon modal -->
    <div class="modal fade" id="weaponModal" tabindex="-1">
        <div class="modal-dialog modal-fullscreen-sm-down">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add {{ modalType }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: modalMode == 'existing' }" href="#" @click="modalMode = 'existing'">Existing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: modalMode == 'new' }" href="#" @click="modalMode = 'new'">New</a>
                    </li>
                </ul>
                <br>
                <ul class="list-group" v-show="modalMode == 'existing'">
                    <li v-for="storeType in store.roster[modalStoreType]" class="list-group-item" style="cursor: pointer;" @click="addType(storeType)">
                        <span v-if="modalType == 'weapon'">
                            <span v-show="storeType.type == 'range'">⌖</span>
                            <span v-show="storeType.type == 'melee'">⚔</span>
                        </span>
                        {{ storeType.name }}
                        <small v-if="modalType == 'ability'" class="text-muted">({{ storeType.type }})</small>
                    </li>
                </ul>

                <!--<WeaponForm v-show="newWeaponMode == 'new'" ref="weaponFormRef" />-->
                <component :is="formComponent" v-show="modalMode == 'new'" ref="formRef"/>

            </div>
            <div class="modal-footer" v-show="modalMode == 'new'">
                <button type="button" class="btn btn-primary" @click="addType()">Add {{ modalType }}</button>
            </div>
            </div>
        </div>
    </div>

</template>

<script setup>
    import { ref, onMounted, defineProps, defineExpose, shallowRef } from "vue";
    import { Store } from '../store';
    import WeaponForm from "../components/WeaponForm.vue";
    import AbilitiesForm from "./AbilityForm.vue";

    const props = defineProps(["operative"]);
    defineExpose({
        save,
    });
    const store = Store();
    let modal;
    let weaponFormRef = ref();

    let modalType = ref("");
    let modalStoreType = ref("");
    let modalMode = ref("existing");
    let formComponent = shallowRef();
    const formRef = ref();

    let operative = ref({
        name: "",
        m: "",
        apl:"",
        ga: "",
        df: "",
        sv: "",
        w: "",
        weapons: [],
        abilities: [],
        equipments: []
    });

    if(props.operative)
        operative.value = props.operative;

    onMounted(() => {
        modal = new bootstrap.Modal(document.getElementById('weaponModal'));
    });

    function toggleModal(type) {
        modalType.value = type;
        switch (type) {
            case "weapon":
                formComponent.value = WeaponForm;
                modalStoreType.value = "weapons";
                break;
            case "ability":
                formComponent.value = AbilitiesForm;
                modalStoreType.value = "abilities";
                break;
        }
        modal.toggle();
    }

    function addType(type) {
        if(!type){
            type = formRef.value.save();
        } 
        
        operative.value[modalStoreType.value].push(type);
        console.log(operative.value[modalStoreType.value]);

        modal.toggle();
    }

    function removeWeapon(index) {
        operative.value.weapons.splice(index, 1);
    }

    function removeAbility(index) {
        operative.value.abilities.splice(index, 1);
    }

    function save() {
        store.addOperative(operative.value);
        return operative.value;
    }

</script>

<style scoped>
</style>
