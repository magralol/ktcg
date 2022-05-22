<template>

    <!--<h1>Roster {{ route.params.id }}</h1> -->
    <!-- TODO: Move to separate components -->
    <div class="container-fluid d-none d-md-block">
        <div class="row">
            <Navbar>
                    <li class="nav-item">
                        <a class="nav-link" :href="'/roster/' + route.params.id + '/operative'">New Operative</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">New Ploy</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="exportRoster()">Export</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="importFromBattlescribe()">Import from BattleScribe</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Print</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="removeRoster()">Delete</a>
                    </li>
            </Navbar>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                <div class="container">
                    <div style="text-align: center;display: flex;justify-content: center;align-items: flex-end;border-bottom: 1px #fe5001 solid;margin-bottom: 25px;padding-bottom: 20px;">
                        <div class="faction-icon-container">
                            <object class="faction-icon faction-icon-roster" type="image/svg+xml" :data="'/faction-icons/' + roster.faction.icon +  '.svg'">
                                <img style="width: 40px;height:40px;" :src="'/faction-icons/' + roster.faction.icon +  '.svg'">
                            </object>
                        </div>
                        <div style="margin-left: 20px;">
                            <h3 style="margin-bottom: 0;">{{ roster.name }}</h3>
                            <h6 class="text-muted">{{ roster.faction.display }}</h6>
                        </div>
                    </div>
                    
                    <!---->
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h4 :class="(tab == 'operatives')? '' : 'text-muted'" @click="tab = 'operatives'" style="cursor: pointer;">Operatives</h4>
                        <h4 :class="(tab == 'ploys')? '' : 'text-muted'" @click="tab = 'ploys'" style="flex-grow: 1; margin-left: 25px; cursor: pointer;">Ploys</h4>
                        <!--
                        <div class="dropdown" style="margin-right: 5px;">
                            <a class="dropdown-toggle" style="color: #000 !important" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </a>

                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><a class="dropdown-item" href="#" @click="exportRoster()">Export</a></li>
                                <li><a class="dropdown-item" href="#" @click="importFromBattlescribe()">Import from <br> Battlescribe</a></li>
                                <li><a class="dropdown-item" href="#">Print</a></li>
                                <li><a class="dropdown-item" href="#" @click="removeRoster()">Remove</a></li>
                            </ul>
                        </div>
                        -->
                    </div>
                    <br>
                    <div class="card">
                        <div class="card-body">
                            
                            <table v-show="tab == 'operatives'" class="table">
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
                                            <div v-for="(weapon, index) in oprative.weapons" >
                                                <WeaponBadge :name="weapon.name" :type="weapon.type"/><br>
                                            </div>
                                        </td>
                                        <td>
                                            <div v-for="(ability, index) in oprative.abilities" >
                                                <Badge :text="ability.name" /> <br>
                                            </div>
                                        </td>
                                        <td>
                                            <div v-for="(uniqueAction, index) in oprative.uniqueActions" >
                                                <Badge :text="`${uniqueAction.name} (${uniqueAction.cost}AP)`" /> <br>
                                            </div>
                                        </td>
                                        <td>
                                            <div v-for="(equipment, index) in oprative.equipments" >
                                                <Badge :text="`${equipment.name} (${equipment.cost}EP)`" /><br>
                                            </div>
                                        </td>
                                        <td style="text-align: center;">
                                            <div class="dropdown">
                                                <a class="dropdown-toggle" style="color: #000 !important" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                                </a>

                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <li><a class="dropdown-item" :href="'/roster/' + route.params.id + '/operative/' + oprative.id">Edit</a></li>
                                                    <li><a class="dropdown-item" href="#" @click="copyOperative(oprative)">Copy</a></li>
                                                    <li><a class="dropdown-item" href="#" @click="removeOperative(oprative)">Remove</a></li>
                                                    <li><hr class="dropdown-divider"></li>
                                                    <li><a class="dropdown-item" href="#">Move up</a></li>
                                                    <li><a class="dropdown-item" href="#">Move down</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    <!--
    <div class="d-none d-md-block">
        <Navbar />
        <br>
        <div class="container">
            <div style="text-align: center;display: flex;justify-content: center;align-items: flex-end;border-bottom: 1px #fe5001 solid;margin-bottom: 25px;padding-bottom: 20px;">
                <div class="faction-icon-container">
                    <object class="faction-icon faction-icon-roster" type="image/svg+xml" :data="'/faction-icons/' + roster.faction.icon +  '.svg'">
                        <img style="width: 40px;height:40px;" :src="'/faction-icons/' + roster.faction.icon +  '.svg'">
                    </object>
                </div>
                <div style="margin-left: 20px;">
                    <h3 style="margin-bottom: 0;">{{ roster.name }}</h3>
                    <h6 class="text-muted">{{ roster.faction.display }}</h6>
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 :class="(tab == 'operatives')? '' : 'text-muted'" @click="tab = 'operatives'" style="cursor: pointer;">Operatives</h4>
                <h4 :class="(tab == 'ploys')? '' : 'text-muted'" @click="tab = 'ploys'" style="flex-grow: 1; margin-left: 25px; cursor: pointer;">Ploys</h4>
                <div class="dropdown" style="margin-right: 5px;">
                    <a class="dropdown-toggle" style="color: #000 !important" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </a>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a class="dropdown-item" href="#">Custom</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" @click="exportRoster()">Export</a></li>
                        <li><a class="dropdown-item" href="#" @click="importFromBattlescribe()">Import from <br> Battlescribe</a></li>
                        <li><a class="dropdown-item" href="#">Print</a></li>
                        <li><a class="dropdown-item" href="#" @click="removeRoster()">Remove</a></li>
                    </ul>
                </div>
            </div>
            <br>
            <div class="card">
                <div class="card-body">
                    
                    <table v-show="tab == 'operatives'" class="table">
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
                                <th scope="col" style="text-align: center;">
                                    <a :href="'/roster/' + route.params.id + '/operative'"><span class="badge bg-primary" style="cursor: pointer;"><i class="fa-solid fa-plus"></i></span></a>
                                </th>
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
                                    <div v-for="(weapon, index) in oprative.weapons" >
                                        <WeaponBadge :name="weapon.name" :type="weapon.type"/><br>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="(ability, index) in oprative.abilities" >
                                        <Badge :text="ability.name" /> <br>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="(uniqueAction, index) in oprative.uniqueActions" >
                                        <Badge :text="`${uniqueAction.name} (${uniqueAction.cost}AP)`" /> <br>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="(equipment, index) in oprative.equipments" >
                                        <Badge :text="`${equipment.name} (${equipment.cost}EP)`" /><br>
                                    </div>
                                </td>
                                <td style="text-align: center;">
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" style="color: #000 !important" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </a>

                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <li><a class="dropdown-item" :href="'/roster/' + route.params.id + '/operative/' + oprative.id">Edit</a></li>
                                            <li><a class="dropdown-item" href="#" @click="copyOperative(oprative)">Copy</a></li>
                                            <li><a class="dropdown-item" href="#" @click="removeOperative(oprative)">Remove</a></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><a class="dropdown-item" href="#">Move up</a></li>
                                            <li><a class="dropdown-item" href="#">Move down</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        </div>

    </div>
    -->
    <!-- Phone view-->
    <div class="d-block d-sm-block d-md-none">
        <div class="header">
            <div class="top" style="padding: 20px;display: flex;align-content: center;justify-content: space-between;align-items: center;text-align: center;">
                <a href="/rosters"><i class="fa-solid fa-chevron-left"></i></a>
                <h5>{{ roster.name }}<br><small class="text-muted">{{ roster.faction.display }}</small></h5>
                <MobileNav :title="roster.name">
                    <li class="nav-item" style="text-align: initial;">
                        <a class="nav-link" :href="'/roster/' + route.params.id + '/operative'">New Operative</a>
                    </li>
                    <li class="nav-item" style="text-align: initial;">
                        <a class="nav-link" href="#">New Ploy</a>
                    </li>
                    <li class="nav-item" style="text-align: initial;">
                        <a class="nav-link" href="#" @click="exportRoster()">Export</a>
                    </li>
                    <li class="nav-item" style="text-align: initial;">
                        <a class="nav-link" href="#" @click="importFromBattlescribe()">Import from BattleScribe</a>
                    </li>
                    <li class="nav-item" style="text-align: initial;">
                        <a class="nav-link" href="#">Print</a>
                    </li>
                    <li class="nav-item" style="text-align: initial;">
                        <a class="nav-link" href="#" @click="removeRoster()">Delete</a>
                    </li>
                </MobileNav>
                <!--
                <div class="dropdown">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </a>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a class="dropdown-item" href="#">Export</a></li>
                        <li><a class="dropdown-item" href="#" @click="removeRoster()">Remove</a></li>
                    </ul>
                </div>
                -->
            </div>
            <ul class="" style="list-style: none; display: block;padding:0;margin: 0;">
                <li :class="(tab == 'operatives')? 'tab-active' : 'text-muted'" @click="tab = 'operatives'" style="display: inline-block;width: 50%;text-align: center;padding-bottom: 20px;">Operatives</li>
                <li :class="(tab == 'ploys')? 'tab-active' : 'text-muted'" @click="tab = 'ploys'" style="display: inline-block;width: 50%;text-align: center;padding-bottom: 20px;">Ploys</li>
            </ul>
        </div>
        

        <div class="container">
            <br>
            <input type="text" class="form-control" id="" placeholder="Filter">
            <br>
            <ul class="list-group">

                <li v-show="tab == 'operatives'"  class="list-group-item" style="padding: 0;margin-bottom: 20px;" v-for="oprative in roster.operatives">
                    <a :href="'/roster/' + route.params.id + '/operative/' + oprative.id" style="display: flex;justify-content: space-between;align-items: center;padding: 0.5rem 1rem;">
                        <div>
                            <span class="list-group-text">{{ oprative.name }}</span>
                            <br>
                            <small class="text-muted">
                                <span v-for="(weapon, index) in oprative.weapons">{{ weapon.name }}<span v-if="index != (oprative.weapons.length - 1)">, </span></span>
                            </small>
                        </div>
                        <div>
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>    
                    </a>
                </li>

                <li v-show="tab == 'ploys'"  class="list-group-item" style="padding: 0;margin-bottom: 20px;" v-for="(ploy, index) in ploys">
                    <div style="display: flex;justify-content: space-between;align-items: center;padding: 0.5rem 1rem;" @click="openAccordion(index)">
                        <div>
                            <span class="list-group-text">{{ ploy.name }}</span><br><small class="text-muted">{{ ploy.type }}</small>
                        </div>
                        <div>
                            <span class="badge bg-primary" style="margin-right: 10px;">{{ ploy.cost }}CP</span>
                            <i class="fa-solid" :class="[openTab == index ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
                        </div>    
                    </div>
                    <div class="list-group-card" v-show="openTab == index">
                        <div class="">
                            {{ ploy.text }}
                        </div>
                    </div>
                </li>
            </ul>

            <div class="d-grid gap-2 mb-4">
                <a v-show="tab == 'operatives'" class="btn btn-primary" :href="'/roster/' + route.params.id + '/operative'">Add Operative</a>
                <a v-show="tab == 'ploys'"  class="btn btn-primary" :href="'/roster/' + route.params.id + '/operative'">Add Ploy</a>
            </div>

        </div>
    </div>
    
    <input style="display:none;" type="file" id="file-selector">
