<template>
    
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar" style="border-right: 1px solid #6c757d !important; height: 100vh;">
        <div class="position-sticky pt-3">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/rosters">KTRM</a>
                </li>
                <hr>
                <slot></slot>
            </ul>
            <hr>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Rosters</span>
            </h6>
            <ul class="nav flex-column mb-2">
                <li class="nav-item" v-for="(roster, index) in store.rosters">
                    <a class="nav-link" :href="'/roster/' + index">
                        <p style="margin-bottom: -5px;">{{ roster.name }}</p>
                        <small class="text-muted">{{ roster.faction.display }}</small>
                    </a>
                </li>    
            </ul>
        </div>
    </nav>
</template>

<script setup>
    import { Store } from '../store';

    const store = Store();
    const props = defineProps(['page']);
</script>

<style scoped>

</style>
