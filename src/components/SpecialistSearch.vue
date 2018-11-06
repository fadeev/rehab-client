<template>
  <div>
    <div class="specialist-search">
      <input @click="$router.push('/specialist')"
             placeholder="Поиск сотрудника по имени"
             class="specialist-search__input"
             type="text"
             @input="search($event.target.value)"
             :value="specialistSearch">
    </div>
  </div>
</template>

<style scoped>
  .specialist-search { padding-top: 10px; margin: 0 10px 10px 10px; position: relative; }
  .specialist-search__input { box-sizing: border-box; width: 100%; padding: 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2); }
</style>

<script>
  export default {
    computed: {
      specialistSearch() {
        return this.$store.state.specialistSearch
      },
    },
    methods: {
      search(x) {
        this.$store.dispatch("specialistSearchUpdate", x)
      }
    }
  }
</script>