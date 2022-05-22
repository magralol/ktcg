<template>
    <span class="badge bg-secondary">
        <div style="display: flex !important; align-items: center !important;"> 
            <div class="me-1">
                <div v-if="props.type == 'melee'">
                    <svg style="width:15px;height:15px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.2,2.44L18.1,14.34L20.22,12.22L21.63,13.63L19.16,16.1L22.34,19.28C22.73,19.67 22.73,20.3 22.34,20.69L21.63,21.4C21.24,21.79 20.61,21.79 20.22,21.4L17,18.23L14.56,20.7L13.15,19.29L15.27,17.17L3.37,5.27V2.44H6.2M15.89,10L20.63,5.26V2.44H17.8L13.06,7.18L15.89,10M10.94,15L8.11,12.13L5.9,14.34L3.78,12.22L2.37,13.63L4.84,16.1L1.66,19.29C1.27,19.68 1.27,20.31 1.66,20.7L2.37,21.41C2.76,21.8 3.39,21.8 3.78,21.41L7,18.23L9.44,20.7L10.85,19.29L8.73,17.17L10.94,15Z" />
                    </svg>
                </div>
                <div v-if="props.type == 'range'">
                    <svg style="width:15px;height:15px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" />
                    </svg>
                </div>
            </div>
            <div>
                {{ props.name }}
            </div>
        </div>
    </span>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    //import { Store } from '../store';

    const props = defineProps(['name', "type"]);
    
    /*
    const store = Store();

    const weapon = ref({
        id: 0,
        type: "",
        name: "",
    });
    */
    /*
    onMounted(() => {
        weapon.value = store.getWeapon(props.rosterId, props.weaponId)[0];
    });
    */
</script>

<style scoped>

.badge {
    cursor:pointer;
}

</style>