</template>

<script setup>
    
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import { Store } from '../store';

    import YAML from 'yaml';

    import Battlescribe from '../utils/battlescribe';

    import Navbar from "../components/Navbar.vue";
    import MobileNav from "../components/MobileNav.vue";
    import EditWeaponModal from "../components/EditWeaponModal.vue";
    import WeaponBadge from "../components/WeaponBadge.vue";
    import Badge from "../components/Badge.vue";

    const store = Store();
    const route = useRoute();
    const router = useRouter();
    const roster = store.getRoster(route.params.id);

    console.log(roster);

    const editWeaponModalRef = ref();
    const tab = ref("operatives");
    const openTab = ref(null);
    const ploys = ref([
        {
            name: "Hateful Aassault",
            type: "Strategic Ploy",
            cost: 1,
            text: "Until the end of the Turning Point, each time a friendly BUBONIC ASTARTES operative is activated, if it does not perform a Shoot action during that activation, it can perform two Fight actions during that activation."
        },
        {
            name: "Revolting Durability",
            type: "Tactical Ploy",
            cost: 1,
            text: "Use this Tactical Ploy in either the Resolve Successful Hits or Resolve Successful Saves step of a combat or shooting attack made against a friendly BUBONIC ASTARTES operative. You can change one of your opponent’s critical hits into a normal hit."
        }
    ])

    async function importFromBattlescribe() {
        try {
            const bs = new Battlescribe(roster.faction.value);
            await bs.load();

            bs.getOpratives().forEach(oprative => {
                store.addOperative(route.params.id, oprative);
            });  

            /*
            bs.getWeapons().forEach(weapon => {
                store.addWeapon(route.params.id, weapon);
            });

            bs.getEquipments().forEach(equipment => {
                store.addEquipment(route.params.id, equipment);
            });

            bs.getAbilities().forEach(ability => {
                store.addAbility(route.params.id, ability);
            });
            */
            console.log(store.rosters[route.params.id]);

        } catch (err) {
            console.error(err);
            alert("could not import roster from Battlescribe");
        }
        
    }

    function removeRoster() {
        if(confirm("Are you sure youd like to remove this roster?")){
            store.removeRoster(route.params.id);
            router.push("/rosters");
        }
    }

    function exportRoster() {
        //console.log(YAML.stringify(roster));
        var a = document.createElement('a');
        a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(YAML.stringify(roster));
        a.download = `${roster.name.replace(/[^0-9a-z]/gi, '_').toLowerCase()}.yaml`;
        a.click();
    }

    function copyOperative(oprative) {
        store.addOperative(route.params.id, Object.assign({}, oprative));
    }

    function removeOperative(oprative) {
        
        if(confirm(`Are you sure you want to remove ${oprative.name} from the roster?`))
            store.removeOperative(route.params.id, oprative.id);

    }

    /*
    function loadROSZFile() {
        const fs = document.getElementById('file-selector');
        const reader = new FileReader();

        reader.onload = function(){
            const outputStr = String.fromCharCode(
                reader.result.split(' ').map(bin => parseInt(bin, 2))
            )
            console.log("reader.result", outputStr);
            //var enc = new TextDecoder("utf-8");
            //var arr = new Uint8Array(reader.result);
            //console.log(String.fromCharCode.apply(null, arr));
        };

        fs.addEventListener('change', (event) => {
            reader.rea
            reader.readAsBinaryString(event.target.files[0])
            //reader.readAsText(event.target.files[0]);
            //var enc = new TextDecoder("utf-8");
            //var arr = new Uint8Array(reader.readAsArrayBuffer(event.target.files[0]));
            //console.log(arr);
            //reader.readAsArrayBuffer(event.target.files[0])
            //console.log(reader.readAsBinaryString(event.target.files[0]));
        });
        
        fs.click();
    }
    */

    function openAccordion(index) {
        if(openTab.value == index)
            openTab.value = null;
        else 
            openTab.value = index;
    }

</script>

<style scoped>

    .top > a, .dropdown > a {
        color: white;
    }
    .dropdown-toggle::after{
        display: none;
    }

    .tab-active {
        border-bottom: 1px solid white;
        color: white
    }
</style>
