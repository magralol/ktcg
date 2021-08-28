<template>
  <div class="modal fade" id="ability-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add <span v-show="type == 'ability'">Ability</span><span v-show="type != 'ability'">Unique Action</span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
          <label for="ability-name" class="form-label">Name</label>
          <input type="text" class="form-control" id="ability-name" v-model="ability.name" placeholder="">

          <br>

          <label for="ability-description" class="form-label">Description</label>
          <textarea class="form-control" id="ability-description" v-model="ability.description" rows="3"></textarea>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" v-on:click="addAbility()">Add</button>
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
        type: null,
        ability: {
          name: "",
          description: ""
        }
      }
    },
    mounted() {

      this.modal = new bootstrap.Modal(document.getElementById('ability-modal'), {
        keyboard: false
      });

    },
    methods: {
      toggleModal(type){
        this.type = type;
        this.ability = { name: "", description: "" };
        this.modal.toggle();
      },
      addAbility(){
        this.$parent.addAbility(this.type, this.ability);
        this.toggleModal(null);
      }
    }
  }
</script>

<style>

</style>
