<template>
<div class="container-fluid">
    <div class="header d-block d-sm-block d-md-none">
        <div class="top" style="padding: 20px;display: flex;align-content: center;justify-content: space-between;align-items: center;text-align: center;">
            <a :href="'/roster/' + route.params.rosterid"><i class="fa-solid fa-chevron-left"></i></a>
            <h5 style="flex-grow: 1;">
                <span v-if="newForm">New Operative</span>
                <span v-if="!newForm">Edit Operative</span>
            </h5>
        </div>
    </div>
    <div class="row">
        <Navbar class="d-none d-md-block">
            <li class="nav-item">
                <a v-if="newForm" class="nav-link" href="#" @click="addOperative()">Add Operative</a>
                <a v-if="!newForm" class="nav-link" href="#" @click="updateOperative()">Save Operative</a>
            </li>
        </Navbar>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
            <div class="container" style="max-width: 600px;">
                <div class="card">
                    <div class="card-body">
                    
                        <label for="card-name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="card-name" v-model="operative.name" placeholder="">
                        <br>
                        <div class="row row-cols-3">
                            <div class="col">
                                <label for="card-moment" class="form-label">M</label>
                                <input type="number" class="form-control" id="card-moment" v-model="operative.M" placeholder="">      
                            </div>
                            <div class="col">
                                <label for="card-action-points" class="form-label">APL</label>
                                <input type="number" class="form-control" id="card-action-points" v-model="operative.APL" placeholder="">
                            </div>
                            <div class="col">
                                <label for="card-group-activation" class="form-label">GA</label>
                                <input type="number" class="form-control" id="card-group-activation" v-model="operative.GA" placeholder=""> 
                            </div>
                            <div class="col mt-3">
                                <label for="card-defence" class="form-label">DF</label>
                                <input type="number" class="form-control" id="card-defence" v-model="operative.DF" placeholder="">    
                            </div>
                            <div class="col mt-3">
                                <label for="card-save" class="form-label">SV</label>
                                <input type="number" class="form-control" id="card-save" v-model="operative.SV" placeholder="">
                            </div>
                            <div class="col mt-3">
                                <label for="card-wounds" class="form-label">W</label>
                                <input type="number" class="form-control" id="card-wounds" v-model="operative.W" placeholder=""> 
                            </div>

                        </div>
                        
                        <div class="operative-form-section">
                            <p class="mt-3">Weapons <span class="badge bg-primary float-end" style="cursor:pointer" @click="add('weapon')"><i class="fa-solid fa-plus"></i></span></p>
                            <WeaponBadge v-for="(weapon, index) in operative.weapons" :name="weapon.name" :type="weapon.type" @click="update('weapon', weapon, index)"/>
                        </div>

                        <div class="operative-form-section">
                            <p class="mt-3">Abilities <span class="badge bg-primary float-end" style="cursor:pointer" @click="add('ability')"><i class="fa-solid fa-plus"></i></span></p>
                            <Badge v-for="(ability, index) in operative.abilities" :text="ability.name" @click="update('ability', ability, index)"/>
                        </div>

                        <div class="operative-form-section">
                            <p class="mt-3">Unique Actions <span class="badge bg-primary float-end" style="cursor:pointer" @click="add('uniqueAction')"><i class="fa-solid fa-plus"></i></span></p>
                            <Badge v-for="(uniqueAction, index) in operative.uniqueActions" :text="`${uniqueAction.name} (${uniqueAction.cost}AP)`" @click="update('uniqueAction', uniqueAction, index)"/>
                        </div>

                        <div class="operative-form-section">
                            <p class="mt-3">Equipments <span class="badge bg-primary float-end" style="cursor:pointer" @click="add('equipment')"><i class="fa-solid fa-plus"></i></span></p>
                            <Badge v-for="(equipment, index) in operative.equipments" :text="`${equipment.name} (${equipment.cost}EP)`" @click="update('equipment', equipment, index)"/>
                        </div>

                        <div class="d-none d-md-block mt-4 float-end">
                            <button v-if="newForm" class="btn btn-primary" type="button" @click="addOperative()">Add Operative</button>
                            <button v-if="!newForm" class="btn btn-primary" type="button" @click="updateOperative()">Save Operative</button>
                        </div>
                        <div class="d-grid gap-2 mt-4 d-block d-sm-block d-md-none">
                            <button v-if="newForm" class="btn btn-primary" type="button" @click="addOperative()">Add Operative</button>
                            <button v-if="!newForm" class="btn btn-primary" type="button" @click="updateOperative()">Save Operative</button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </div>
