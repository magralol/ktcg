<template>
    <div>
        <label for="ability-name" class="form-label">Name</label>
        <input type="text" class="form-control" id="ability-name" v-model="equipment.name" placeholder="">

        <br>

        <label for="ability-cost" class="form-label">Cost</label>
        <input type="number" class="form-control" id="ability-cost" v-model="equipment.cost" placeholder="">

        <br>

        <label for="ability-desc" class="form-label">Description</label>
        <textarea class="form-control" id="ability-desc" v-model="equipment.description" placeholder=""></textarea>

        <div class="d-grid gap-2 mt-4 d-block">
            <button class="btn btn-primary" type="button" @click="save()">Save</button>
            <button v-show="isUpdate(props.data)" class="btn btn-danger" type="button" @click="emit('remove', 'equipment')">Remove</button>
        </div>
    </div>

</template>

<script setup>
    import { ref, watch, defineExpose, defineProps } from 'vue';

    const emit = defineEmits(["save", "remove"]);
    const props = defineProps(["data"]);

    let equipment = ref({
        name: "",
        cost: "",
        description: ""
    });

    if(isUpdate(props.data))
        equipment.value = props.data;

    watch(() => props.data, (newVal) => {
        if(isUpdate(newVal))
            equipment.value = newVal;
    });

    function isUpdate(data) {
        return (Object.keys(data).length > 0);
    }

    function save() {
        emit('save', "equipment", isUpdate(props.data), equipment.value);
    }

</script>

<style scoped>
</style>
