<template>

    <div class="card" style="margin-top: 10px;">
      <div class="card-body">
        
        <label for="card-name" class="form-label" style="width:100%;">Name 
          <!--<span class="badge bg-primary" style="float: right; cursor: pointer;margin-left:10px;" v-on:click="printCard()">Print</span>-->
          <span class="badge bg-primary" style="float: right; cursor: pointer;margin-left:10px;" v-on:click="exportCard()">Export</span>
          <input style="display:none;" id="cardInput" type="file" accept="application/json" v-on:change="loadCard($event)">
          <span class="badge bg-primary" style="float: right; cursor: pointer;" v-on:click="importCard()">Import</span>
        </label>
        <input type="text" class="form-control" id="card-name" v-model="card.name" placeholder="">

        <hr>

        <select class="form-select" v-model="card.faction">
          <option value="">Faction</option>
          <option v-for="faction in factions" :key="faction.value" v-bind:value="faction.value">{{ faction.name }}</option>
        </select>

        <hr>

        <label for="card-color">Color</label><br>
        <input type="color" class="form-control" v-model="card.color"> 
        <hr>

        <label for="card-color">Text Color</label><br>
        <input type="color" class="form-control" v-model="card.textColor"> 
        <hr>

        <select class="form-select" v-model="card.type">
          <option value="type" selected>Type</option>
          <option v-for="type in cardTypes" :key="type.value" v-bind:value="type.value">{{ type.name }}</option>
        </select>
        
        <div v-show="card.type == 'custom'">
          <hr>
          <label for="card-custom-type" class="form-label" style="width:100%;">Custom Type</label>
          <input type="text" class="form-control" id="card-custom-type" v-model="card.customType" placeholder="">
        </div>

        <div v-show="card.type != 'operative' && card.type != 'type'">
          <hr>

          <label class="form-label" for="card-cost">Cost (<span v-show="card.type == 'strategic-ploy' || card.type == 'tactical-ploy'">CP</span><span v-show="card.type == 'equipment'">EP</span>)</label>
          <input type="text" class="form-control" id="card-cost" v-model="card.cost">
          
          <hr>

          <label for="card-description" class="form-label" style="width:100%;">Description <span class="badge bg-primary" style="float: right; cursor: pointer;" v-on:click="$refs.helpModal.open()">?</span></label>
          <textarea class="form-control" style="height: 100px" rows="3" v-model="card.description"></textarea>
          
        </div>

        <div v-show="this.card.type == 'operative'">
          <hr>
          <div class="row row-cols-3">
            <div class="col">
              <label for="card-moment" class="form-label">M</label>
              <input type="text" class="form-control" id="card-moment" v-model="card.m" placeholder="">      
            </div>
            <div class="col">
              <label for="card-action-points" class="form-label">APL</label>
              <input type="text" class="form-control" id="card-action-points" v-model="card.apl" placeholder="">
            </div>
            <div class="col">
              <label for="card-group-activation" class="form-label">GA</label>
              <input type="text" class="form-control" id="card-group-activation" v-model="card.ga" placeholder=""> 
            </div>

            <div class="col">
              <label for="card-defence" class="form-label">DF</label>
              <input type="text" class="form-control" id="card-defence" v-model="card.df" placeholder="">    
            </div>
            <div class="col">
              <label for="card-save" class="form-label">SV</label>
              <input type="text" class="form-control" id="card-save" v-model="card.sv" placeholder="">
            </div>
            <div class="col">
              <label for="card-wounds" class="form-label">W</label>
              <input type="text" class="form-control" id="card-wounds" v-model="card.w" placeholder=""> 
            </div>
        
          </div>

          <hr>
          <label class="form-label" style="width:100%;">Weapons <span class="badge bg-primary" style="float: right; cursor: pointer;" v-on:click="$refs.weaponModal.toggleModal()"><i class="fas fa-plus"></i></span></label>
          <table style="width:100%">
            <tr v-for="(weapon, index) in card.weapons" :key="index">
              <td>
                <span v-if="weapon.type && weapon.type =='range'">⌖ </span>
                <span v-if="weapon.type && weapon.type =='melee'">⚔ </span>
                <b>{{ weapon.name }}</b>
              </td>
              <!--<td>e</td>-->
              <td style="float: right; cursor: pointer;" v-on:click="removeWeapon(index)"><i class="fas fa-times"></i></td>
            </tr>
          </table> 


          <hr>
          <label class="form-label" style="width:100%;">Abilities <span class="badge bg-primary" style="float: right; cursor: pointer;" v-on:click="$refs.abilityModal.toggleModal('ability')"><i class="fas fa-plus"></i></span></label>
          <table style="width:100%">
            <tr v-for="(ability, index) in card.abilities" :key="index">
              <td><b>{{ ability.name }}</b></td>
              <!--<td>e</td>-->
              <td style="float: right; cursor: pointer;" v-on:click="removeAbility('ability', index)"><i class="fas fa-times"></i></td>
            </tr>
          </table>

          <hr>
          <label class="form-label" style="width:100%;">Unique Actions <span class="badge bg-primary" style="float: right; cursor: pointer;" v-on:click="$refs.abilityModal.toggleModal('uniqueAction')"><i class="fas fa-plus"></i></span></label>
          <table style="width:100%">
            <tr v-for="(uniqueAction, index) in card.uniqueActions" :key="index">
              <td><b>{{ uniqueAction.name }}</b></td>
              <!--<td>e</td>-->
              <td style="float: right; cursor: pointer;" v-on:click="removeAbility('uniqueAction', index)"><i class="fas fa-times"></i></td>
            </tr>
          </table>

        </div>
    </div>

    <div class="d-grid gap-2" style="padding: 10px;" v-show="card.type != 'type'">
      <button class="btn btn-primary" type="button" v-on:click="importFromBattlescribe()">Import from Battlescribe</button>
      <button class="btn btn-primary" type="button" v-on:click="$parent.saveCardAsImage()">Download</button>
      <button class="btn btn-primary" type="button" v-on:click="saveCard()">Save</button>
    </div>

    <HelpModal ref="helpModal"/>
    <WeaponModal ref="weaponModal"/>
    <AbilityModal ref="abilityModal"/>

    
    <!-- Modal -->
    <div class="modal fade" id="bs-import-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Import card from BattleScribe</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <Alert type="info">Note: this is a experimental feature and may not preduce cards as expected</Alert>
            <ul class="list-group">
              <li class="list-group-item active" aria-current="true">Operatives</li>
              <li class="list-group-item" style="cursor: pointer;" v-for="(card, index) in bsCards.operatives" :key="index" @click="selectCard(card)">{{ card.name }} <i class="fas fa-chevron-right" style="float: right;"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </div>


  </div>
  
