<template>
    
    <label for="card-name" class="form-label">Name</label>
    <input type="text" class="form-control" id="card-name" placeholder="">
    <hr>
    <div class="row row-cols-3">
    <div class="col">
        <label for="card-moment" class="form-label">M</label>
        <input type="text" class="form-control" id="card-moment" placeholder="">      
    </div>
    <div class="col">
        <label for="card-action-points" class="form-label">APL</label>
        <input type="text" class="form-control" id="card-action-points" placeholder="">
    </div>
    <div class="col">
        <label for="card-group-activation" class="form-label">GA</label>
        <input type="text" class="form-control" id="card-group-activation" placeholder=""> 
    </div>

    <div class="col">
        <label for="card-defence" class="form-label">DF</label>
        <input type="text" class="form-control" id="card-defence" placeholder="">    
    </div>
    <div class="col">
        <label for="card-save" class="form-label">SV</label>
        <input type="text" class="form-control" id="card-save" placeholder="">
    </div>
    <div class="col">
        <label for="card-wounds" class="form-label">W</label>
        <input type="text" class="form-control" id="card-wounds" placeholder=""> 
    </div>

    </div>

    <hr>
    <label class="form-label" style="width:100%;">Weapons <span class="badge bg-primary" style="float: right; cursor: pointer;" @click="addWeapon()"><i class="fas fa-plus"></i></span></label>
    <table style="width:100%">
    <tr>
        <td>
        <span >⌖ </span>
        <span >⚔ </span>
        <b></b>
        </td>
        <!--<td>e</td>-->
        <td style="float: right; cursor: pointer;" v-on:click="removeWeapon(index)"><i class="fas fa-times"></i></td>
    </tr>
    </table> 


    <hr>
    <label class="form-label" style="width:100%;">Abilities <span class="badge bg-primary" style="float: right; cursor: pointer;" v-on:click="$refs.abilityModal.toggleModal('ability')"><i class="fas fa-plus"></i></span></label>
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
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: newWeaponMode == 'existing' }" href="#" @click="newWeaponMode = 'existing'">Existing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: newWeaponMode == 'new' }" href="#" @click="newWeaponMode = 'new'">New</a>
                    </li>
                </ul>
                <br>
                <ul class="list-group" v-show="newWeaponMode == 'existing'">
                    <li class="list-group-item">Weapon one</li>
                    <li class="list-group-item">Weapon two</li>
                    <li class="list-group-item">Weapon three</li>
                </ul>

                <WeaponForm v-show="newWeaponMode == 'new'"/>

            </div>
            <div class="modal-footer" v-show="newWeaponMode == 'new'">
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>

</template>

<script setup>
    import { ref } from "vue";
    import WeaponForm from "../components/WeaponForm.vue";

    let newWeaponMode = ref("existing");

    function addWeapon() {
        const weaponModal = new bootstrap.Modal(document.getElementById('weaponModal'));
        weaponModal.toggle();

    }

</script>

<style scoped>
</style>
