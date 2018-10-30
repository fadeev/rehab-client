<template>
  <div>
    <div class="app-page">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .app-page { display: flex; width: 100%; overflow-x: hidden; }
  .app-page > * { flex-grow: 1; flex-basis: 0; }

  @media (max-width: 500px) {
    .app-page { display: flex; width: 100%; }
    .app-page > * { flex-basis: 100%; flex-shrink: 0; }
  }
</style>
