<template>
  <div>
    <div class="patient-input-phone">
      <div class="patient-input-phone__label" @click="$refs.phone.focus()">
        {{label}}
      </div>
      <div class="patient-input-phone__input">
        <input ref="phone" class="patient-input-phone__input__input" type="number" :value="value" @input="$emit('input', $event.target.value)" placeholder="+7 342 2123456">
      </div>
    </div>
  </div>
</template>

<style scoped>
  .patient-input-phone { display: flex; width: 100%; justify-content: space-between; align-items: center; }
  .patient-input-phone__input { margin-left: 10px; border: 1px solid rgba(0,0,0,.25); border-radius: 4px; }
  .patient-input-phone__input__input { padding: 5px 8px; border: none; text-align: center; width: 9em; }
</style>

<script>
  export default {
    props: {
      value: {
        type: String,
      },
      label: {
        type: String,
      },
    },
  }
</script>
