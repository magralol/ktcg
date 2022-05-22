<template>
    <!--
    <Navbar class="d-none d-md-block" page="rosters"/>
    <div class="header d-block d-sm-block d-md-none">
        <div class="top" style="padding: 20px;text-align: center;">
            <h5>Rosters</h5>
        </div>
    </div>
    <br>
    -->

    <div class="container-fluid d-none d-md-block">
        <div class="row">
            <Navbar>
                <li class="nav-item">
                    <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#new-roster-modal">New </a>
                </li>
            </Navbar>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                <div class="row">
                    <div class="col-sm-4" v-for="(roster, index) in store.rosters" >
                        <a :href="'/roster/' + index">
                            <div class="card">
                                <div class="card-body">
                                    <div class="">
                                        <object class="faction-icon faction-icon-rosters" type="image/svg+xml" :data="'/faction-icons/' + roster.faction.icon + '.svg'">
                                            <img style="width: 40px;height:40px;" :src="'/faction-icons/' + roster.faction.icon + '.svg'">
                                        </object>
                                    </div> 
                                    <div class="fg1">
                                        <h5 class="card-title">{{ roster.name }}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">{{ roster.faction.display }}</h6>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <br>
                    </div>
                </div>
            </main>
        </div>
    </div>




    <div class="container">
        <!--
        <div class="d-none d-md-block" >
            <div style="display:flex;justify-content: space-between;align-items: center; margin-bottom: 5px;">
                <h3>Rosters</h3>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#new-roster-modal">New</button>
            </div>
        </div>
        <div class="d-none d-md-block">

            <div class="row">
                <div class="col-sm-4" v-for="(roster, index) in store.rosters" >
                    <a :href="'/roster/' + index">
                        <div class="card">
                            <div class="card-body">
                                <div class="">
                                    <object class="faction-icon faction-icon-rosters" type="image/svg+xml" :data="'/faction-icons/' + roster.faction.icon + '.svg'">
                                        <img style="width: 40px;height:40px;" :src="'/faction-icons/' + roster.faction.icon + '.svg'">
                                    </object>
                                </div> 
                                <div class="fg1">
                                    <h5 class="card-title">{{ roster.name }}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{{ roster.faction.display }}</h6>
                                </div>
                            </div>
                        </div>
                    </a>
                    <br>
                </div>
            </div>
            
        </div>
        -->
        <div class="d-block d-sm-block d-md-none">
            <div class="header">
                <div class="top" style="padding: 20px;text-align: center;">
                    <h5>Rosters</h5>
                </div>
            </div>
            <ul class="list-group">
                <a v-for="(roster, index) in store.rosters" :href="'/roster/' + index">
                    <li class="list-group-item">
                        
                        <!--
                        <img src="data:image/png;base64,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" style="width: 50px;height:50px;border-radius: 50%;border: 1px solid #bbb;">
                        :src="'/faction-icons/' + card.faction + '.svg'"-->
                        <div class="">
                            <object class="faction-icon" style="width: 30px !important;" type="image/svg+xml" :data="'/faction-icons/' + roster.faction.icon + '.svg'">
                                <img style="width: 40px;height:40px;" :src="'/faction-icons/' + roster.faction.icon + '.svg'">
                            </object>
                        </div>
                        <div class="fg1 card-title">{{ roster.name }}<br><small class="text-muted">{{ roster.faction.display }}</small></div>
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
                </a>
                <li class="list-group-item" v-if="rosters.length == 0">
                    <!--
                    <img src="data:image/png;base64,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" style="width: 50px;height:50px;border-radius: 50%;border: 1px solid #bbb;">
                    :src="'/faction-icons/' + card.faction + '.svg'"-->
                    <img style="width: 50px;height:50px;border-radius: 50%;border: 1px solid #bbb;" src="/faction-icons/kill-team.svg">
                    <div class="fg1">No rosters<br><small class="text-muted">Create a new roster</small></div>
                    <!--<i class="fa-solid fa-chevron-right"></i>-->
                </li>
            </ul>
            <br>
            <div class="d-grid gap-2">
                <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#new-roster-modal">New Roster</button>
            </div>
        </div>
    </div>

    <!-- new roster modal -->
    <div class="modal fade" id="new-roster-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">New roster</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                
                <div class="mb-3">
                    <label for="roster-name" class="form-label">Name</label>
                    <input class="form-control" id="roster-name" v-model="rosterName">
                </div>

                <div class="mb-3">
                    <label for="roster-faction" class="form-label">Faction</label>
                    <select class="form-select" id="roster-faction" v-model="rosterFaction">
                        <option selected>Select a faction</option>
                        <option v-for="faction in factions" :value="faction">{{ faction.display }}</option>
                    </select>
                </div>




            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="createRoster()">Create</button>
            </div>
            </div>
        </div>
    </div>

</template>

<script setup>
    import { ref, onMounted} from 'vue';
    import { useRouter } from 'vue-router';
    import { Store } from '../store';
    import RosterTable from '../components/RosterTable.vue';
    import WeaponsTable from '../components/WeaonsTable.vue';
    import AbilitiesTable from '../components/AbilitiesTable.vue';

    import Navbar from "../components/Navbar.vue";

    import factions from "../data/factions.json";
    
    const store = Store();
    let modal;
    let rosterName = ref("");
    let rosterFaction = ref({});


    onMounted(() => {
        modal = new bootstrap.Modal(document.getElementById('new-roster-modal'), { });
    });

    let rosters = ref([
        { name: "Gray knights roster 1", faction: { display: "Grey Knights", value: "grey-knights"} },
        { name: "Komandos", faction: { display: "Kommandos", value: "kommandos"} },
        { name: "Gray knights roster 2", faction: { display: "Grey Knights", value: "grey-knights"} },
        { name: "Veteran Guardsman list", faction: { display: "Veteran Guardsman", value: "veteran-guardsman"} },
    ]);


    function createRoster() {
        store.addRoster(rosterName.value, rosterFaction.value);
        //rosters.value.push({ name: rosterName.value, faction: rosterFaction.value });
        rosterName.value = "";
        rosterFaction.value = "";
        modal.toggle();
    }

    /*
    const router = useRouter();
    const store = Store();

    let tab = "operatives";



    function goToNewForm(tab) {
        let type = tab.substring(0, tab.length - 1);
        if(tab == "abilities")
            type = "ability";

        router.push({ path: `/new/${type}` });
    }
    */
</script>

<style scoped>

    .faction-icon-container {
        width: 50px;
        height:50px;
        border-radius: 50%;
        border: 1px solid #6c757d;
        padding:2.5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fg1 { 
        flex-grow: 1;
        margin-left:20px;
    }
    .card-body {
        display:flex;
        justify-content: space-between;
        align-items: center;cursor:pointer;
    }
    .list-group-item {
        display:flex;
        justify-content: space-between;
        align-items: center;cursor:pointer;
        margin-top: 10px;
        border-top: 1px solid rgba(0,0,0,.125);
    }

</style>
