<template>
  <div>
    <div :class="['patient-button', {'enter-animation': created}]" @animationend="test">
      PatientButton
    </div>
  </div>
</template>

<style scoped>
  .enter-animation { animation: enter 5s; }

  @keyframes enter {
    0% { opacity: 0; }
    100% { opacity: 100%; }
  }
</style>


<script>
  export default {
    data: function() {
      return {
        created: null,
      }
    },
    created() {
      this.created = true
    },
    methods: {
      test() {
        console.log('animation end')
      },
    },
  }
</script>
