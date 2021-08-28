<template>

    <div class="card" style="margin-top: 10px;">
        <div class="card-body">

            <label for="list-name" class="form-label" style="width:100%;">Name 
              <!--<span class="badge bg-primary" style="float: right; cursor: pointer;margin-left:10px;" v-on:click="printList()">Print</span>-->
              <span class="badge bg-primary" style="float: right; cursor: pointer;margin-left:10px;" v-on:click="exportList()">Export</span>
              <input style="display:none;" id="listInput" type="file" accept="application/json" v-on:change="loadList($event)">
              <span class="badge bg-primary" style="float: right; cursor: pointer;" v-on:click="importList()">Import</span>
            </label>
            <input type="text" class="form-control" id="list-name" v-model="list.name" placeholder="">

            <hr>
            <ul class="list-group">
                <p class="list-title" style="margin-top: 0;">Operatives</p>
                <li class="list-group-item" v-for="(operative, index) in list.operatives" :key="index" @click.self="editCard(operative, index)">
                    {{ operative.name }}<span style="float:right;" @click="removeCard('operatives', index)"><i class="fas fa-times"></i></span>
                </li>
                
                <p class="list-title">Equipments</p>
                <li class="list-group-item" v-for="(equipment, index) in list.equipments" :key="index" @click.self="editCard(equipment, index)">
                    {{ equipment.name }} <span style="float:right;" @click="removeCard('equipments', index)"><i class="fas fa-times"></i></span>
                </li>
                
                <p class="list-title">Strategic Ploys</p>
                <li class="list-group-item" v-for="(sploy, index) in list.strategicPloys" :key="index" @click.self="editCard(sploy, index)">
                    {{ sploy.name }} <span style="float:right;" @click="removeCard('strategicPloys', index)"><i class="fas fa-times"></i></span>
                </li>
                
                <p class="list-title">Tactical Ploys</p>
                <li class="list-group-item" v-for="(tploy, index) in list.tacticalPloys" :key="index" @click.self="editCard(tploy, index)">
                    {{ tploy.name }} <span style="float:right;" @click="removeCard('tacticalPloys', index)"><i class="fas fa-times"></i></span>
                </li>
                
                <p class="list-title">Custom</p>
                <li class="list-group-item" v-for="(custom, index) in list.custom" :key="index" @click.self="editCard(custom, index)">
                    {{ custom.name }} <span style="float:right;" @click="removeCard('custom', index)"><i class="fas fa-times"></i></span>
                </li>

            </ul>
            
            <hr>

            <div class="d-grid gap-2">
                <button class="btn btn-primary" type="button" v-on:click="addCard()">Add Card</button>
            </div>

        </div>
    </div>

    
</template>

<script>
  export default {
     props: ['list'],
    data(){
      return {}
    },
    mounted() {},
    methods: {
        importList(){
            document.getElementById('listInput').click();
        },
        loadList($event){
            let parent = this.$parent;
            let reader = new FileReader();
            
            reader.onload = function(){
                parent.setList(JSON.parse(reader.result));
            };
            
            reader.readAsText($event.target.files[0]);
        },
        exportList(){

            var a = document.createElement('a');
            a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.list, null, 2));
            a.download = `${this.list.name.replace(/[^0-9a-z]/gi, '_').toLowerCase()}.json`;
            a.click();

        },
        printList(){
            window.open("/print?list=" + encodeURIComponent(JSON.stringify(this.list)), '_blank').focus();
        },
        printCard(card){
            window.open("/print?card=" + encodeURIComponent(JSON.stringify(card)), '_blank').focus();
        },
        showCard(card){
            this.$parent.showCard(card);  
        },
        addCard(){
            this.$parent.openCardForm({
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
            }, null);
        },
        editCard(card, index){
            this.$parent.openCardForm(card, index);
        },
        removeCard(type, index){
            this.list[type].splice(index, 1);
        },
    }
  }
</script>

<style scoped>

    .list-group-item {
        cursor: pointer !important;
    }

    .list-title {
        margin: 0;
        margin-top: 10px;
        margin-bottom: 5px;
    }

</style>
