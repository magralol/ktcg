import XMLParser from "fast-xml-parser";
import get from 'lodash.get';
import battleScribeLinks from "../data/battlescribe-links.json";

export default class Battlescribe {
    constructor(faction){
        this.faction = faction;
        this.abilities = [];
        this.operatives = [];
        this.weapons = [];
        this.equipments = [];
    }

    _parseProfileData(profile){
        if(profile.attr["@_name"] != "Shape Reference"){
            //console.log("profile ", profile);
            switch (profile.attr["@_typeName"]) {
                
                case "Operative":
                    const operativeName = get(profile, "attr.@_name", "");
                    const M = Number(get(profile, "characteristics.characteristic[0].#text", "").replace("⬤", ""));
                    const APL = Number(get(profile, "characteristics.characteristic[1].#text", ""));
                    const GA = Number(get(profile, "characteristics.characteristic[2].#text", ""));
                    const DF = Number(get(profile, "characteristics.characteristic[3].#text", ""));
                    const SV = Number(get(profile, "characteristics.characteristic[4].#text", "").replace("+", ""));
                    const W = Number(get(profile, "characteristics.characteristic[5].#text", ""));
                    
                    this.operatives.push({
                        name: operativeName,
                        M,
                        APL,
                        GA,
                        DF,
                        SV,
                        W
                    });
                    break;
                case "Abilities":
                    
                    const name = get(profile, "attr.@_name", "");
                    const description = get(profile, "characteristics.characteristic.#text", "");

                    this.abilities.push({
                        name,
                        description
                    });

                    break;
            }
        }
    }

    _parseWeaponData(weapon) {
        /* TODO: This can probebly be done in a better way then duplication the code */
        if(get(weapon, "profiles.profile", null)){
            if(Array.isArray(weapon.profiles.profile)){

                weapon.profiles.profile.forEach( profile => {

                    let name = get(profile, "attr.@_name", "");
                    let type;
                    if(name.indexOf("⚔ ") != -1){
                        type = "melee";
                        name = name.replace("⚔ ", "");
                    } else {
                        type = "range";
                        name = name.replace("⌖ ", "");
                    }
                    let A = Number(get(profile, "characteristics.characteristic[0].#text", 0));
                    let BSWS = Number(get(profile, "characteristics.characteristic[1].#text", "").replace("+", ""));
                    let D = get(profile, "characteristics.characteristic[2].#text", "");
                    let SR = get(profile, "characteristics.characteristic[3].#text", "");
                    let CRIT = get(profile, "characteristics.characteristic[4].#text", "");

                    if(A != 0){
                        this.weapons.push({
                            name,
                            type,
                            A,
                            BSWS,
                            D,
                            SR,
                            CRIT
                        });
                    }

                });

            } else {
                let name = get(weapon, "profiles.profile.attr.@_name", "");
                let type;
                if(name.indexOf("⚔ ") != -1){
                    type = "melee";
                    name = name.replace("⚔ ", "");
                } else {
                    type = "range";
                    name = name.replace("⌖ ", "");
                }
                let A = Number(get(weapon, "profiles.profile.characteristics.characteristic[0].#text", 0));
                let BSWS = Number(get(weapon, "profiles.profile.characteristics.characteristic[1].#text", "").replace("+", ""));
                let D = get(weapon, "profiles.profile.characteristics.characteristic[2].#text", "");
                let SR = get(weapon, "profiles.profile.characteristics.characteristic[3].#text", "");
                let CRIT = get(weapon, "profiles.profile.characteristics.characteristic[4].#text", "");

                if(A != 0){
                    this.weapons.push({
                        name,
                        type,
                        A,
                        BSWS,
                        D,
                        SR,
                        CRIT
                    });
                }
            }
        }
    }

    _parseEquipmentData(equipments){

        equipments.forEach(equipment => {
            //console.log(equipment);
            if(get(equipment, "profiles.profile.attr.@_typeName", "") == "Weapons"){
                console.log("TODO: Implement weapon equipments");
            } else {
            
                const name = get(equipment, "attr.@_name", "");
                const cost = Number(get(equipment, "costs.cost.attr.@_value", null));
                const description = get(equipment, "profiles.profile.characteristics.characteristic.#text", "")
                //console.log(name, cost, description);
                if(name != "" && cost && description != ""){
                    this.equipments.push({
                        name,
                        cost,
                        description
                    });
                }
            }
        });

    }

