import React from 'react'
import CurrencyList from '../containers/CurrencyListContainer.js'
import Calculator from './Calculator.js'
import './HomeView.scss'

export const HomeView = () => (
  <div className="wrapper">
    <CurrencyList></CurrencyList>
    <Calculator></Calculator>
  </div>
)

export default HomeView
