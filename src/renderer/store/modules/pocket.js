import { readFileByNode, isToday, isMonth } from '@/utils/util'

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
      readFileByNode((param) => {
        state.today = 0
        state.month = 0
        state.history = 0
        if (param !== 'ERR') {
          state.historyData = JSON.parse(param)
          state.historyData.map((item) => {
            state.history += item.money
          })
          state.todayData = state.historyData.filter((item) => {
            const itemDate = new Date(item.date)
            if (isToday(itemDate)) {
              return true
            }
          })
          state.todayData.map((item) => {
            state.today += item.money
          })
          state.monthData = state.historyData.filter((item) => {
            const itemDate = new Date(item.date)
            if (isMonth(itemDate)) {
              return true
            }
          })
          state.monthData.map((item) => {
            state.month += item.money
          })
        }
      })
    }
  },
  actions: {
    init_Data({ commit }) {
      commit('GET_POCKET_LIST')
    }
  }
}
export default pocket
