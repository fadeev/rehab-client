<template>
  <div>
    <transition name="appear">
      <div class="base-submit" v-if="visible">
        <div class="base-submit__button">
          <app-icon class="base-submit__button__icon" style="fill: rgba(0,0,0,.25);" icon="x-mark-circle-thin-svg"/>
          <div style="color: rgba(0,0,0,.35)">Отменить</div>
        </div>
        <div class="base-submit__button">
          <app-icon class="base-submit__button__icon" icon="cloud-upload-thin-svg"/>
          <div>Сохранить</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .base-submit { padding: 20px 0; background: rgba(255,255,255,.95); position: fixed; bottom: 0; width: 100%; display: flex; justify-content: space-around; }
  .base-submit__button { flex: 1; font-size: .65em; font-weight: bold; justify-content: flex-start; display: flex; flex-direction: column; align-items: center; }
  .base-submit__button__icon { margin-bottom: 10px; }

  .appear-enter-active, .appear-leave-active { transition: all .5s; }
  .appear-enter, .appear-leave-to { transform: translateY(100%); }
  .appear-enter-to, .appear-leave { transform: translateY(0); }
</style>

<script>
  export default {
    props: ['visible'],
  }
</script>
