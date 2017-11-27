import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 通过mutation修改state的时候会在控制台打印修改记录
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 调试工具，检查state修改是不是通过mutations,如果不是会报错，性能损耗，不建议线上使用
const debug = process.env.NODE_EVN !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})