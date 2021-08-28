<template>
  <div class="d-print-none d-flex justify-content-center p-2">
    <input style="display:none;" id="cardInput" type="file" accept="image/png, application/json" multiple v-on:change="loadCards($event)">
    <button class="btn btn-primary" style="margin-right: 10px;" v-on:click="addCards()">Add Cards</button>
    <button class="btn btn-primary" style="margin-right: 10px;" v-on:click="printCards()">Print Cards</button>
  </div>
  <img v-for="(card, index) in cards" :key="index" v-bind:src="card" :alt="'{{card}} {{index}}'" height="330" width="235" style="margin: 0 3px 3px 0;">

  <CardTemplate class="d-print-none" style="margin-left: -1000px;" :card="cardData" ref="cardTemplate"></CardTemplate>

</template>

<script>
  import CardTemplate from './CardTemplate.vue';

  export default {
    components:{
      CardTemplate
    },
    data(){
      return {
        showCard: false,
        cards: [],
        cardData: {
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
      
      /* TODO: Figure out how to do
      const urlParams = new URLSearchParams(window.location.search);
      const card = urlParams.get('card');

      const list = urlParams.get('list');
      
      if(card){

        let t = this;
        t.cardData = JSON.parse(atob(card));

        setTimeout(function(){
          t.$refs.cardTemplate.getCard().then(canvas => {
            t.cards.push(canvas.toDataURL());
          });
        }, 250);
      }

      if(list){
        let cards = this.concatCardList(JSON.parse(list));
        this.loadCardsFromList(0, cards);
      }
      */
    },
    methods: {
      addCards(){
        document.getElementById('cardInput').click();
      },
      concatCardList(data){
        let cards = [];
        cards = cards.concat(data.operatives);
        cards = cards.concat(data.equipments);
        cards = cards.concat(data.strategicPloys);
        cards = cards.concat(data.tacticalPloys);
        cards = cards.concat(data.custom);
        return cards;
      },
      loadCardsFromList(index, cards){
        let t = this;
        t.cardData = cards[index];
        setTimeout(function() { 
          index++;
          t.$refs.cardTemplate.getCard().then(canvas => {
            t.cards.unshift(canvas.toDataURL());
            if (index < cards.length) {  
              t.loadCardsFromList(index, cards); 
            }   
          });
        }, 250);
      },
      loadCardAsJson(file){
        let reader = new FileReader();
        let t = this;

        reader.onload = function(){
          let data = JSON.parse(reader.result);
          if(data.hasOwnProperty('operatives')){
            t.loadCardsFromList(0, t.concatCardList(data));
          } else {
            t.cardData = data;

            setTimeout(function(){
              t.$refs.cardTemplate.getCard().then(canvas => {
                t.cards.unshift(canvas.toDataURL());
              });
            }, 250);
          }
          

        };
        reader.readAsText(file);
      },
      loadCardsAsImage(file){
        let cards = this.cards;

        let reader = new FileReader();
        reader.onload = function(){
          cards.unshift(reader.result);
        };
        reader.readAsDataURL(file);
      },
      loadCards($event){
        let cards = this.cards;

        Object.keys($event.target.files).forEach(i => {
          if($event.target.files[i].type == "application/json"){
            this.loadCardAsJson($event.target.files[i]);
          } else{
            this.loadCardsAsImage($event.target.files[i]);
          }
        })
      },
      printCards(){
        window.print();
      }
    }
  }
</script>

<style>

</style>
