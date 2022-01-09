<template>
  <div id="card" class="card-container">
    <div class="inner">
      <div class="title" v-bind:style="{ color: card.textColor, background: card.color }">
          <span>
            <div>{{ card.name }}</div>
          </span>
            <div style="margin-left: auto;order: 2;" v-show="card.type != 'operative' && card.cost.length > 0">[{{ card.cost }}<span v-show="card.type == 'strategic-ploy' || card.type == 'tactical-ploy'">CP</span><span v-show="card.type == 'equipment'">EP</span>]</div>
        </div>

        <img v-show="card.faction != ''" class="bg-img" :src="'/faction-icons/' + card.faction + '.svg'">
        <img v-show="card.faction == ''" class="bg-img" src="/faction-icons/kill-team.svg">
         
        <div class="card-body"> 
            <div v-show="card.type != 'operative'">
              <p v-html="parseText(card.description)"></p>
            </div>
            <div v-show="card.type == 'operative'" class="stats">
              <table style="width:100%">
                <tr>
                    <th>M</th>
                    <th>APL</th>
                    <th>GA</th>
                </tr>
                <tr>
                    <td>{{ card.m }} ◯</td>
                    <td>{{ card.apl }}</td>
                    <td>{{ card.ga }}</td>
                </tr>
                <tr>
                    <th>DF</th>
                    <th>SV</th>
                    <th>W</th>
                </tr>
                <tr>
                    <td>{{ card.df }}</td>
                    <td>{{ card.sv }}+</td>
                    <td>{{ card.w}}</td>
                </tr>
                </table> 
            </div>
            <div v-show="card.type == 'operative'" class="weapon">
                <br>
                <table style="width:100%">
                <tr>
                    <th style="text-align: left;">Weapon</th>
                    <th>A</th>
                    <th>BS/WS</th>
                    <th>D</th>
                    <th>SR</th>
                    <th>!</th>
                </tr>
                <tr v-for="(weapon, index) in card.weapons" :key="index">
                    <td style="text-align: left;">
                      <span v-if="weapon.type && weapon.type =='range'">⌖ </span>
                      <span v-if="weapon.type && weapon.type =='melee'">⚔ </span>
                      {{ weapon.name }}
                    </td>
                    <td>{{ weapon.a }}</td>
                    <td>{{ weapon.bsws }}+</td>
                    <td>{{ weapon.d }}</td>
                    <td><span v-if="weapon.sr.length > 0" v-html="parseText(weapon.sr)"></span><span v-else>-</span></td>
                    <td><span v-if="weapon.crit.length > 0" v-html="parseText(weapon.crit)"></span><span v-else>-</span></td>
                </tr>
                </table> 
            </div> 
              
            <div v-show="card.type == 'operative' && card.abilities.length > 0" class="abilities">
                <div class="abilities-title">Abilities</div>
                <div class="abilities-body">
                  <p v-for="(ability, index) in card.abilities" :key="index"><b>{{ ability.name }}</b><span v-show="ability.description.length > 0">: </span><span v-html="parseText(ability.description)"></span></p>
                </div>
            </div>
            <div v-show="card.type == 'operative' && card.uniqueActions.length > 0" class="abilities">
                <div class="abilities-title" :style= "[card.abilities.length == 0 ? {marginTop: '10px'} : {marginTop: '0px'}]">Unique Actions</div>
                <div class="abilities-body">
                  <p v-for="(uniqueAction, index) in card.uniqueActions" :key="index"><b>{{ uniqueAction.name }}</b><span v-show="uniqueAction.description.length > 0">: </span><span v-html="parseText(uniqueAction.description)"></span></p>
                </div>
            </div>
        </div>
        
        <div v-show="card.type != 'operative' && card.type != 'type'" class="card-type">
          <span v-show="card.type == 'equipment'">Equipment</span>
          <span v-show="card.type == 'strategic-ploy'">Strategic ploy</span>
          <span v-show="card.type == 'tactical-ploy'">Tactical ploy</span>
          <span v-show="card.type == 'custom'">{{ card.customType }}</span>
        </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['card'],
    data(){
      return {}
    },
    mounted() {},
    methods: {
      parseText(text){

        var weponRegex = /\%(.*?)\%/gi;
        var weaponText = weponRegex.exec(text);
        if(weaponText){
          var weapon = {}
          
          weaponText[1].split(";").forEach(text => {
            var w = text.split(":");
            weapon[w[0].trim()] = w[1].trim();
          });
          
          let addSpecialRules = (title, weapon, key) => {
            if(weapon.hasOwnProperty(key)){
              return `
                <table style="width: 100%;border-collapse: collapse;">
                  <tr style="font-size: large;">
                      <th style="background: #303030;color: #fff;text-transform: uppercase;padding: 5px;">${ title }</th>
                  </tr>
                  <tr style="font-size: large;">
                      <td style="padding-bottom: 5px;padding-top: 5px;">${ this.parseText(weapon[key]) }</td>
                  </tr>
                </table>
              `;
            } else {
              return "";
            }
          }

          if(weapon.hasOwnProperty('name') &&
            weapon.hasOwnProperty('a') &&
            weapon.hasOwnProperty('bsws') &&
            weapon.hasOwnProperty('d')){
            var table = `
              <table style="width: 100%;border-collapse: collapse;margin-top:10px;">
                  <tr style="font-size: large;">
                      <th style="background: #303030;color: #fff;text-transform: uppercase;padding: 5px;">Weapon</th>
                      <th style="background: #303030;color: #fff;text-transform: uppercase;padding: 5px;text-align: center;">A</th>
                      <th style="background: #303030;color: #fff;text-transform: uppercase;padding: 5px;text-align: center;">BS/WS</th>
                      <th style="background: #303030;color: #fff;text-transform: uppercase;padding: 5px;text-align: center;">D</th>
                  </tr>
                  <tr style="font-size: large;">
                      <td style="padding-bottom: 5px;padding-top: 5px;">${ weapon.name }</td>
                      <td style="text-align: center;padding-bottom: 5px;padding-top: 5px;">${ weapon.a }</td>
                      <td style="text-align: center;padding-bottom: 5px;padding-top: 5px;">${ weapon.bsws }</td>
                      <td style="text-align: center;padding-bottom: 5px;padding-top: 5px;">${ weapon.d }</td>
                  </tr>
                </table>
                ${ addSpecialRules("Special Rules", weapon, "sr") }
                ${ addSpecialRules("!", weapon, "crit") }
              `;
            text = text.replace(weaponText[0], table);
          }

        }

        return text.replace(new RegExp("{c}", 'g'), '◯')
                  .replace(new RegExp("{s}", 'g'), '<span style="color:blue;">■</span>')
                  .replace(new RegExp("{t}", 'g'), '▲')
                  .replace(new RegExp("{p}", 'g'), '<span style="color:red;">⬟</span>')
                  .replace(new RegExp("&&", 'g'), '<br><br>')
                  .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
                  .replace(/\[(.*?)\]/gi, '<h3 style="margin-top: 10px; background: rgb(255, 79, 2) none repeat scroll 0% 0%; padding: 7px; height: 1%; color: rgb(48, 48, 48); display: flex; place-content: center; flex-direction: column; border: 1px solid rgb(48, 48, 48); text-transform: uppercase; font-size: large;">$1</h3>');;




      },
      getCard(){
        return html2canvas(document.querySelector("#card"));
      } 
    }
  }
