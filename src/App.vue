<template>
  <div id="app">
    <AppLayout></AppLayout>
  </div>
</template>

<style>
  .app-form { margin: 10px; }
  .app-form__item { padding: 10px; border-top: 1px solid rgba(0,0,0,.2); border-right: 1px solid rgba(0,0,0,.2); border-left: 1px solid rgba(0,0,0,.2); }
  .app-form__item:first-child { border-top-left-radius: 5px; border-top-right-radius: 5px; }
  .app-form__item:last-child { border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; border-bottom: 1px solid rgba(0,0,0,.2); }

  .app-list__item { display: block; margin: 0 10px; padding: 10px; border-top: 1px solid rgba(0,0,0,0); }
  .app-list__item:active + .app-list__item { border-color: transparent; }
  .app-list__item:active { border-radius: 5px; color: rgba(255,255,255,.8); background: rgba(0,122,255,1); border-color: rgba(0,122,255,1); }
  .app-list__item:first-child { border-color: transparent; }

  input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
</style>


<script>
  import AppLayout from "./components/AppLayout.vue"
  
  export default {
    components: { AppLayout, }, 
  }
</script>