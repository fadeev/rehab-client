<template>
  <div>
    <component v-if="customComponent" :is="customComponent"/>
    <div v-if="!customComponent">
      <base-header v-model="mode" :options="options"/>
      <div v-if="!propExclude || (propExclude && !includes(propExclude, key))" style="margin: 10px;" v-for="(value, key) in collection" :key="key">
        <component v-if="isCustomComponent(propType(key))" :value="value" :label="key" v-model="collection[key]" :is="propType(key)"/>
        <app-input-select :options="isEnum(key).options"
                          v-else-if="isEnum(key)"
                          key-field="name"
                          value-field="name"
                          v-model="collection[key]"
                          placeholder="Выбрать"
                          :label="key">
        </app-input-select>
        <app-input v-else :label="key" v-model="collection[key]"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  .fade-enter, .fade-leave-to { opacity: 0; }
  .fade-enter-to, .fade-leave { opacity: .5; }
</style>

<script>
  import { mapState } from 'vuex'
  import axios from "axios"
  import { find, includes, last, isEqual } from 'lodash'
  import Vue from 'vue'

  export default {
    props: [
      'entityId', 'itemId', 'propExclude',
    ],
    data: function() {
      return {
        collection: null,
        collectionOriginal: null,
        mode: null,
        options: {
          back: true,
        },
      }
    },
    watch: {
      entity: {
        handler: async function(newValue, oldValue) {
          this.collection = await this.entityItemFetch(newValue)
          this.collectionOriginal = await this.entityItemFetch(newValue)
        },
        immediate: true,
      },
    },
    computed: {
      collectionChanged() {
        return !isEqual(this.collection, this.collectionOriginal)
      },
      customComponent() {
        return Vue.options.components[`${this.entityId}Item`]
      },
      entity() {
        return this.$store.getters.entity(this.entityId)
      },
      entityProperties() {
        return find(this.$store.getters.entityList, ['type', this.entityId]) && find(this.$store.getters.entityList, ['type', this.entityId]).properties
      },
      enumTypes() {
        return this.$store.getters.enumTypes
      },
      ...mapState([
        'url',
      ]),
    },
    methods: {
      isCustomComponent(name) {
        return Vue.options.components[name]
      },
      isEnum(key) {
        let entity = find(this.entityProperties, ['name', key])
        return find(this.enumTypes, ['type', entity && last(entity.type.split('.'))])
      },
      propType(name) {
        let prop = find(this.entity.properties, ['name', name])
        if (prop) return prop.type
      },
      async entityItemFetch(entity) {
        let expandItems = entity && entity.navigation.map(i => i.name).join(',')
        let expand = expandItems ? `?$expand=${expandItems}` : ''
        return (await axios.get(`${this.url}${this.entityId}s(${this.itemId})${expand}`)).data
      },
      includes,
      find,
      last,
    },
  }
</script>
