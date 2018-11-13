<template>
  <div>
    <app-header ref="search"
                link="/job"
                v-model="search"
                :menu="menu"
                @menu="menu = $event"
                placeholder="Поиск должности">
      <div class="app-header__item">
        Добавить новую должность
      </div>
    </app-header>
    <transition-page>
      <router-view :search="search"></router-view>
    </transition-page>
  </div>
</template>

<style scoped>
  .app-header__item { padding: 20px; }
</style>

<script>
  import AppHeader from "./AppHeader.vue"
  import TransitionPage from "./TransitionPage.vue"

  export default {
    components: {
      AppHeader,
      TransitionPage,
    },
    data: function() {
      return {
        search: null,
        menu: null,
      }
    },
  }
</script>