</div>
<!--
    <div class="d-none d-md-block">
        <Navbar />
    </div>
    <div class="container" style="max-width: 600px;">
        <br>
        <div class="card">
            <div class="card-body">
               
                <label for="card-name" class="form-label">Name</label>
                <input type="text" class="form-control" id="card-name" v-model="operative.name" placeholder="">
                <br>
                <div class="row row-cols-3">
                    <div class="col">
                        <label for="card-moment" class="form-label">M</label>
                        <input type="number" class="form-control" id="card-moment" v-model="operative.M" placeholder="">      
                    </div>
                    <div class="col">
                        <label for="card-action-points" class="form-label">APL</label>
                        <input type="number" class="form-control" id="card-action-points" v-model="operative.APL" placeholder="">
                    </div>
                    <div class="col">
                        <label for="card-group-activation" class="form-label">GA</label>
                        <input type="number" class="form-control" id="card-group-activation" v-model="operative.GA" placeholder=""> 
                    </div>
                    <div class="col mt-3">
                        <label for="card-defence" class="form-label">DF</label>
                        <input type="number" class="form-control" id="card-defence" v-model="operative.DF" placeholder="">    
                    </div>
                    <div class="col mt-3">
                        <label for="card-save" class="form-label">SV</label>
                        <input type="number" class="form-control" id="card-save" v-model="operative.SV" placeholder="">
                    </div>
                    <div class="col mt-3">
                        <label for="card-wounds" class="form-label">W</label>
                        <input type="number" class="form-control" id="card-wounds" v-model="operative.W" placeholder=""> 
                    </div>

                </div>
                
                <div class="operative-form-section">
                    <p class="mt-3">Weapons <span class="badge bg-primary float-end" style="cursor:pointer" @click="add('weapon')"><i class="fa-solid fa-plus"></i></span></p>
                    <WeaponBadge v-for="(weapon, index) in operative.weapons" :name="weapon.name" :type="weapon.type" @click="update('weapon', weapon, index)"/>
                </div>

                <div class="operative-form-section">
                    <p class="mt-3">Abilities <span class="badge bg-primary float-end" style="cursor:pointer" @click="add('ability')"><i class="fa-solid fa-plus"></i></span></p>
                    <Badge v-for="(ability, index) in operative.abilities" :text="ability.name" @click="update('ability', ability, index)"/>
                </div>

                <div class="operative-form-section">
                    <p class="mt-3">Unique Actions <span class="badge bg-primary float-end" style="cursor:pointer" @click="add('uniqueAction')"><i class="fa-solid fa-plus"></i></span></p>
                    <Badge v-for="(uniqueAction, index) in operative.uniqueActions" :text="`${uniqueAction.name} (${uniqueAction.cost}AP)`" @click="update('uniqueAction', uniqueAction, index)"/>
                </div>

                <div class="operative-form-section">
                    <p class="mt-3">Equipments <span class="badge bg-primary float-end" style="cursor:pointer" @click="add('equipment')"><i class="fa-solid fa-plus"></i></span></p>
                    <Badge v-for="(equipment, index) in operative.equipments" :text="`${equipment.name} (${equipment.cost}EP)`" @click="update('equipment', uniqueAction, index)"/>
                </div>

                <div class="d-none d-md-block mt-4 float-end">
                    <button v-if="newForm" class="btn btn-primary" type="button" @click="addOperative()">Add Operative</button>
                    <button v-if="!newForm" class="btn btn-primary" type="button" @click="updateOperative()">Save Operative</button>
                </div>
                <div class="d-grid gap-2 mt-4 d-block d-sm-block d-md-none">
                    <button v-if="newForm" class="btn btn-primary" type="button" @click="addOperative()">Add Operative</button>
                    <button v-if="!newForm" class="btn btn-primary" type="button" @click="updateOperative()">Save Operative</button>
                </div>
            </div>

        </div>
        -->
        <Modal :title="modalTitle" :show="toggleModal">
            <component :is="formComponent" :data="fromData" @save="save" @remove="remove"></component>
        </Modal>
    <!--</div>-->
</template>

