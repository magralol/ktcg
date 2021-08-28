<template>
  <textarea class="form-control" style="height: 100px" rows="3" v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>

<script>
  export default {
    props: ['modelValue'],
    data(){
      return {
        editor: null,
      }
    },
    mounted() {},
    methods: {}
  }
</script>

<style>

</style>
