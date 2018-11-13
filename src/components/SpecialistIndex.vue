<template>
  <div>
    <app-header ref="search"
                link="/specialist"
                v-model="search"
                :menu="menu"
                @menu="menu = $event"
                placeholder="Поиск сотрудника">
      <div class="app-header__item">
        Добавить нового сотрудника
      </div>
    </app-header>
    <div class="specialist-index">
      <TransitionPage>
        <router-view :search="search"></router-view>
      </TransitionPage>
    </div>
  </div>
</template>

<style scoped>
  .app-header__item { margin: 20px; }

  .icon { transition: all .25s; fill: white; background: linear-gradient(45deg, rgb(52, 150, 255), rgb(0, 27, 182)); padding: 5px 3px 3px 5px; border-radius: 1000px; }
  .icon:active { transform: scale(.9); }
</style>

<script>
  import { mapState } from 'vuex'
  import store from "../store.js"
  import TransitionPage from "./TransitionPage.vue"
  import AppHeader from "./AppHeader.vue"

  export default {
    components: {
      TransitionPage,
      AppHeader,
    },
    data: function() {
      return {
        search: null,
        menu: null,
      }
    },
  }
</script>
