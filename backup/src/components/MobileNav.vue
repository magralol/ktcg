<template>
    
    <a data-bs-toggle="offcanvas" href="#offcanvasNav" role="button" aria-controls="mobiel nav"><i class="fa-solid fa-ellipsis-vertical"></i></a>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNav" aria-labelledby="mobiel nav">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title">{{ props.title }}</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="position-sticky">
                <ul class="nav flex-column">
                    <slot></slot>
                </ul>
                <hr>
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Rosters</span>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item" style="text-align: initial;" v-for="(roster, index) in store.rosters">
                        <a class="nav-link" :href="'/roster/' + index">
                            <p style="margin-bottom: -5px;">{{ roster.name }}</p>
                            <small class="text-muted">{{ roster.faction.display }}</small>
                        </a>
                    </li>    
                </ul>
            </div>
        </div>
    </div>

</template>

<script setup>
    import { Store } from '../store';

    const store = Store();
    const props = defineProps(['title']);
</script>

<style scoped>

</style>
