<template>
  <div>
    <div class="patient-search" @click="goHome">
      <input placeholder="Поиск пациента по имени" class="patient-search__input" type="text" v-model="search">
    </div>
  </div>
</template>
