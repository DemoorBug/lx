import * as constants from './constants'
import { fromJS } from 'immutable'
export const focused = {
  type: constants.FOCUSED,
  focused: true
}

export const falseFocused = {
  type: constants.FALSEFOCUSED,
  focused: false
}

export const ajaxserch = {
  type: constants.AJAXSERCH
}

export const mouseenter = {
  type: constants.MOUSEENTER
}

export const mouseleave = {
  type: constants.MOUSELEAVE
}

export const page_change = (page) => ({
  type: constants.PAGE_CHANGE,
  page
})

export const change_list = (data) => ({
  type: constants.CHANGE_LIST,
  data: fromJS(data),
  length: Math.ceil(data.length / 10)
})
