<template>
  <div>
    <div :class="['app-input', {'app-input--expanded': expanded}]">
      <div class="app-input__label" @click="sheet = !sheet">
        {{label}}
      </div>
      <div class="app-input__selector">
        <div :class="['app-input__selector__item', {selected: option['primaryKey'] == value}]"
             v-for="option in optionsSorted"
             @click="submit(option[valueField])"
             :key="option['primaryKey']">
          {{option['Значение']}}
        </div>
      </div>
      <div class="app-input__value" :style="{textAlign: (optionsValue || '').length > 50 ? 'left' : 'center'}">
        {{optionsValue}}
      </div>
      <!-- <div class="app-input__input">
        <span v-if="optionsValue">
          {{optionsValue}}
        </span>
        <span v-else class="app-input__placeholder">
          {{placeholder}}
        </span>
      </div> -->
    </div>
    <transition name="fade">
      <div class="overlay" v-if="sheet"></div>
    </transition>
    <div :class="['sheet', {'sheet--visible': sheet}]">
      <div class="sheet__header">
        <input ref="search" class="sheet__header__input" :placeholder="label" :value="search" @input="search = $event.target.value">
        <div class="sheet__header__button" @click="clear">
          <AppIcon icon="x-mark-circle-thin-svg"></AppIcon>
        </div>
      </div>
      <div class="sheet__item" @click="submit(option[valueField])"  v-for="(option, index) in optionsFiltered" :key="index">
        <div>{{option[keyField]}}</div>
        <div class="sheet__item__value">{{option['Значение']}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-input { box-sizing: border-box; width: 100%; border-radius: 5px; padding: 10px 0; transition: background-color .25s, color .25s; }
  /* .app-input__label, .app-input__input { width: 50%; } */
  .app-input__input { text-align: right; }
  .app-input--expanded { background: rgb(255, 253, 112); color: rgb(43, 32, 0); }
  .app-input__placeholder { color: rgba(0,0,0,.35); }

  .app-input__selector { display: flex; justify-content: space-around; margin-top: 10px; }
  .app-input__selector__item { box-shadow: 0 0 0 1px black;  width: 2em; height: 2em; border-radius: 100%; display: flex; justify-content: center; align-items: center; }
  .app-input__value { text-align: center; font-size: .75em; margin-top: 10px; }

  .selected {background: rgb(255, 253, 112); box-shadow: 0 0 0 1px black, 0 0 0 5px rgb(255, 253, 112); }

  .overlay { z-index: 400; background: rgba(0,0,0,1); top: 0; left: 0; bottom: 0; right: 0; position: fixed; }

  .fade-enter-active, .fade-leave-active { transition: opacity .75s; }
  .fade-enter, .fade-leave-to { opacity: 0; }
  .fade-enter-to, .fade-leave { opacity: .5; }

  .sheet { z-index: 500; overflow-y: scroll; transition: transform .75s cubic-bezier(0.55, 0, 0.1, 1); transform: translateY(100vh); left: 0; right: 0; background: white; bottom: 0; position: fixed; top: 0; }
  .sheet--visible { transform: translateY(0); }
  .sheet__header { display: flex; align-items: center; padding: 10px; text-align: right; }
  .sheet__header__input { box-sizing: border-box; width: 100%; padding: 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2); }
  .sheet__header__button { font-size: 1.25em; padding: 10px; }
  .sheet__item { border-radius: 5px; padding: 10px; margin: 10px; display: flex; justify-content: space-between; align-items: center; }
  .sheet__item:active { background: rgb(255, 253, 112); }
  .sheet__item__value { font-size: 1.25em; }
</style>

<script>
  import { find, filter } from "lodash"
  import AppIcon from "./AppIcon.vue"
  import { sortBy } from "lodash"

  export default {
    components: {
      AppIcon,
    },
    props: [ 'value', 'label', 'placeholder', 'options', 'key-field', 'value-field', ],
    data: function() {
      return {
        expanded: null,
        sheet: null,
        search: null,
      }
    },
    computed: {
      optionsSorted() {
        return sortBy(this.options, (object) => object['Значение'])
      },
      optionsValue() {
        let res = find(this.options, (object) => {
          if (object[this.valueField])
            return object[this.valueField] == this.value
        })
        if (res)
          return res[[this.keyField]]
      },
      optionsFiltered() {
        return filter(sortBy(this.options, o => o['Значение']), (option) => {
          return option[this.keyField].toLowerCase().indexOf((this.search || '').toLowerCase()) != -1
        })
      },
    },
    methods: {
      valueUpdate(e) {
        this.$emit('input', e.target.value);
      },
      submit(value) {
        this.$emit('input', value)
        this.sheet = null
      },
      clear() {
        if (this.search) {
          this.search = null
          if (this.$refs.search)
            this.$refs.search.focus()
        } else {
          this.sheet = null
        }
      }
    },
  }
</script>
