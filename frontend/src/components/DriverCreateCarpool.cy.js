import React from 'react'
import DriverCreateCarpool from './DriverCreateCarpool'

describe('<DriverCreateCarpool />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DriverCreateCarpool />)
  })
})