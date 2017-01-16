import _ from 'lodash'
import allCurrencies from './currencies.js'
import {
  ENABLE_PRINCIPAL,
  DISABLE_INITIAL,
  CHANGE_CURRENCY
} from './actions.js'

const commons = ['CNY', 'HKD', 'USD', 'JPY']
const primary = 'CNY'
const initialState = {
  initial: true,
  currencies: allCurrencies.filter(c => commons.indexOf(c.code) !== -1).map(c => {
    return {
      ...c,
      primary: c.code === primary,
      amount: c.code === primary ? '100' : ''
    }
  })
}

console.log(initialState);

const currencyListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_PRINCIPAL:
      return Object.assign({}, state, {
        currencies: state.currencies.map(currency => {
          if (currency.name === action.name) {
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
    default:
      return initialState
  }
}

export default currencyListReducer
