<template>
  <div>
    <div class="patient-input-gender">
      <div class="patient-input-gender__label">
        {{label}}
      </div>
      <div class="patient-input-gender__input">
        <div :class="['patient-input-gender__input__option', {'selected': value == 'Мужской'}]" @click="select('Мужской')">
          Мужской
        </div>
        <div :class="['patient-input-gender__input__option', {'selected': value == 'Женский'}]" @click="select('Женский')">
          Женский
        </div>
        <div :class="['patient-input-gender__input__option', {'selected': value == null}]" @click="select(null)">
          ?
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .patient-input-gender { display: flex; justify-content: space-between; align-items: center; }
  .patient-input-gender__input { display: flex; }
  .patient-input-gender__input__option { color: rgba(0,0,0,.75); border: 1px solid rgba(0,0,0,.25); margin-left: 4px; padding: 5px 8px; border-radius: 4px; }
  .selected { color: black; }
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
    methods: {
      select(value) {
        this.$emit('input', value)
      }
    }
  }
</script>

