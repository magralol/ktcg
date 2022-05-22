<template>
    <span class="badge bg-secondary">{{ props.text }}</span>
</template>

<script setup>
    const props = defineProps(['text']);
</script>

<style scoped>
.badge {
    cursor:pointer;
}
</style>

