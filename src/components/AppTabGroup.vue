<template>
  <div>
    <div class="app-tab-group">
      <div class="app-tab-group__tabs">
        <div :class="['app-tab-group__tabs__tab', {'app-tab-group__tabs__tab--selected': selected == index}]"
             v-for="(tab, index) in $slots.tab"
             :key="index"
             @click="tabSelect(index)">
          <vnode :vnode="tab"></vnode>
        </div>
      </div>
      <div class="app-tab-group-items">
        <div class="app-tab-group__items__item" v-for="(item, index) in $slots.item" :key="index" v-if="selected == index">
          <vnode :vnode="item"></vnode>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-tab-group__tabs { margin-bottom: 20px; display: flex; width: 100%; justify-content: space-between; }
  .app-tab-group__tabs__tab { transition: transform .25s; fill: rgba(0,0,0,.5); }
  .app-tab-group__tabs__tab--selected { fill: rgba(0,0,0,1); transform: scale(1.1); }
</style>


<script>
  export default {
    components: {
      vnode: {
        functional: true,
        render: (h, ctx) => h('div', {}, [ctx.props.vnode])
      },
    },
    data: function() {
      return {
        selected: null,
      }
    },
    methods: {
      tabSelect(index) {
        this.selected = (this.selected == index ? null : index)
      },
    },
  }
</script>
