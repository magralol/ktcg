<template>
    <div class="alert" :class="'alert-'+type" role="alert">
        <i v-if="icon" class="fas" :class="icon" style="border-right: 1px solid;margin-right: 5px;padding-right: 5px;"></i>
        <slot></slot>
    </div>
</template>

<script>
  export default {
    props: ['type'],
    data(){
      return {
        icon: null,
      }
    },
    mounted() {
        switch (this.type) {
            case "info":
                this.icon = "fa-info-circle";
                break;
            case "warning":
                this.icon = "fa-exclamation-circle";
                break;
            case "danger":
                this.icon = "fa-times";
                break;
            default:
                this.icon = null;
                break;
        }
    },
    methods: {}
  }
</script>

<style>

</style>
