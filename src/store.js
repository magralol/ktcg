import { defineStore } from 'pinia'

export const Store = defineStore('store', {
  state: () => {
    return { 
      count: 0,
      roster: {
        name: "",
        version: 2,
        faction: "",
        operatives: [],
        weapons: [],
        abilities: [],
        equipments: [],
        ploys: []
      }
    }
  },
  actions: {
    increment() {
      this.count++
    },
  },
})