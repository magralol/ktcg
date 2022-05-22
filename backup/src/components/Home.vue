<template>
  <Navbar page="legacy"/>
  
  <div class="container">
    
    <div class="row">
      
      <div class="col-8 d-flex justify-content-center">
        
        <CardTemplate style="margin-top: 10px;" :card="card" ref="cardTemplate"></CardTemplate>

      </div>
      
      <div class="col-4">
        
        <List v-show="!showCardForm" :list="list" />
        
        <CardForm v-show="showCardForm" :card="card"/>
        
      </div>
    
    </div>
   
  </div>

</template>

<script>
  import factions from "../data/factions.json";
  import cardTypes from "../data/card-types.json";
  import weaponTypes from "../data/weapon-types.json";

  import Navbar from './Navbar.vue';
  import CardTemplate from './CardTemplate.vue';
  import MarkdownEditor from './MarkdownEditor.vue';
  import HelpModal from './HelpModal.vue';
  import List from './List.vue';
  import CardForm from './CardForm.vue';

  // logos from https://drive.google.com/drive/folders/1rGgj9xUmgDZ2VDrAZVYGtWmk2eonrU0D

  export default {
    components:{
      Navbar,
      List,
      CardForm,
      CardTemplate,
      MarkdownEditor,
      HelpModal
    },
    data(){
      return {
        factions: [],
        cardTypes: [],
        weaponTypes: [],
        list: {
          name: "",
          operatives: [],
          equipments: [],
          strategicPloys: [],
          tacticalPloys: [],
          custom: []
        },
        showCardForm: false,
        cardIndex: null,
        cardName: "",
        cardFaction: "",
        cardType: "",
        cardCost: "",
        cardDescription: "",
        abilitiesType: "",
        actionType: "",
        importExportData: "",
        exportLink: "",
        operative: {
          m: "",
          apl: "",
          ga: "",
          df: "",
          sv: "",
          w: "",
          weapons: [],
          abilities: [],
          uniqueActions: []

        },
        card: {
          name: "",
          faction: "",
          type:"type",
          customType: "", 
          color: "#ff4f02",
          textColor: "#303030",
          cost: "",
          description: "",
          m: "",
          apl: "",
          ga: "",
          df: "",
          sv: "",
          w: "",
          weapons: [],
          abilities: [],
          uniqueActions: []
        }
      }
    },
    mounted() {
      this.factions = factions;
      this.cardTypes = cardTypes;
      this.weaponTypes = weaponTypes;

      const urlParams = new URLSearchParams(window.location.search);
      const data = urlParams.get('card');
      if(data){
        this.importExportData = atob(data);
        this.importCard();
      }
      
    },
    methods: {
      openCardForm(card, index){
        this.card = card;
        this.showCardForm = true;
        this.cardIndex = index;
      },
      addCardToList(list, card){
        if(this.cardIndex != null){
          this.list[list][this.cardIndex] = card;
        } else {
          this.list[list].push(card);
        }
        
        this.card = card;
        this.showCardForm = false;
      },
      setList(list){
        this.list = list;
      },
      showCard(card){
        this.card = card;
      },
      removeCard(type, index){
        this.list[type].splice(index, 1);
      },
      printCard(card){

        let cardTemplate = this.$refs.cardTemplate;

        setTimeout(function(){
          cardTemplate.getCard().then(canvas => {
              localStorage.setItem(this.card.name, canvas.toDataURL());
              window.open("/print?card=" + btoa(this.card.name), '_blank').focus();
          });  
        }, 500);
        
      },
      saveCardAsImage(){
        this.$refs.cardTemplate.getCard().then(canvas => {
          var link = document.createElement("a");
          link.download = this.card.name.replace(/[^0-9a-z]/gi, '_').toLowerCase() + ".png";
          link.href = canvas.toDataURL();
          link.click();
        });

      }
    }
  }
</script>

<style>

</style>
