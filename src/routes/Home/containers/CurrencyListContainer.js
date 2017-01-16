import { connect } from 'react-redux'
import CurrencyList from '../components/CurrencyList.js'

const mapStateToProps = state => {
  return {
    currencies: state.home.currencies
  }
}

export default connect(mapStateToProps)(CurrencyList)