    async load(){
        console.log(XMLParser);
        const response = await fetch(battleScribeLinks[this.faction]);
        const xml = await response.text();
        const data = XMLParser.parse(xml, {
            attributeNamePrefix : "@_",
            attrNodeName: "attr", //default is 'false'
            textNodeName : "#text",
            ignoreAttributes : false,
            ignoreNameSpace : false,
            allowBooleanAttributes : true,
            parseNodeValue : true,
            parseAttributeValue : false,
            trimValues: true,
            cdataTagName: "__cdata", //default is 'false'
            cdataPositionChar: "\\c",
            parseTrueNumberOnly: false,
            arrayMode: false, //"strict"
            attrValueProcessor: (val, attrName) => {
              return val;
            },//default is a=>a
            tagValueProcessor : (val, tagName) => {
              if(val != "")
                return val;
                //console.log(val)
            }, //default is a=>a
            stopNodes: ["parse-me-as-string"]
        });
        console.log(data);

        
        const sharedProfiles = get(data, "catalogue.sharedProfiles.profile", []);
        sharedProfiles.forEach(profile => {
            this._parseProfileData(profile);
        });

        let equipments = get(data, "catalogue.sharedSelectionEntryGroups.selectionEntryGroup", []);
        if(Array.isArray(equipments)){
            equipments = equipments.filter(entry => entry.attr["@_name"] == "Equipment")[0].selectionEntries.selectionEntry;
            this._parseEquipmentData(equipments);
            /*
            equipments.forEach(equipment => {
                //console.log(equipment);
                if(get(equipment, "profiles.profile.attr.@_typeName", "") == "Weapons"){
                    console.log("TODO: Implement weapon equipments");
                } else {
                
                    const name = get(equipment, "attr.@_name", "");
                    const cost = Number(get(equipment, "costs.cost.attr.@_value", null));
                    const description = get(equipment, "profiles.profile.characteristics.characteristic.#text", "")
                    //console.log(name, cost, description);
                    if(name != "" && cost && description != ""){
                        this.equipments.push({
                            name,
                            cost,
                            description
                        });
                    }
                }
            });
            */
        } else {
            //console.log("equipments!", equipments);
            this._parseEquipmentData(get(equipments, "selectionEntries.selectionEntry", []));
            
        }
        

        
        const sharedSelectionEntries = get(data, "catalogue.sharedSelectionEntries.selectionEntry", []);
        sharedSelectionEntries.forEach(entry => {
            //console.log("entry", entry);
            switch (entry.attr["@_type"]) {
                case "model":
                    //const operativeName = get(profile, "attr.@_name", "");
                    const entryProfiles = get(entry, "profiles.profile", []);
                    if(Array.isArray(entryProfiles)){
                        entryProfiles.forEach(profile => {
                            this._parseProfileData(profile);
                        });
                    } else {
                        this._parseProfileData(entryProfiles);
                    }

                    const selectionEntries = get(entry, "selectionEntryGroups.selectionEntryGroup.selectionEntries.selectionEntry", []);
                    if(Array.isArray(selectionEntries)){
                        selectionEntries.forEach(entry => {
                            const multipleWeapons = get(entry, "selectionEntries.selectionEntry", []);
                            if(multipleWeapons.length){
                                multipleWeapons.forEach(weapon => {
                                    this._parseWeaponData(weapon);
                                });
                            } else {
                                this._parseWeaponData(entry);
                            }
                        });
                    } else {
                        console.log("TODO: is not a array");
                    }
                    break;
                case "upgrade":
                    /* This section got realy complicated */
                    if(get(entry, "profiles.profile", null)){
                        this._parseWeaponData(entry);
                    } else {
                        if(!get(entry, "categoryLinks", null)){
                            const selectionEntries = get(entry, "selectionEntries.selectionEntry", []);
                            if(Array.isArray(selectionEntries)){
                                selectionEntries.forEach(entry => {
                                    this._parseWeaponData(entry);
                                });
                            } else {
                                this._parseWeaponData(selectionEntries);
                            }

                        } else {
                            // something else like psycic powers for tsons
                        }
                    }
                    break;
            }
        });

        /*
        console.log("operatives", this.operatives);
        console.log("abilities", this.abilities);
        console.log("Equipments ", this.equipments);
        console.log("weapons", this.weapons);
        */
        //console.log("data: ", get(data, "catalogue.sharedSelectionEntries.selectionEntry", []));
    }

    getOpratives(){ return this.operatives }
    getWeapons(){ return this.weapons }
    getEquipments(){ return this.equipments }
    getAbilities(){ return this.abilities }
}