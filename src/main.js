// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import wysiwyg from 'vue-wysiwyg'
import Editor from './components/Editor'
import './assets/css/vueWysiwyg.css'

Vue.use(wysiwyg, {})
Vue.component('editor', Editor)

Vue.config.productionTip = false
new Vue({
  el: '#editor',
  components: {
    Editor
  },
  template: `<Editor/>`
})

const apiURL = '/connections/';
