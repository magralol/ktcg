/*
    NOTE: This file is a mess, becous Battlescribes data format is a mess...
*/
import xml from "fast-xml-parser";

function parseXMLData(xmlData) {
    let options = {
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
    };

    return xml.parse(xmlData, options);
}

function getEquipments(data) {
    //console.log("EQ DATA", data);
    let equpments = data.catalogue.sharedSelectionEntryGroups.selectionEntryGroup.filter(eq => eq.attr["@_name"] == "Equipment")[0].selectionEntries.selectionEntry;
    let cards = [];
    //console.log("EQUIPMENTS", equpments);
    equpments.forEach(equipment => {
        if(typeof equipment.profiles.profile != "Array") {
            //console.log("equipment", equipment);
            cards.push({
                name: equipment.attr["@_name"],
                description: equipment.profiles.profile.characteristics.characteristic["#text"]
            });
        }
    });
    return cards;
}

function getInfoLinks(name, data) {
    //console.log("data.catalogue.sharedProfiles", data.catalogue.sharedProfiles)
    return data.catalogue.sharedProfiles.profile.filter(eq => eq.attr["@_name"] == name)[0]
}

function getWeapons(data) {

    return {
        name: data.attr["@_name"],
        a: String(data.characteristics.characteristic[0]["#text"]),
        bsws: String(data.characteristics.characteristic[1]["#text"]).replace("+", ""),
        d: String(data.characteristics.characteristic[2]["#text"]),
        sr: (data.characteristics.characteristic[3].hasOwnProperty('#text'))? String(data.characteristics.characteristic[3]["#text"]) : "-",
        crit: (data.characteristics.characteristic[4].hasOwnProperty('#text'))? String(data.characteristics.characteristic[4]["#text"]) : "-"
    }

}

