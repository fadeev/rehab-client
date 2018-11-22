<template>
  <div>
    <div class="entity-list">
      <h2>
        Перечень сущностей
      </h2>
      <router-link tag="div" :to="`/entity/${entity.type}`" class="app-list__item" v-for="entity in entityTypes" :key="entity.type">
        {{entity.type}}
      </router-link>
      <!-- <div v-for="enumerable in enumTypes" :key="enumerable.type">
        <app-input-select v-model="model[enumerable.type]"
                          :label="enumerable.type"
                          :options="enumerable.options"
                          key-field="name"
                          value-field="value"/>
      </div> -->
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import store from "../store.js"
  import AppInputSelect from './AppInputSelect.vue'

  export default {
    components: {
      AppInputSelect,
    },
    data: function() {
      return {
        model: {},
      }
    },
    computed: {
      // ...mapState([
      //   'metadata'
      // ]),
      ...mapGetters([
        'enumTypes', 'entityTypes',
      ]),
    },
  }
</script>
