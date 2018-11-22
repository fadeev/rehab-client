<template>
  <div>
    <div v-if="entity" class="entity-page">
      <h2>
        Перечень {{$route.params.entity}}
      </h2>
      <router-link tag="div"
                   class="app-list__item"
                   :to="`/entity/${$route.params.entity}/${item['__PrimaryKey']}`"
                   v-for="item in collection"
                   :key="item['__PrimaryKey']">
        {{item['__PrimaryKey']}}
      </router-link>
      <!-- <div v-for="property in entity.properties" :key="property.name">
        {{property.name}}
      </div> -->
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import store from "../store.js"
  import { find } from "lodash"
  import axios from "axios"

  export default {
    data: function() {
      return {
        collection: null
      }
    },
    async mounted() {
      this.collection = (await axios.get(`http://ru:3103/odata/IISRehab${this.$route.params.entity}s`)).data.value
    },
    computed: {
      entity() {
        return store.getters.entity(this.$route.params.entity)
      },
      ...mapGetters([
        'enumTypes', 'entityTypes',
      ]),
    },
  }
</script>