<script setup>
    import { ref, onMounted, shallowRef } from "vue";
    import { useRoute, useRouter } from 'vue-router';
    import { Store } from '../store';

    import Navbar from "../components/Navbar.vue";
    import Modal from "../components/Modal.vue";
    import WeaponForm from "../components/WeaponForm.vue";
    import AbilityForm from "../components/AbilityForm.vue";
    import UniqueActionFrom from "../components/UniqueActionFrom.vue";
    import EquipmentForm from "../components/EquipmentForm.vue";
    import WeaponModal from "../components/NewWeaponModal.vue";
    import WeaponBadge from "../components/WeaponBadge.vue";
    import Badge from "../components/Badge.vue";

    const store = Store();
    const route = useRoute();
    const router = useRouter();

    const formComponent = shallowRef(null);
    const fromData = ref(null);
    const fromDataIndex = ref(null);
    const newForm = ref(true);
    const toggleModal = ref(false);
    const modalTitle = ref("");
    const weaponModalRef = ref();

    const operative = ref({
        name: "",
        M: "",
        APL:"",
        GA: "",
        DF: "",
        SV: "",
        W: "",
        weapons: [],
        abilities: [],
        uniqueActions: [],
        equipments: []
    });

    onMounted(() => {
        const operativeid = route.params.operativeid;
        if(operativeid != ""){
            operative.value = store.getGetOperative(route.params.rosterid, operativeid)[0];
            newForm.value = false;
        }
    });

    function addOperative() {
        store.addOperative(route.params.rosterid, operative.value);
        router.push("/roster/" + route.params.rosterid);
    }

    function updateOperative() {
        store.updateOperative(route.params.rosterid, operative.value);
        router.push("/roster/" + route.params.rosterid);
    }

    function save(type, isUpdate, value) {
        switch (type) {
            case "weapon":
                if(isUpdate) 
                    operative.value.weapons[fromDataIndex] = value;
                else
                    operative.value.weapons.push(value);
                break;
            case "ability":
                if(isUpdate) 
                    operative.value.abilities[fromDataIndex] = value;
                else
                    operative.value.abilities.push(value);
                break;
            case "uniqueAction":
                if(isUpdate) 
                    operative.value.uniqueActions[fromDataIndex] = value;
                else
                    operative.value.uniqueActions.push(value);
                break;
            case "equipment":
                if(isUpdate) 
                    operative.value.equipments[fromDataIndex] = value;
                else
                    operative.value.equipments.push(value);
                break;
        }
        toggleModal.value = !toggleModal.value;
    }

    function add(type) {
        fromData.value = {};
        switch (type) {
            case "weapon":
                modalTitle.value = "New weapon";
                formComponent.value = WeaponForm;
                break;
            case "ability":
                modalTitle.value = "New ability";
                formComponent.value = AbilityForm;
                break;
            case "uniqueAction":
                modalTitle.value = "New unique action";
                formComponent.value = UniqueActionFrom;
                break;
            case "equipment":
                modalTitle.value = "New equipment";
                formComponent.value = EquipmentForm;
                break;
        }
        toggleModal.value = !toggleModal.value;
    }

    function update(type, value, index) {
        fromDataIndex.value = index;
        switch (type) {
            case "weapon":
                modalTitle.value = `Update weapon: ${value.name}`;
                formComponent.value = WeaponForm;
                fromData.value = value;
                break;
            case "ability":
                modalTitle.value = `Update ability: ${value.name}`;
                formComponent.value = AbilityForm;
                fromData.value = value;
                break;
            case "uniqueAction":
                modalTitle.value = `Update unique action: ${value.name}`;
                formComponent.value = UniqueActionFrom;
                fromData.value = value;
                break;
            case "equipment":
                modalTitle.value = `Update equipment: ${value.name}`;
                formComponent.value = EquipmentForm;
                fromData.value = value;
                break;
        }
        toggleModal.value = !toggleModal.value;
    }

    function remove(type){
        switch (type) {
            case "weapon":
                operative.value.weapons = operative.value.weapons.splice(0, fromDataIndex.value);
                break;
            case "ability":
                operative.value.abilities = operative.value.abilities.splice(0, fromDataIndex.value);
                break;
            case "uniqueAction":
                operative.value.weapons = operative.value.uniqueActions.splice(0, fromDataIndex.value);
                break;
            case "equipment":
                operative.value.weapons = operative.value.equipments.splice(0, fromDataIndex.value);
                break;
        }
        toggleModal.value = !toggleModal.value;
    }

    function addWeapon(weaponId) {
        operative.value.weapons.push(weaponId);
        weaponModalRef.value.toggleModal();
    }

</script>

<style scoped>

    .operative-form-section > p {
        border-bottom: 1px solid #3a3f44;
        margin-bottom: 5px;
    }

    .operative-form-section > .badge {
        margin-left: 5px;
        cursor: pointer;
    }

</style>

