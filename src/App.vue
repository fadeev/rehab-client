<template>
  <div id="app">
    <AppLayout></AppLayout>
  </div>
</template>

<style>
  /* .fade-enter-active { transition: opacity 1s; }
  .fade-enter { opacity: 0; }
  .fade-enter-to { opacity: 1; } */
  /* .fade-leave-active { transition: opacity 1s; }
  .fade-leave { opacity: 1; }
  .fade-leave-to { opacity: 0; } */

  .app-topbar { background: black; color: white; padding: 5px 20px; font-size: 1em; }

  .app-form { margin: 10px; }
  .app-form__item { padding: 10px; border-top: 1px solid rgba(0,0,0,.2); border-right: 1px solid rgba(0,0,0,.2); border-left: 1px solid rgba(0,0,0,.2); }
  .app-form__item:first-child { border-top-left-radius: 3px; border-top-right-radius: 3px; }
  .app-form__item:last-child { border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-bottom: 1px solid rgba(0,0,0,.2); }

  .app-list__item { margin: 0 10px; padding: 10px; border-top: 1px solid rgba(0,0,0,.2); }
  .app-list__item:active + .app-list__item { border-color: transparent; }
  .app-list__item:active { border-radius: 3px; color: rgba(255,255,255,.8); background: rgba(0,122,255,1); border-color: rgba(0,122,255,1); }
  .app-list__item:first-child { border-color: transparent; }
</style>


<script>
  import AppLayout from "./components/AppLayout.vue"
  export default {
    components: { AppLayout, }, 
  }
</script>