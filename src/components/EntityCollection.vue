<template>
  <div>
    <div class="entity-collection">
      <base-header v-model="mode" :options="options" @search="search">
        <div style="margin: 20px;" @click="tableConvert">
          Сохранить в виде таблицы
        </div>
      </base-header>
      <h2 style="margin: 20px;">
        {{entityId.replace(/([а-я](?=[А-Я]))/g, '$1 ')}}
      </h2>
      <transition name="fade">
        <div v-if="collection">
          <router-link tag="div"
                       class="entity-collection__item"
                       :to="`/entity/${entityId}/${item['__PrimaryKey']}`"
                       v-for="item in collectionFiltered"
                       :key="item['__PrimaryKey']">
            <div>{{item[find(nameOrder, i => item[i])]}}</div>
            <div @click.prevent="itemSelect(item)" class="entity-collection__item__icon" :style="{zIndex: 0, marginLeft: 'auto', opacity: mode == 'select' ? 1 : 0, transform: `translateX(${mode == 'select' ? 0 : '25%'})`}">
              <app-icon v-if="!find(itemSelectedList, item)" style="fill: rgba(0,0,0,.25)" icon="circle-6-svg"/>
              <app-icon v-else icon='check-mark-circle-thin-svg'/>
            </div>
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .entity-collection__item { margin: 5px 10px; padding: 10px; display: flex; align-items: center; transition: all .5s; }
  .entity-collection__item__icon { transition: all .25s; }

  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  .fade-enter, .fade-leave-to { opacity: 0; }
  .fade-enter-to, .fade-leave { opacity: .5; }
</style>

<script>
  import { mapState } from 'vuex'
  import axios from "axios"
  import { find, take, findIndex, indexOf } from 'lodash'
  import XLSX from 'xlsx'

  export default {
    // props: {
    //   entityId: {
    //     type: String,
    //   },
    //   propInclude: {
    //     type: Object,
    //   },
    //   nameOrder: {
    //     type: Array,
    //     default: () => ['__PrimaryKey', 'id', 'ID', 'uuid', 'UUID', 'guid', 'GUID'],
    //   },
    // },
    data: function() {
      return {
        mode: null,
        itemSelectedList: null,
        options: {
          search: true,
          select: true,
        },
        searchString: null,
        collectionListAll: null,
      }
    },
    computed: {
      ...mapState([
        'url', 'propInclude', 'nameOrder',
      ]),
      entityId() {
        return this.$route.params.entityId
      },
      collection() {
        return this.$store.getters.entityCollectionGet(this.entityId)
      },
      collectionFiltered() {
        let collection = this.collection.filter(object => {
          return Object.values(object).join('').toLowerCase().indexOf((this.searchString || '').toLowerCase()) != -1
        })
        return this.collectionListAll ? collection : take(collection, 50)
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
          this.collectionListAll = true
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
      itemSelect(item) {
        if (this.mode != 'select') return
        if (!this.itemSelectedList) this.itemSelectedList = []
        if (!find(this.itemSelectedList, item)) {
          this.itemSelectedList.push(item)
        } else {
          this.$delete(this.itemSelectedList, findIndex(this.itemSelectedList, item))
        }
      },
      search(search) {
        this.searchString = search
      },
      tableConvert() {
        let wb = XLSX.utils.book_new()
        let ws = XLSX.utils.json_to_sheet(this.collection)
        XLSX.utils.book_append_sheet(wb, ws, 'ws_name')
        XLSX.writeFile(wb, 'filename.xls')
      },
    },
  }
</script>
