<template>
  <div class="modal fade" id="weapon-modal" tabindex="-1" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Weapon</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
            
            <label for="weapon-name" class="form-label">Name</label>
            <input type="text" class="form-control" id="weapon-name" v-model="weapon.name" placeholder="">

            <br>

            <select class="form-select" v-model="weapon.type">
              <option value="" selected>Type</option>
              <option value="range">Range</option>
              <option value="melee">Melee</option>
            </select>

            <br>

            <div class="row row-cols-3">
              <div class="col">
                <label for="weapon-attack" class="form-label">A</label>
                <input type="text" class="form-control" id="weapon-attack" v-model="weapon.a" placeholder="">      
              </div>
              <div class="col">
                <label for="weapon-bs-ws" class="form-label">BS/WS</label>
                <input type="text" class="form-control" id="weapon-bs-ws" v-model="weapon.bsws" placeholder="">
              </div>
              <div class="col">
                <label for="weapon-damage" class="form-label">D</label>
                <input type="text" class="form-control" id="weapon-damage" v-model="weapon.d" placeholder=""> 
              </div>
            </div>

            <br>

            <label for="weapon-sr" class="form-label">SR</label>
            <input type="text" class="form-control" id="weapon-sr" v-model="weapon.sr" placeholder="">

            <br>

            <label for="weapon-crit" class="form-label">!</label>
            <input type="text" class="form-control" id="weapon-crit" v-model="weapon.crit" placeholder="">

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" v-on:click="addWeapon()">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        modal: null,
        weapon: {
          name: "",
          type: "",
          a: "",
          bsws: "",
          d: "",
          sr: "",
          crit: ""
        }
      }
    },
    mounted() {

      this.modal = new bootstrap.Modal(document.getElementById('weapon-modal'), {
        keyboard: false
      });

    },
    methods: {
      toggleModal(){
        this.weapon = { name: "", type: "", a: "", bsws: "", d: "", sr: "", crit: "" };
        this.modal.toggle();
      },
      addWeapon(){
        this.$parent.addWeapon(this.weapon);
        this.toggleModal();
      }
    }
  }
</script>

<style>

</style>
