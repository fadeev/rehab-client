<template>
  <div>
    <div class="entity-page">
      <router-link :to="`/entity`" tag="h2" class="link">
        Перечень сущностей
      </router-link>
      <h2 style="margin: 20px;">
        Перечень {{entityId.replace(/([а-я](?=[А-Я]))/g, '$1 ')}}
      </h2>
      <router-link tag="div"
                   class="app-list__item"
                   :to="`/entity/${entityId}/${item['__PrimaryKey']}`"
                   v-for="item in collectionFiltered"
                   :key="item['__PrimaryKey']">
        {{item[find(nameOrder, i => item[i])]}}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  h2 { margin: 20px; }
  .link { color: rgba(0,122,255,1); }
</style>

<script>
  import { mapState } from 'vuex'
  import axios from "axios"
  import { find, take } from 'lodash'

  export default {
    props: {
      entityId: {
        type: String,
      },
      propInclude: {
        type: Object,
      },
      nameOrder: {
        type: Array,
        default: () => ['__PrimaryKey', 'id', 'ID', 'uuid', 'UUID', 'guid', 'GUID'],
      },
    },
    computed: {
      ...mapState([
        'url'
      ]),
      collection() {
        return this.$store.getters.entityCollectionGet(this.entityId)
      },
      collectionFiltered() {
        return this.collection
      },
    },
    async created() {
      window.addEventListener('scroll', this.scrollHandler)
      this.entityCollectionFetch()
    },
    methods: {
      find,
      take,
      scrollHandler(e) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          console.log("bottom")
        }
      },
      async entityCollectionFetch() {
        let selectItems = (
          this.propInclude &&
          this.propInclude[this.entityId] &&
          `?$select=${this.propInclude[this.entityId].join(',')}`
          || ''
        )
        let url = `${this.url}${this.entityId}s${selectItems}`
        this.$store.dispatch('entityCollectionFetch', {url, entityId: this.entityId})
      },
    },
  }
</script>
