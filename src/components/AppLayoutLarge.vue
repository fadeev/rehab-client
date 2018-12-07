<template>
  <div>
    <div class="app-layout-large">
      <div class="app-layout-large__item">
        <router-view :key="$route.path" name="list"></router-view>
      </div>
      <div class="app-layout-large__item">
        <router-view :key="$route.path" name="collection"></router-view>
      </div>
      <div class="app-layout-large__item">
        <router-view :key="$route.path" name="item"></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-layout-large { display: flex; }
  .app-layout-large__item { flex: 1; }
</style>
