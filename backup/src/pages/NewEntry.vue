<template>
    <div style="max-width: 500px; margin:0 auto;">
        <br>
        <h1 style="text-align:center;">Create a new {{ route.params.type }}</h1>

        <div class="card">
        <div class="card-body">
            <!--
            <OperativeForm v-if="route.params.type=='operative'" ref="operativeFormRef"/>
            <WeaponForm v-if="route.params.type=='weapon'" ref="weaponFormRef" />
            <AbilitiesForm v-if="route.params.type=='ability'" ref="abilityFormRef" />
            -->
            <component :is="formComponent" ref="formRef"/>
        </div>
        </div>
        <br>
        <button class="btn btn-primary float-end" @click="save()">Create</button>
    </div>
</template>

<script setup>
    import { ref, shallowRef } from "vue";
    import { useRoute, useRouter } from 'vue-router';
    import { Store } from '../store';
    import OperativeForm from "../components/OperativeForm.vue";
    import WeaponForm from "../components/WeaponForm.vue";
    import AbilitiesForm from "../components/AbilityForm.vue";

    const route = useRoute();
    const router = useRouter();
    const store = Store();
    let operativeFormRef = ref();
    let weaponFormRef = ref();
    let abilityFormRef = ref();
    const formRef = ref();

    let formComponent = shallowRef();
    switch (route.params.type) {
        case "operative":
            formComponent.value = OperativeForm;
            break;
        case "weapon":
            formComponent.value = WeaponForm;
            break;
        case "ability":
            formComponent.value = AbilitiesForm;
            break;
    
    }

    function save() {
        formRef.value.save();
        router.push({ path: '/roster' });
    }

</script>

<style scoped>

</style>

