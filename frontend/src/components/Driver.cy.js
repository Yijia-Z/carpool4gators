import React from 'react'
import Driver from './Driver'

describe('Driver component', () => {
  it('renders driver information correctly', () => {
    const driver = {
      name: 'Driver Name',
      profilePicture: 'https://zy-j.com/images/avatar.png',
      departureTime: '8:00 AM',
      departureLocation: '123 Main St, Anytown USA',
      arrivalLocation: '456 Park Ave, Anytown USA',
      remainingSeats: 3,
      passengerRatings: [4, 5, 3],
      contactInformation: 'john.doe@example.com'
    };

    cy.mount(<Driver />);

    cy.get('.driver-info h2').should('have.text', driver.name);
    cy.get('.driver-info p').eq(0).should('have.text', driver.departureTime);
    cy.get('.driver-info p').eq(1).should('have.text', `${driver.departureLocation} to ${driver.arrivalLocation}`);
    cy.get('.driver-info p').eq(2).should('have.text', `Remaining seats: ${driver.remainingSeats}`);
    cy.get('.driver-info p').eq(3).should('have.text', `Passenger ratings: ${driver.passengerRatings.join(', ')}`);
    cy.get('.driver-info p').eq(4).should('have.text', `Contact: ${driver.contactInformation}`);
  });
});
