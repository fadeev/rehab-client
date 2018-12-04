<template>
  <div>
    <div class="entity-list">
      <h2 style="margin: 20px;">
        Перечень сущностей
      </h2>
      <router-link tag="div"
                   v-if="!entityInclude || (entityInclude && includes(entityInclude, entity.type))"
                   :to="`/entity/${entity.type}`"
                   class="entity-list__item"
                   v-for="entity in entityList"
                   :key="entity.type">
        {{entity.type.replace(/([а-я](?=[А-Я]))/g, '$1 ')}}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .entity-list__item { margin: 5px 10px; padding: 10px; }
</style>

<script>
  import { mapGetters } from 'vuex'
  import { includes } from 'lodash'

  export default {
    props: {
      entityInclude: {
        type: Array,
      },
    },
    computed: {
      ...mapGetters([
        'entityList',
      ]),
    },
    methods: {
      includes,
    },
  }
</script>
