<template>
  <div>
    <app-header ref="search"
                link="/patient"
                v-model="search"
                :menu="menu"
                @menu="menu = $event"
                placeholder="Поиск пациента">
      <router-link @click.native="menu = null" tag="div" :to="`/patient/new`" class="app-header__item">
        Добавить нового пациента
      </router-link>
      <div class="app-header__item" @click="menu = null; selectMode = !selectMode">
        Выбрать пациентов
      </div>
      <div class="app-header__item" @click="something = !something">
        Дополнительный пункт
        <div v-if="something" class="app-header__item__icon">
          <app-icon :size="22" icon="check-mark-17-svg"/>
        </div>
      </div>
    </app-header>
    <TransitionPage>
      <router-view :search="search" :key="$route.path" :select-mode="selectMode"></router-view>
    </TransitionPage>
  </div>
</template>

<style scoped>
  .app-header__item { align-items: center; padding: 20px; display: flex; justify-content: space-between; }
  .app-header__item__icon { height: 1em; margin: 0 5px; }
</style>

<script>
  import TransitionPage from "./TransitionPage.vue"
  import AppHeader from "./AppHeader.vue";
  import AppIcon from "./AppIcon.vue";

  export default {
    components: {
      TransitionPage,
      AppHeader,
      AppIcon,
    },
    data: function() {
      return {
        search: null,
        selectMode: null,
        something: null,
        menu: null,
      }
    },
  }
</script>
