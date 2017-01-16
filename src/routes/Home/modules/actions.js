export const ENABLE_PRINCIPAL = 'ENABLE_PRINCIPAL'
export const DISABLE_INITIAL = 'DISABLE_INITIAL'
export const ENABLE_INITIAL = 'ENABLE_INITIAL'
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
export const CONVERT_CURRENCY = 'CONVERT_CURRENCY'
export const REQUEST_RATE = 'REQUEST_RATE'

export const enablePrincipal = name => {
  return {
    type: 'ENABLE_PRINCIPAL',
    name
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

export const convertCurrency = name => {
  return {
    type: 'CONVERT_CURRENCY',
    name
  }
}
