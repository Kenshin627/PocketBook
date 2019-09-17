import { readFileByNode } from '@/utils/util'

const pocket = {
  state: {
    todayData: [],
    today: 0,
    monthData: [],
    month: 0,
    historyData: [],
    history: 0,
    region: 0
  },
  mutations: {
    GET_POCKET_LIST: (state) => {
      return readFileByNode()
    }
  },
  actions: {
    init_Data({ commit }) {
      return commit('GET_POCKET_LIST')
    }
  }
}
export default pocket