</script>

<style scoped>
.card-container {
  background: #303030;
  width: 500px;
  height: 700px;
  padding: 10px;
  font-family: arial;
  position: relative;
}

.inner {
  background: #fff;
  height: 100%;
  position: relative;
}

.bg-img {
  opacity: 0.1;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0); 
  width: 70%;
  height: 30%;
}

.card-body {
  position: relative;
  padding:10px;
}

.title {
  background: #ff4f02;
  padding: 10px;
  height: 10%;
  font-weight: bold;
  color: #303030;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #303030;
  text-transform: uppercase;
  margin-bottom: 2px;
  font-size: larger;
}

.weapon{
  margin-top: -15px;
}
  
.faction-img {
  position: relative;
  width: 40px; 
  height: 23.09px;
  background-color: #303030;
  margin: 11.55px 0;
  margin-right: 10px;
  background-image: url(/faction-incons/tomb-worlds.svg);
  background-size: cover;
}

.faction-img:before,
.faction-img:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}

  .faction-img:before {
    bottom: 100%;
    border-bottom: 11.55px solid #303030;
  }

  .faction-img:after {
    top: 100%;
    width: 0;
    border-top: 11.55px solid #303030;
  }

  .heading {
    color: #33aabb;
  }

  .abilities-title {
    margin-top: 10px;
    margin-bottom: 5px;
    background: #ff4f02;
    padding: 7px;
    height: 1%;
    color: #303030;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    border: 1px solid #303030;
    text-transform: uppercase;
    font-size: large;
  }

  .abilities-body {
    padding:10px;
    padding-top: 0px;
    line-height: normal;
    font-size: medium;
  }

  .abilities-body > p {
    margin: 0 !important;
  }

  .abilities-body > p:not(:first-of-type) {
    margin-top: 5px !important;
  }

  table {
    border-collapse: collapse;
  }

  tr {
    font-size: large;
  }

  tr:nth-child(odd) {
    background-color: #f2f2f2;
  }

  th {
    background: #303030;
    color: #fff;
    text-transform: uppercase;
    padding: 5px;
    text-align: center;
  }

  td {
      text-align: center;
      padding-bottom: 5px;
      padding-top: 5px;
  }

  .card-type {
    background: #303030;
    color: #f2f2f2;
    font-size: large;
    margin-left: auto; 
    margin-right: auto;
    padding-left: 5px;
    padding-right: 5px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>
