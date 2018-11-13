<template>
  <transition :name="transitionName"
              :mode="transitionMode"
              :enter-active-class="transitionEnterActiveClass">
    <slot/>
  </transition>
</template>

<script>
  // https://markus.oberlehner.net/blog/vue-router-page-transitions/

  const DEFAULT_TRANSITION = 'slide'
  const DEFAULT_TRANSITION_MODE = 'out-in';

  export default {
    name: 'transition-page',
    data() {
      return {
        transitionName: DEFAULT_TRANSITION,
        transitionMode: DEFAULT_TRANSITION_MODE,
        transitionEnterActiveClass: '',
      }
    },
    created() {
      this.$router.beforeEach((to, from, next) => {
        let transitionName = to.meta.transitionName || from.meta.transitionName || DEFAULT_TRANSITION
        if (transitionName === 'slide') {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
        this.transitionMode = DEFAULT_TRANSITION_MODE
        this.transitionEnterActiveClass = `${transitionName}-enter-active`
        if (to.meta.transitionName === 'zoom') {
          this.transitionMode = 'in-out'
          this.transitionEnterActiveClass = 'zoom-enter-active'
          document.body.style.overflow = 'hidden'
        }
        if (from.meta.transitionName === 'zoom') {
          this.transitionMode = null
          this.transitionEnterActiveClass = null
          document.body.style.overflow = null
        }
        this.transitionName = transitionName
        next()
      })
    },
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active { transition-duration: .5s; transition-property: opacity; transition-timing-function: ease; overflow: hidden; }
  .fade-enter, .fade-leave-active { opacity: 0 }

  .slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active { transition-duration: 0.5s; transition-property: opacity, transform; transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1); overflow: hidden; }
  .slide-left-enter, .slide-right-leave-active { opacity: 0; transform: translate(2em, 0); }
  .slide-left-leave-active, .slide-right-enter { opacity: 0; transform: translate(-2em, 0); }

  .scroll-left-enter-active, .scroll-left-leave-active, .scroll-right-enter-active, .scroll-right-leave-active { position: fixed; background: white; transition-duration: 0.25s; transition-property: opacity, transform; transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1); overflow: hidden; }
  .scroll-left-enter, .scroll-right-leave-active { transform: translate(100vw, 0); }
  .scroll-left-leave-active, .scroll-right-enter { transform: translate(-100vw, 0); }

  .zoom-enter-active, .zoom-leave-active { animation-duration: 0.5s; animation-fill-mode: both; animation-name: zoom; }
  .zoom-leave-active { animation-direction: reverse; }
  
  @keyframes zoom {
    from { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }
    100% { opacity: 1; }
  }
</style>