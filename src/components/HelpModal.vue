<template>

  <div class="modal fade" id="help-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Text formating</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            How to format card text:
            
            <br><br>
            <b>Header</b>
            <p>&lsqb;Haywire mine (1AP)&rsqb;</p>

            <br>
            <b>Bold</b>
            <p>**Enhanced Bionics**</p>
            
            <br>
            <table style="width:100%">
                <tr>
                    <th>◯</th>
                    <th>■</th>
                    <th>▲</th>
                    <th>⬟</th>
                    <th>Break</th>
                </tr>
                <tr>
                    <td>{c}</td>
                    <td>{s}</td>
                    <td>{t}</td>
                    <td>{p}</td>
                    <td>&&</td>
                </tr>
            </table> 

            <br>
            <b>Weapon profile</b>
            <p>
              %name: Boltgun; a: 4; bsws: 3+; d:3/4; sr:-; crit:-%
              <br>
              <span style="font-style: italic;font-size: smaller;">
                NOTE: all fields (eg name, a, bsws, and d must exist within % for the weapon profile to render correctly. And you may only have one weapon profile per card.
              </span>
            </p>
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" v-on:click="modal.toggle()">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data(){
      return {
          modal: null
      }
    },
    mounted() {
        this.modal = new bootstrap.Modal(document.getElementById('help-modal'), {
            keyboard: true
        });
    },
    methods: {
        open(){
            this.modal.toggle();
        }
    }
  }
</script>

<style>

</style>
