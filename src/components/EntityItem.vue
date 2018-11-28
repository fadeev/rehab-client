<template>
  <div>
    <component v-if="customComponent" :is="customComponent"/>
    <div v-if="!customComponent">
      <router-link :to="`/entity`" tag="h2" class="link">
        Перечень сущностей
      </router-link>
      <router-link :to="`/entity/${entityId}`" tag="h2" class="link">
        Перечень {{entityId.replace(/([а-я](?=[А-Я]))/g, '$1 ')}}
      </router-link>
      <h2>
        {{entityId.replace(/([а-я](?=[А-Я]))/g, '$1 ')}}
      </h2>
      <div v-if="!propExclude || (propExclude && !includes(propExclude, key))" style="margin: 10px;" v-for="(value, key) in collection" :key="key">
        <component v-if="isCustomComponent(propType(key))" :value="value" :label="key" v-model="collection[key]" :is="propType(key)"/>
        <app-input-select :options="isEnum(key).options"
                          v-else-if="isEnum(key)"
                          key-field="name"
                          value-field="name"
                          v-model="collection[key]"
                          placeholder="Выбрать"
                          :label="key"></app-input-select>
        <app-input v-else :label="key" v-model="collection[key]"/>
        <!-- <div>{{propType(key)}}</div> -->
        <!-- <app-input v-if="!isEnum(key)" :label="key" v-model="collection[key]"/>
        <div>{{propType(key)}}</div>
        <app-input-select :options="isEnum(key).options"
                          v-if="isEnum(key)"
                          key-field="name"
                          value-field="value"
                          v-model="collection[key]"
                          :label="key"></app-input-select> -->
      </div>
      <submit-button :visible="collectionChanged"/>
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
      }
    },
    async created() {
      this.collection = await this.entityItemFetch(this.entity)
      this.collectionOriginal = await this.entityItemFetch(this.entity)
    },
    // watch: {
    //   entity: async function(newValue, oldValue) {
    //     this.collection = await this.entityItemFetch(newValue)
    //   },
    // },
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
