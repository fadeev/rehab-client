<template>
  <div>
    <div v-if="indicator" class="indicator-profile">
      <app-input-inline style="margin: 0 10px" large v-model="indicator['Наименование']"/>
      <div class="indicator-profile__h2">
        Характеристики
        <!-- <app-icon class="indicator-profile__button" icon="plus"/> -->
      </div>
      <div class="attribute-list__item" v-for="attribute in attributeList" :key="attribute['primaryKey']">
        <app-input-inline v-model="attribute['Описание']"/>
        <app-input label="Значение" v-model="attribute['Значение']"/>
      </div>
      <submit-button :visible="modified" @click="submit"/>
    </div>
  </div>
</template>

<style scoped>
  .attribute-list__item { margin: 0 10px; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid rgba(0,0,0,.25); }
  .indicator-profile__h2 { display: flex; align-items: center; justify-content: space-between; margin: 10px 20px; font-weight: 600; }
  .indicator-profile__button { transition: all .25s; fill: white; background: linear-gradient(45deg, rgb(52, 150, 255), rgb(0, 27, 182)); padding: 5px 4px 4px 5px; border-radius: 1000px; }
  .indicator-profile__button:active { transform: scale(.9); }
</style>

<script>
  import AppInputInline from "./AppInputInline.vue"
  import AppInput from "./AppInput.vue"
  import AppIcon from "./AppIcon.vue"
  import SubmitButton from "./SubmitButton.vue";

  export default {
    components: {
      AppInputInline,
      AppInput,
      AppIcon,
      SubmitButton,
    },
    data: function() {
      return {
        indicator: null,
        attributeList: null,
        modified: null,
      }
    },
    async created() {
      this.indicatorGet()
      this.attributeListGet()
    },
    methods: {
      indicatorGet() {
        this.$store.dispatch("indicatorGet", this.$route.params.indicator_id).then(data => {
          this.indicator = data
        })
      },
      attributeListGet() {
        this.$store.dispatch('attibuteListGet').then(({data}) => {
          this.attributeList = data.data.filter(object => {
            return object['ИнтегральныйПоказатель'] == this.$route.params.indicator_id
          })
        })
      },
      submit() {
        this.$store.dispatch("indicatorUpdate", this.indicator).then(data => {
          this.modified = null
        })
      },
    },
    watch: {
      indicator: {
        handler(newValue, oldValue) {
          if (oldValue) this.modified = true
          if (oldValue != newValue) this.modified = false
        },
        deep: true,
      },
      attributeList: {
        handler(newValue, oldValue) {
          if (oldValue) this.modified = true
          if (oldValue != newValue) this.modified = false
        },
        deep: true,
      },
    },
  }
</script>
