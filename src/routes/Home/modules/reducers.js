import { combineReducers } from 'redux'
import _ from 'lodash'
import allCurrencies from './currencies.js'
import {
  ENABLE_PRINCIPAL,
  DISABLE_INITIAL,
  CHANGE_CURRENCY,
  CONVERT_CURRENCY,
  FETCH_RATES
} from './actions.js'

const commons = ['CNY', 'HKD', 'USD', 'JPY']
const principal = 'CNY'

const initialState = {
  initial: true,
  currencies: allCurrencies.filter(c => commons.indexOf(c.code) !== -1).map(c => {
    return {
      ...c,
      principal: c.code === principal,
      amount: c.code === principal ? '100' : ''
    }
  })
}

const currencyList = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_PRINCIPAL:
      return Object.assign({}, state, {
        currencies: state.currencies.map(currency => {
          if (currency.code === action.code) {
            currency.principal = true
            if (state.initial) {
              currency.amount = '100'
            }
          } else {
            currency.principal = false
            if (state.initial) {
              currency.amount = ''
            }
          }
          return currency
        })
      })
      break;

    case CHANGE_CURRENCY:
      const index = state.currencies.findIndex(v => {
        v.name === action.from
      })
      const from = state.currencies[index]
      return {
        initial: from.principal ? true : state.initial,
        currencies: state.currencies.splice(index, 1, {
          name: action.to,
          amount: from.principal ? '100' : '',
          principal: from.principal
        })
      }

    case CONVERT_CURRENCY:
      const principal = state.currencies.find(v => v.principal)
      const baseAmount = parseFloat(principal.amount)
      return Object.assign({}, state, {
        currencies: state.currencies.map(v => {
          if (action.rates[v.code]) {
            v.amount = String((baseAmount * action.rates[v.code]).toFixed(2))
          }
          return v
        })
      })

    default:
      return state
  }
}

const latestRates = (state = {}, action) => {
  switch (action.type) {
    case FETCH_RATES:
      return action.info
      break;
    default:
      return state
  }
}

export default combineReducers({
  currencyList,
  latestRates
})
