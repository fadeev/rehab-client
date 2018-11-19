<template>
  <div>
    <div class="home-screen">
      <div class="home-screen__list">
        <router-link :to="'/patient'" tag='div' class="home-screen__list__item">
          <div>
            Пациенты
          </div>
        </router-link>
        <router-link :to="'/specialist'" tag='div' class="home-screen__list__item">
          <div>
            Сотрудники
          </div>
        </router-link>
        <router-link :to="'/job'" tag='div' class="home-screen__list__item">
          <div>
            Должности
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .home-screen__list { padding: 20px; }
  .home-screen__list__item { color: rgba(0,122,255,1); font-size: 1.25em; margin-bottom: 1em; }
</style>
