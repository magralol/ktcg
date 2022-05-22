import { defineStore } from 'pinia'

export const Store = defineStore('store', {
  state: () => {
    return { 
      selectedRoster: null,
      roster: {
        name: "",
        version: 2,
        faction: "",
        operatives: [],
        weapons: [],
        abilities: [],
        equipments: [],
        ploys: []
      },
      rosters: []
    }
  },
  getters: {
    getRoster: (state) => {
      return (id) => state.rosters[id]
    },
    getGetOperative: (state) => {
      return (rosterid, operativeid) => state.rosters[rosterid].operatives.filter((o) => o.id == operativeid)
    },
    getWeapons: (state) => {
      return (rosterid) => state.rosters[rosterid].weapons;
    },
    getWeapon: (state) => {
      return (rosterid, weaponid) => state.rosters[rosterid].weapons.filter((w) => w.id == weaponid)
    },
  },
  actions: {
    setSelectedRoster(rosterId){
      this.selectedRoster = rosterId;
    },
    addRoster(name, faction){
      this.rosters.push({
        name,
        faction,
        version: 2,
        operatives: [],
        ploys: []
      });
    },
    async addRosterFromBattlescribe(name, faction){
      this.addRoster(name, faction);
      /* get battlescribe data */
      let bsData = {
        operatives: [],
        weapons: [],
        abilities: [],
        equipments: [],
        ploys: []
      };
      
      this.selectedRoster = this.rosters.length;

      bsData.weapons.forEach(function (weapon) {
        this.addWeapon(weapon);
      });

      bsData.abilities.forEach(function (ability) {
        this.addWeapon(ability);
      });

      bsData.equipments.forEach(function (equipment) {
        this.addWeapon(equipment);
      });

      bsData.ploys.forEach(function (ploy) {
        this.addWeapon(ploy);
      });

      bsData.operatives.forEach(function (operativ) {
        this.addWeapon(operativ);
      });

    },
    removeRoster(id){
      this.rosters.splice(id, 1);
    },
    exportRoster(rosterid){

    },
    addOperative(rosterId, operative) {
      operative.id = this.rosters[rosterId].operatives.length + 1;
      operative.weapons = [];
      operative.abilities = [];
      operative.uniqueActions = [];
      operative.equipments = [];
      this.rosters[rosterId].operatives.push(operative);
    },
    updateOperative(rosterId, operative){
      const operativeIndex = this.rosters[rosterId].operatives.findIndex(o => o.id == operative.id);
      this.rosters[rosterId].operatives[operativeIndex] = operative;
    },
    removeOperative(rosterId, operativeid) {
      this.rosters[rosterId].operatives = this.rosters[rosterId].operatives.filter(o =>  o.id != operativeid);
    },
    addWeapon(rosterId, weapon) {
      weapon.id = this.rosters[rosterId].weapons.length + 1;
      this.rosters[rosterId].weapons.push(weapon);
    },
    updateWeapon(rosterId, weapon){
      const index = this.rosters[rosterId].weapons.findIndex(w => w.id == weapon.id);
      this.rosters[rosterId].weapons[index] = weapon;
    },
    removeWeapon(rosterId, weapon){
      let operatives = [];
      this.rosters[rosterId].operatives.forEach((operativ) => {
        console.log("weapon.id", weapon.id);
        operativ.weapons = operativ.weapons.filter(w =>  w.id != weapon.id);
        console.log("operativ", operativ.weapons.filter(w =>  w.id != weapon.id));
        operatives.push(operativ);
      });
      //this.rosters[rosterId].operatives = operatives;
      //this.rosters[rosterId].weapons = this.rosters[rosterId].weapons.filter(w =>  w.id != weapon.id);
    },
    addAbility(rosterId, ability) {
      ability.id = this.rosters[rosterId].abilities.length + 1;
      this.rosters[rosterId].abilities.push(ability);
    },
    addPloy(rosterId, ploy) {
      ploy.id = this.rosters[rosterId].ploys.length + 1;
      this.rosters[rosterId].ploys.push(ploy);
    },
    addEquipment(rosterId, equipment) {
      equipment.id = this.rosters[rosterId].equipments.length + 1;
      this.rosters[rosterId].equipments.push(equipment);
    },
  },
})