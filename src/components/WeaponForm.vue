<template>
    <div>
        <label for="weapon-name" class="form-label">Name</label>
        <input type="text" class="form-control" id="weapon-name" placeholder="">

        <hr>

        <select class="form-select">
            <option value="" selected>Type</option>
            <option value="range">Range</option>
            <option value="melee">Melee</option>
        </select>

        <hr>

        <div class="row row-cols-3">
            <div class="col">
            <label for="weapon-attack" class="form-label">A</label>
            <input type="text" class="form-control" id="weapon-attack" placeholder="">      
            </div>
            <div class="col">
            <label for="weapon-bs-ws" class="form-label">BS/WS</label>
            <input type="text" class="form-control" id="weapon-bs-ws" placeholder="">
            </div>
            <div class="col">
            <label for="weapon-damage" class="form-label">D</label>
            <input type="text" class="form-control" id="weapon-damage" placeholder=""> 
            </div>
        </div>

        <hr>

        <label for="weapon-sr" class="form-label">SR</label>
        <input type="text" class="form-control" id="weapon-sr" placeholder="">

        <hr>

        <label for="weapon-crit" class="form-label">!</label>
        <input type="text" class="form-control" id="weapon-crit" placeholder="">
    </div>

</template>

<script setup>

</script>

<style scoped>
</style>