</template>

<script>
  import cardTypes from "../data/card-types.json";
  import factions from "../data/factions.json";
  import battleScribeLinks from "../data/battlescribe-links.json";

  import HelpModal from './HelpModal.vue';
  import WeaponModal from './NewWeaponModal.vue';
  import AbilityModal from './AbilityModal.vue';
  import Alert from './Alert.vue';

  import battlescribe from "../helpers/battlescribe_old";

  export default {
    props: ['card'],
    components: {
      WeaponModal,
      HelpModal,
      AbilityModal,
      Alert
    },
    data(){
      return {
        cardTypes: [],
        factions: [],
        bsCards: [],
        modal: null
      }
    },
    mounted() {
      this.cardTypes = cardTypes;
      this.factions = factions;

      this.modal = new bootstrap.Modal(document.getElementById('bs-import-modal'), {
        keyboard: false
      });

    },
    methods: {
      addWeapon(weapon){
        this.card.weapons.push(weapon);
      },
      removeWeapon(index){
        this.card.weapons.splice(index, 1);
      },
      addAbility(type, ability){
        if(type == "ability"){
          this.card.abilities.push(ability);
        } else {
          this.card.uniqueActions.push(ability);
        }
      },
      removeAbility(type, index){
        if(type == "ability"){
          this.card.abilities.splice(index, 1);
        } else {
          this.card.uniqueActions.splice(index, 1);
        }
      },
      importCard(){
        document.getElementById('cardInput').click();
      },
      loadCard($event){
        let parent = this.$parent;
        let reader = new FileReader();
        reader.onload = function(){
          parent.showCard(JSON.parse(reader.result));
        };
        
        reader.readAsText($event.target.files[0]);

      },
      exportCard(){

        var a = document.createElement('a');
        a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.card));
        a.download = `${this.card.name.replace(/[^0-9a-z]/gi, '_').toLowerCase()}.json`;
        a.click();

      },
      printCard(){
        window.open("/print?card=" + btoa(encodeURIComponent(JSON.stringify(this.card))), '_blank').focus();
      },
      importFromBattlescribe(){
        if(this.card.faction != ""){

          let t = this;

          fetch(battleScribeLinks[this.card.faction])
          //fetch('https://raw.githubusercontent.com/BSData/wh40k-killteam/master/2021%20-%20Talons%20of%20the%20Emperor.cat')
          //fetch('https://raw.githubusercontent.com/BSData/wh40k-killteam/master/2021%20-%20Kommando.cat')
          .then(response => response.text())
          .then(function(data) {
            try {
              t.bsCards = battlescribe.getCards(data);
              t.modal.toggle();
            } catch (err) {
              alert("Could not load BattleScribe data for faction: " + t.card.faction);
              console.log(err)
            }
          });
        } else {
          alert("You need to select a faction before importing BattleScribe data!");
        }
      },
      selectCard(card){
        this.card.type = "operative";
        for(let key in card){
          this.card[key] = card[key];
        }
        this.modal.toggle();
      },
      saveCard(){
        let list = "";
        switch(this.card.type) {
          case "operative":
            list = "operatives";
            break;
          case "equipment":
            list = "equipments";
            break;
          case "strategic-ploy":
            list = "strategicPloys";
            break;
          case "tactical-ploy":
            list = "tacticalPloys";
            break;
          default:
            list = "custom";
        }
        this.$parent.addCardToList(list, this.card);
      }
    }
  }
</script>

<style>

</style>
