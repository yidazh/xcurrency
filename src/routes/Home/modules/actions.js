import $ from 'jquery'

export const ENABLE_PRINCIPAL = 'ENABLE_PRINCIPAL'
export const DISABLE_INITIAL = 'DISABLE_INITIAL'
export const ENABLE_INITIAL = 'ENABLE_INITIAL'
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
export const CONVERT_CURRENCY = 'CONVERT_CURRENCY'
export const REQUEST_RATE = 'REQUEST_RATE'
export const FETCH_RATES = 'FETCH_RATES'

export const enablePrincipal = code => {
  return dispatch => {
    dispatch({
      type: 'ENABLE_PRINCIPAL',
      code
    })
    dispatch(initialConvert())
  }
}

export const enableInitial = () => {
  return {
    type: 'ENABLE_PRINCIPAL'
  }
}

export const disableInitial = () => {
  return {
    type: 'DISABLE_INITIAL'
  }
}

export const changeCurrency = (from, to) => {
  return {
    type: 'CHANGE_CURRENCY',
    from,
    to
  }
}

export const initialConvert = () => {
  return (dispatch, getState) => {
    const currencies = getState().home.currencyList.currencies || []
    const latestRates = getState().home.latestRates
    const principal = currencies.find(v => v.principal).code
    const others = currencies.filter(v => !v.principal)

    let rates = {};
    if (principal === latestRates.base) {
      rates = latestRates.rates
    } else {
      others.forEach(v => {
        let rate;
        if (v.code === latestRates.base) {
          rate = 1 / latestRates.rates[principal]
        } else {
          rate = latestRates.rates[v.code] / latestRates.rates[principal]
        }
        rates[v.code] = rate
      })
    }

    dispatch({
      type: CONVERT_CURRENCY,
      rates
    })
  }
}

export const fetchRates = base => {
  return dispatch => {
    $.ajax({
      url: '//api.fixer.io/latest',
      data: {
        base
      },
      dataType: 'jsonp'
    }).done(data => {
      dispatch({
        type: FETCH_RATES,
        info: data
      })
      dispatch(initialConvert())
    })
  }
}
