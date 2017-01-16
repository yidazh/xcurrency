import React, { Component } from 'react'

class CurrencyList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
        {this.props.currencies.map(currency =>
          <li key={currency.code}>{currency.name} {currency.amount}</li>
        )}
      </ul>
    )
  }
}

export default CurrencyList
