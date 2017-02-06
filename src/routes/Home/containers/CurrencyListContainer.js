import { connect } from 'react-redux'
import { enablePrincipal } from '../modules/actions.js'
import CurrencyList from '../components/CurrencyList.js'

const mapStateToProps = state => {
  return {
    currencies: state.home.currencyList.currencies
  }
}

export default connect(mapStateToProps)(CurrencyList)
