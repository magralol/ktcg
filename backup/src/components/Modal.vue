<template>
    
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ props.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <slot></slot>

        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
    
    import { ref, watch, onMounted, defineProps } from 'vue';
    const props = defineProps(["show", "title"]);
    const emit = defineEmits(["onComplete"]);

    const modal = ref(null);

    onMounted(() => {
        modal.value = new bootstrap.Modal(document.getElementById('modal'), { keyboard: false });
    });

    watch(() => props.show, (newVal) => {
        /*
        console.log("modal", newVal);
        if(newVal) {
            modal.value.show();
        } else {
            modal.value.hide();
        }*/
        modal.value.toggle();
    });

</script>

<style scoped>

</style>
