<template>
  <transition name='scroll'>
    <div v-if="visible" class="patient-button" @click="click">
      <div class="patient-button__button">
        <div class="patient-button__button__text">
          Сохранить изменения
        </div>
        <div class="patient-button__button__icon">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.492 10.172l-2.5 3.064-.737-.677 3.737-4.559 3.753 4.585-.753.665-2.5-3.076v7.826h-1v-7.828zm7.008 9.828h-13c-2.481 0-4.5-2.018-4.5-4.5 0-2.178 1.555-4.038 3.698-4.424l.779-.14.043-.789c.185-3.448 3.031-6.147 6.48-6.147 3.449 0 6.295 2.699 6.478 6.147l.044.789.78.14c2.142.386 3.698 2.246 3.698 4.424 0 2.482-2.019 4.5-4.5 4.5m.978-9.908c-.212-3.951-3.472-7.092-7.478-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.522-5.408"/></svg>
        </div>
      </div>
      <!-- <transition name="scroll"> -->
        <!-- <div @click="click" style="position: fixed; width: 100%; padding: 0 10px; bottom: 0; box-sizing: border-box">
          <div class='patient-button'>
            <div class="patient-button__text">
              Сохранить изменения
            </div>
            <div class="patient-button__icon">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.492 10.172l-2.5 3.064-.737-.677 3.737-4.559 3.753 4.585-.753.665-2.5-3.076v7.826h-1v-7.828zm7.008 9.828h-13c-2.481 0-4.5-2.018-4.5-4.5 0-2.178 1.555-4.038 3.698-4.424l.779-.14.043-.789c.185-3.448 3.031-6.147 6.48-6.147 3.449 0 6.295 2.699 6.478 6.147l.044.789.78.14c2.142.386 3.698 2.246 3.698 4.424 0 2.482-2.019 4.5-4.5 4.5m.978-9.908c-.212-3.951-3.472-7.092-7.478-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.522-5.408"/></svg>
            </div>
          </div>
        </div> -->
      <!-- </transition> -->
    </div>
  </transition>
</template>

<style scoped>
  .patient-button { position: fixed; bottom: 0; width: 100%; padding: 0 10px; box-sizing: border-box; }
  .patient-button__button { border-top-left-radius: 10px; border-top-right-radius: 10px; bottom: 0; width: 100%; background: linear-gradient(45deg, rgba(0,122,255,1), rgb(0, 27, 182)); padding: 15px 20px; align-items: center; display: flex; justify-content: space-between; box-sizing: border-box; }
  .patient-button__button__icon { fill: white; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 0 1px white; border-radius: 1000px; width: 2em; height: 2em; }
  .patient-button__button__text { color: white; font-weight: 300; }

  .scroll-enter-active, .scroll-leave-active { transition: all .5s; }
  .scroll-enter, .scroll-leave-to { transform: translateY(100%); }
  .scroll-enter-to, .scroll-leave { transform: translateY(0); }
</style>

<script>
  export default {
    props: [ "visible", ],
    data: function() {
      return {
        created: null,
      }
    },
    mounted() {
      this.created = true
    },
    methods: {
      click() {
        this.$emit('click', true)
      },
    },
  }
</script>