export default {
    getEntries(data){
        let parsedData = parseXMLData(data);
        let entries = parsedData.catalogue.entryLinks.entryLink;
        let cards = {
            operatives: [],
            // TODO: This maybe??!?!?!?!
            //equipments: getEquipments(parsedData)
        }

        entries.forEach(entry => {
            cards.operatives.push({
                id: entry.attr["@_id"],
                name: entry.attr["@_name"]
            });
        });

        return cards;
    },
    getCards(data){
        let parsedData = parseXMLData(data);
        let entries = parsedData.catalogue.entryLinks.entryLink;
        let cards = {
            operatives: [],
            // TODO: This maybe??!?!?!?!
            //equipments: getEquipments(parsedData)
        }

        entries.forEach(entry => {
            console.log(entry.attr["@_name"]);
            cards.operatives.push(this.getOperative(data, entry.attr["@_name"]));
        });

        return cards;
    },
    getOperative(xmlData, name){
        let data = parseXMLData(xmlData);
        let operative = {
            name: name,
            m: "",
            apl: "",
            ga: "",
            df: "",
            sv: "",
            w: "",
            weapons: [],
            abilities: [],
            uniqueActions: []
          };
        //console.log("DATA ", data);
        let operativeData = data.catalogue.sharedSelectionEntries.selectionEntry.filter(card => name.includes(card.attr["@_name"]))[0];
        if(!operativeData.hasOwnProperty('profiles')){
            operativeData.profiles = {
                profile: []
            }
        } else {
            operativeData.test = {};
            console.log("operativeData.test", operativeData.test.length);
            if(operativeData.profiles.profile.length == undefined){
                console.log("HERE");
                let originalProfile = operativeData.profiles.profile;
                operativeData.profiles = {
                    profile: []
                };
                operativeData.profiles.profile.push(originalProfile);
            }
        }
        console.log("operativeData", operativeData);

        if(operativeData.hasOwnProperty('infoLinks')){
            if(operativeData.infoLinks.infoLink.length == undefined){
                operativeData.profiles.profile.unshift(getInfoLinks(operativeData.infoLinks.infoLink.attr["@_name"], data));
            } else {
                operativeData.infoLinks.infoLink.forEach(infoLink => {
                    operativeData.profiles.profile.unshift(getInfoLinks(infoLink.attr["@_name"],data));
                });
            }
        }
        
        if(operativeData.hasOwnProperty('selectionEntries')){

            //console.log("operativeData.selectionEntries.selectionEntry.profiles.profile", operativeData.selectionEntries.selectionEntry.profiles.profile);
            if(operativeData.selectionEntries.selectionEntry.hasOwnProperty('profiles')){
                if(typeof operativeData.selectionEntries.selectionEntry.profiles.profile == "object"){
                    operative.weapons.push(getWeapons(operativeData.selectionEntries.selectionEntry.profiles.profile));
                } else {
                    //console.log("SHOULD BE HERE");
                }
            } else {
                operativeData.selectionEntries.selectionEntry.forEach(entry => {
                    console.log("ENTRY", entry);
                    if(entry.profiles.profile[0] == undefined){
                        operative.weapons.push(getWeapons(entry.profiles.profile));
                    } else {
                        entry.profiles.profile.forEach(weapon => {
                            if(weapon.attr["@_typeName"] == "Weapons")
                                operative.weapons.push(getWeapons(weapon));

                            if(weapon.attr["@_typeName"] == "Abilities") {
                                 
                                operative.abilities.push({
                                    name: weapon.attr["@_name"],
                                    description: weapon.characteristics.characteristic["#text"],
                                });
                            }
                        });
                    }
                });
            }
            
            /*
            operativeData.selectionEntries.selectionEntry.selectionEntry.forEach(element => {
                
            });
            */
        }

        if(operativeData.hasOwnProperty('selectionEntryGroups')){
            
            if(operativeData.selectionEntryGroups.selectionEntryGroup.hasOwnProperty('selectionEntries')){
                operativeData.selectionEntryGroups.selectionEntryGroup.selectionEntries.selectionEntry.forEach(entry => {
                    if(entry.hasOwnProperty('profiles')){
                        if(entry.profiles.profile[0] == undefined){
                            operative.weapons.push(getWeapons(entry.profiles.profile));
                        } else {
                            entry.profiles.profile.forEach(weapon => {
                                operative.weapons.push(getWeapons(weapon));
                            });
                        }
                    } else {
                        if(entry.hasOwnProperty('selectionEntries')){
                            entry.selectionEntries.selectionEntry.forEach(entry => {
                                if(entry.profiles.profile[0] == undefined){
                                    operative.weapons.push(getWeapons(entry.profiles.profile));
                                } else {
                                    entry.profiles.profile.forEach(weapon => {
                                        operative.weapons.push(getWeapons(weapon));
                                    });
                                }
                            });
                        } else {
                            console.log("entry ELSE", entry);
                            entry.entryLinks.entryLink.forEach(entry => {
                                let card = data.catalogue.sharedSelectionEntries.selectionEntry.filter(card => card.attr["@_name"] == entry.attr["@_name"])[0];
                                if(card != undefined)
                                    operative.weapons.push(getWeapons(card.profiles.profile));
                            });
                        }
                    }
                });
            } else {
                if(operativeData.selectionEntryGroups.selectionEntryGroup.hasOwnProperty('entryLinks')){
                    operativeData.selectionEntryGroups.selectionEntryGroup.entryLinks.entryLink.forEach(entry => {
                        let card = data.catalogue.sharedSelectionEntries.selectionEntry.filter(card => card.attr["@_name"] == entry.attr["@_name"])[0];
                        console.log("CARD", card);
                        /*
                        if(card != undefined)
                            operative.weapons.push(getWeapons(card.profiles.profile));
                        */
                        let profile = card.profiles.profile;
                        if(profile[0] == undefined){
                            operative.weapons.push(getWeapons(profile));
                        } else {
                            profile.forEach(weapon => {
                                if(weapon.attr["@_typeName"] == "Weapons")
                                    operative.weapons.push(getWeapons(weapon));

                                if(weapon.attr["@_typeName"] == "Abilities") {
                                     
                                    operative.abilities.push({
                                        name: weapon.attr["@_name"],
                                        description: weapon.characteristics.characteristic["#text"],
                                    });
                                }
                            });
                        }
                    });
                } else {
                    operativeData.selectionEntryGroups.selectionEntryGroup.forEach(entry => {
                        if(entry.selectionEntries.selectionEntry[0] == undefined){
                            let profile = entry.selectionEntries.selectionEntry.profiles.profile;
                            if(profile[0] == undefined){
                                operative.weapons.push(getWeapons(profile));
                            } else {
                                profile.forEach(weapon => {
                                    operative.weapons.push(getWeapons(weapon));
                                });
                            }
                        } else {
                            entry.selectionEntries.selectionEntry.forEach(entry => {
                                if(entry.profiles.profile[0] == undefined){
                                    operative.weapons.push(getWeapons(entry.profiles.profile));
                                } else {
                                    entry.profiles.profile.forEach(weapon => {
                                        operative.weapons.push(getWeapons(weapon));
                                    });
                                }
                            });
                        }
                    });
                }
            }

        }

        if(operativeData.hasOwnProperty('entryLinks')){
            
            operativeData.entryLinks.entryLink.forEach(entry => {
                let card = data.catalogue.sharedSelectionEntries.selectionEntry.filter(card => card.attr["@_name"] == entry.attr["@_name"])[0];
                if(card != undefined)
                    operative.weapons.push(getWeapons(card.profiles.profile));
            });
           
        }
        
        if(operativeData.hasOwnProperty('profiles')){
            operativeData.profiles.profile.forEach(profile => {
                console.log("profile", profile);
                console.log(profile.attr["@_typeName"]);
                if(profile.attr["@_typeName"] == "Operative") {
                    profile.characteristics.characteristic.forEach(characteristic => {
                        operative[characteristic.attr["@_name"].toLowerCase()] = String(characteristic["#text"]).replace(/[^0-9]/g,'');
                    });
                }

                if(profile.attr["@_typeName"] == "Abilities") {
                    operative.abilities.push({
                        name: profile.attr["@_name"],
                        description: profile.characteristics.characteristic["#text"],
                    });
                }

                if(profile.attr["@_typeName"] == "Unique Actions") {
                    operative.uniqueActions.push({
                        name: profile.attr["@_name"],
                        description: profile.characteristics.characteristic["#text"],
                    });
                }
                
            });
        }

        //console.log("OPERATIVE", operative);
        return operative;

    }
}