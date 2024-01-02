async function blurHandler(el: HTMLInputElement) {
  setTimeout(() => {
    el.focus()
  })
}

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('lock-focus', {
    mounted(el) {
      el.focus()
      el.addEventListener('blur', blurHandler.bind(this, el))
    },
    unmounted(el) {
      el.removeEventListener('blur', blurHandler.bind(this, el))
    },
    getSSRProps() {
      return {}
    },
  })
})
