<template>
  <div>
    <div class="app-header">
      <router-link :to="`/`" tag="div">
        <app-icon icon="home-thin-svg"></app-icon>
      </router-link>
      <input @click="$router.push(`${link}`)"
             :placeholder="placeholder"
             class="app-header__input"
             type="text"
             v-if="!simple"
             @input="$emit('input', $event.target.value)"
             :value="value">
      <div @click="$emit('menu', !menu)">
        <app-icon v-if="menu" icon="angel-up-circle-thin-svg"></app-icon>
        <app-icon v-else icon="angel-down-circle-thin-svg"></app-icon>
      </div>
    </div>
    <transition name="slide">
      <div class="app-header__menu" v-if="menu">
        <slot/>
      </div>
    </transition>
    <transition name="fade">
      <div class="overlay" v-if="menu" @click="$emit('menu', null)"></div>
    </transition>
  </div>
</template>

<style scoped>
  .app-header { justify-content: space-between; min-height: 42px; z-index: 200; background: white; display: flex; align-items: center; padding: 20px; position: relative; border: 1px solid rgba(0,0,0,0); }
  .app-header__input { margin: 0 15px; box-sizing: border-box; width: 100%; border: none; text-align: center; padding: 10px 0; border-radius: 5px; }
  .app-header__input:focus { background: rgb(255, 253, 112); }
  .app-header__menu { z-index: 150; position: absolute; background: white; left: 0; right: 0; }

  .overlay { z-index: 100; position: fixed; opacity: .75; background: black; left: 0; right: 0; top: 0; bottom: 0; }

  .slide-enter-active, .slide-leave-active { transition: all .5s; }
  .slide-enter, .slide-leave-to { transform: translateY(-100%); }
  .slide-enter-to, .slide-leave { transform: translateY(0); }

  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  .fade-enter, .fade-leave-to { opacity: 0; }
  .fade-enter-to, .fade-leave { opacity: .75; }
</style>

<script>
  import AppIcon from "./AppIcon.vue"

  export default {
    props: {
      value: {
        type: String,
      },
      menu: {
        type: Boolean,
      },
      placeholder: {
        type: String,
        default: 'Поиск',
      },
      link: {
        type: String,
        default: '/',
      },
      simple: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      AppIcon,
    },
  }
</script>