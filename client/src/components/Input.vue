<template>
  <!-- TODO: Add icon left/right -->
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="bg-gray-300 block w-full rounded py-1 px-2"
  />
</template>

<script lang="ts">
export default {
  props: ["modelValue"],
};
</script>

<style lang="scss"></style>
