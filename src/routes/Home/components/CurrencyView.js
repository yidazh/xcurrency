import React from 'react'
import './CurrencyView.scss'
import { enablePrincipal } from '../modules/actions.js'

class CurrencyView extends React.Component {
  constructor(props) {
    super(props)
  }

  handleCurrencyFocus = e => {
    const { dispatch, currency } = this.props
    dispatch(enablePrincipal(currency.code))
  }

  render() {
    const { currency } = this.props
    const className = 'currency ' + (currency.principal ? 'principal' : '')
    return (
      <li className={className} onClick={this.handleCurrencyFocus}>
        <div className="flag item"></div>
        <div className="code item">{currency.code}</div>
        <div className="amount-name item">
          <div>
            <span className="amount">{currency.amount}</span>
            <br/>
            <span className="name">{currency.name}</span>
          </div>
        </div>
      </li>
    )
  }
}

export default CurrencyView
