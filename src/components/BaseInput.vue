<template>
  <div>
    <div class="base-input">
      <input type="text" :value="value" @input="$emit('input', $event.target.value)">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value'],
  }
</script>
