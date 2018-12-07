<template>
  <div>
    <component :is="`app-layout-${mobile ? 'small' : 'large'}`"/>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    computed: {
      ...mapState([
        'mobile',
      ]),
    },
  }
</script>