import React, { Component } from 'react'
import CurrencyView from './CurrencyView.js'

class CurrencyList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch } = this.props
    return (
      <ul className="currency-wrapper">
        {this.props.currencies.map(currency =>
          <CurrencyView key={currency.code} currency={currency} dispatch={dispatch}></CurrencyView>
        )}
      </ul>
    )
  }
}

export default CurrencyList
