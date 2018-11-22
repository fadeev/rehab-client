<template>
  <div>
    <div v-if="collection && entity" class="entity-profile">
      <h2>
        {{$route.params.entity}}
      </h2>
      <div v-for="(value, key) in collection" :key="key">
        <div>{{key}}</div>
        <input type="text" v-model="collection[key]">
      </div>
      <div>
        {{entity.navigation}}
      </div>
      <!-- <div>
        {{collection}}
      </div>
      <div>
        {{entity}}
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
      this.collection = (await axios.get(`http://ru:3103/odata/IISRehab${this.$route.params.entity}s(${this.$route.params.id})`)).data
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
