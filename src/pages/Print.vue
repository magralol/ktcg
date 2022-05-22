<template>
    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="d-print-none d-none d-md-block col-md-3 col-lg-2 d-md-block sidebar" style="border-right: 1px solid #6c757d !important; height: 100vh;">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/rosters">KTRM</a>
                        </li>
                        <hr>
                        <li>
                            <a class="nav-link" aria-current="page" href="#" @click="printRoster()">Print</a>
                        </li>
                        <hr>
                    </ul>
                </div>
            </nav>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                
                <form class="row row-cols-lg-auto g-3 align-items-center d-print-none top-selections">
                    <div class="col-12">
                        <label class="visually-hidden" for="roster">Roster</label>
                        <select id="roster" class="form-select" aria-label="Default select example" v-model="rosterSelector">
                            <option selected value="">Roster</option>
                            <option v-for="(roster, index) in store.rosters" :value="index">{{ roster.name }} ({{ roster.faction.display }})</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <label class="visually-hidden" for="format">Format</label>
                        <select id="format" class="form-select" aria-label="Default select example">
                            <option selected value="">Format</option>
                            <option value="">List</option>
                            <option value="">Cards</option>
                            <option value="">Operative Cards / Abilities List</option>
                        </select>
                    </div>

                </form>
                
                <!--
                <div class="d-print-none top-selections">
                    <select class="form-select" aria-label="Default select example" v-model="rosterSelector">
                        <option selected value="">Roster</option>
                        <option v-for="(roster, index) in store.rosters" :value="index">{{ roster.name }} ({{ roster.faction.display }})</option>
                    </select>
                </div>
                -->

                <div>
                    <br>
                    <h3>Operatives</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">M</th>
                                <th scope="col">APL</th>
                                <th scope="col">GA</th>
                                <th scope="col">DF</th>
                                <th scope="col">SV</th>
                                <th scope="col">W</th>
                                <th scope="col">Weapons</th>
                                <th scope="col">Abilities</th>
                                <th scope="col">Unique Actions</th>
                                <th scope="col">Equipments</th>
                                <!--
                                <th scope="col" style="text-align: center;">
                                    <a :href="'/roster/' + route.params.id + '/operative'"><span class="badge bg-primary" style="cursor: pointer;"><i class="fa-solid fa-plus"></i></span></a>
                                </th>
                                -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="oprative in roster.operatives">
                                <td>{{ oprative.name }}</td>
                                <td>{{ oprative.M }}</td>
                                <td>{{ oprative.APL }}</td>
                                <td>{{ oprative.GA }}</td>
                                <td>{{ oprative.DF }}</td>
                                <td>{{ oprative.SV }}</td>
                                <td>{{ oprative.W }}</td>
                                <td>
                                    <div v-for="(weapon, index) in oprative.weapons" class="weapon-container"> 
                                        <div class="me-1">
                                            <div v-if="weapon.type == 'melee'">
                                                <svg style="width:15px;height:15px" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M6.2,2.44L18.1,14.34L20.22,12.22L21.63,13.63L19.16,16.1L22.34,19.28C22.73,19.67 22.73,20.3 22.34,20.69L21.63,21.4C21.24,21.79 20.61,21.79 20.22,21.4L17,18.23L14.56,20.7L13.15,19.29L15.27,17.17L3.37,5.27V2.44H6.2M15.89,10L20.63,5.26V2.44H17.8L13.06,7.18L15.89,10M10.94,15L8.11,12.13L5.9,14.34L3.78,12.22L2.37,13.63L4.84,16.1L1.66,19.29C1.27,19.68 1.27,20.31 1.66,20.7L2.37,21.41C2.76,21.8 3.39,21.8 3.78,21.41L7,18.23L9.44,20.7L10.85,19.29L8.73,17.17L10.94,15Z" />
                                                </svg>
                                            </div>
                                            <div v-if="weapon.type == 'range'">
                                                <svg style="width:15px;height:15px" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            {{ weapon.name }}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="(ability, index) in oprative.abilities" class="abilities-container">
                                        {{ ability.name }} <br>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="(uniqueAction, index) in oprative.uniqueActions" class="abilities-container">
                                        {{ uniqueAction.name }} ({{uniqueAction.cost}}AP)<br>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="(equipment, index) in oprative.equipments" class="abilities-container">
                                        {{ equipment.name }} ({{equipment.cost}}AP)<br>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <br>
                    <h3>Weapons</h3>
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
                            <tr v-for="weapon in weapons">
                                <td>{{ weapon.name }}</td>
                                <td>{{ weapon.A }}</td>
                                <td>{{ weapon.BSWS }}</td>
                                <td>{{ weapon.D }}</td>
                                <td>{{ weapon.SR }}</td>
                                <td>{{ weapon.CRIT }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <br>
                    <h3>Abilities</h3>
                    <div v-for="ability in abilities">
                        <p><b>{{ ability.name }}: </b>{{ ability.description }}</p>
                    </div>

                    <br>
                    <h3>Unique Actions</h3>
                    <div v-for="uniqueAction in uniqueActions">
                        <p><b>{{ uniqueAction.name }} ({{ uniqueAction.cost }}AP): </b>{{ uniqueAction.description }}</p>
                    </div>

                    <br>
                    <h3>Equipments</h3>
                    <div v-for="equipment in equipments">
                        <p><b>{{ equipment.name }} ({{ equipment.cost }}EP): </b>{{ equipment.description }}</p>
                    </div>
                </div>
                

            </main>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import get from 'lodash.get';

    import { Store } from '../store';

    import WeaponBadge from "../components/WeaponBadge.vue";
    import Badge from "../components/Badge.vue";

    const store = Store();
    const rosterSelector = ref("");
    const roster = ref({});
    const weapons = ref({});
    const abilities = ref({});
    const uniqueActions = ref({});
    const equipments = ref({});

    watch(rosterSelector, async (newValue, oldValue) => {
        roster.value = store.$state.rosters[newValue];
        parseOperatives();
    });

    function parseOperatives() {
        let weaponsObj = {};
        let abilitiesObj = {};
        let uniqueActionsObj = {};
        let equipmentsObj = {};

        roster.value.operatives.forEach((operative) => {
            console.log(operative);

            operative.weapons.forEach((weapon) => {
                if(!get(weaponsObj, weapon.name))
                    weaponsObj[weapon.name] = weapon;
            });

            operative.abilities.forEach((ability) => {
                if(!get(abilitiesObj, ability.name))
                    abilitiesObj[ability.name] = ability;
            });

            operative.uniqueActions.forEach((uniqueAction) => {
                if(!get(uniqueActionsObj, uniqueAction.name))
                    uniqueActionsObj[uniqueAction.name] = uniqueAction;
            });

            operative.equipments.forEach((equipment) => {
                if(!get(weaponsObj, equipment.name))
                    equipmentsObj[equipment.name] = equipment;
            });

        });

        weapons.value = weaponsObj;
        abilities.value = abilitiesObj;
        uniqueActions.value = uniqueActionsObj;
        equipments.value = equipmentsObj;
    }
    function printRoster() {
        window.print();
    }

</script>

<style scoped>

    
    @page {
        /*size: landscape;*/
    }

    /*
    @page :left {
        margin-left: 0 !important;
    }
    */

    .weapon-container {
        display: flex !important; 
        align-items: center !important;
    }

    @media print {

        body { 
            margin: 0;
            padding-left: 20px;
            padding-right: 20px;
            /*writing-mode: tb-rl !important;*/
            /*zoom: 80% !important;*/
        }

        table {
            page-break-inside: avoid;
        }
        
        h3, p, th, td {
            color: #000;
        }

        .container-fluid {
            padding: 20px;
        }

        .weapon-container {
            width: 200px;
            /*margin-bottom: 20px;*/
            align-items: baseline !important;
        }
        .weapon-container:last-child {
            margin-bottom: 0px;
        }

        .abilities-container {
            width: 200px;
            /*margin-bottom: 20px;*/
        }
    }

    

</style>
