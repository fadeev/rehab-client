<template>
  <div>
    <transition name="fade">
      <div class="base-header__overlay" v-if="value == 'menu'" @click="modeChange(null)"></div>
    </transition>
    <div class="base-header">
      <router-link tag="div" :to="`/entity`">
        <app-icon class="base-header__icon" icon="home-thin-svg"/>
      </router-link>
      <div @click="modeChange('search')" v-if="options.search">
        <app-icon class="base-header__icon" icon="search-thin-svg"/>
      </div>
      <div v-if="options.back" @click="$router.go(-1)">
        <img class="base-header__icon" height="36" src="@/assets/icon-base-list.svg"/>
      </div>
      <div @click="modeChange('select')"  v-if="options.select">
        <img class="base-header__icon" height="36" src="@/assets/icon-base-list-select.svg"/>
      </div>
      <div v-if="options.add">
        <app-icon class="base-header__icon" icon="plus"/>
      </div>
      <div style="margin-left: auto" @click="modeChange(value == 'menu' ? null : 'menu')">
        <app-icon v-if="value == 'menu'" class="base-header__icon" icon="angel-up-circle-thin-svg"/>
        <app-icon v-else class="base-header__icon" icon="angel-down-circle-thin-svg"/>
      </div>
      <div class="base-header__mode" v-show="value == 'search'">
        <input ref="search" type="text" class="base-header__search__input" placeholder="Поиск" @input="search">
        <div class="base-header__icon" style="margin-left: auto" @click="modeChange(null)">
          <app-icon icon="x-mark-circle-thin-svg"/>
        </div>
      </div>
      <div class="base-header__mode" v-if="value == 'select'">
        <div class="base-header__icon" style="margin-left: auto" @click="modeChange(null)">
          <app-icon icon="x-mark-circle-thin-svg"/>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div class="base-header__menu" v-if="value == 'menu'">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .base-header__menu { z-index: 100; background: white; position: absolute; left: 0; right: 0; width: 100%; }
  .base-header__overlay { background: rgba(0,0,0,.75); z-index: 50; position: fixed; left: 0; right: 0; top: 0; bottom: 0; }
  .base-header { z-index: 200; background: white; position: relative; display: flex; padding: 10px; left: 0; right: 0; justify-content: flex-start; box-sizing: border-box; }
  .base-header__icon { padding: 10px; }
  .base-header__search__input { background: white; border: none; padding-left: 10px; }
  .base-header__mode { padding: 0 10px; background: white; align-items: center; justify-content: flex-start; display: flex; position: absolute; left: 0; right: 0; box-sizing: border-box; }

  .slide-enter-active, .slide-leave-active { transition: all .5s; }
  .slide-enter, .slide-leave-to { transform: translateY(-100%); }
  .slide-enter-to, .slide-leave { transform: translateY(0); }

  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  .fade-enter, .fade-leave-to { opacity: 0; }
  .fade-enter-to, .fade-leave { opacity: 1; }
</style>

<script>
  export default {
    props: {
      value: {
        default: null,
      },
      options: {
        default: {},
      },
    },
    data: function() {
      return {
        menu: null,
      }
    },
    methods: {
      modeChange(mode) {
        if (mode == 'search' && this.$refs.search) {
          this.$nextTick(() => {
            this.$refs.search.focus()
          })
        }
        this.$emit('input', mode)
      },
      search(e) {
        this.$emit("search", e.target.value)
      },
    },
  }
</script>
