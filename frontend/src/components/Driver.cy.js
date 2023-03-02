import React from 'react'
import Driver from './Driver'

describe('Driver component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays driver information', () => {
    cy.get('.driver')
      .should('exist')
      .within(() => {
        cy.get('img').should('have.attr', 'src', 'https://zy-j.com/images/avatar.png');
        cy.get('h2').should('contain', 'Driver Name');
        cy.get('p').eq(0).should('contain', '8:00 AM');
        cy.get('p').eq(1).should('contain', '123 Main St, Anytown USA to 456 Park Ave, Anytown USA');
        cy.get('p').eq(2).should('contain', 'Remaining seats: 3');
        cy.get('p').eq(3).should('contain', 'Passenger ratings: 4, 5, 3');
        cy.get('p').eq(4).should('contain', 'Contact: john.doe@example.com');
        cy.get('button').eq(0).should('contain', 'Edit Information');
      });
  });

  it('displays request to join section', () => {
    cy.get('.driver-requests')
      .should('exist')
      .within(() => {
        cy.get('h2').should('contain', 'Requests to Join');
        cy.get('li').should('have.length', 3);
        cy.get('button').should('contain', 'Request to Join');
      });
  });

  it('handles edit information click event', () => {
    cy.get('.driver').within(() => {
      cy.get('button').eq(0).click();
    });
    // perform assertion for edit information logic here
  });

  it('handles request to join click event', () => {
    cy.get('.driver-requests').within(() => {
      cy.get('button').click();
    });
    // perform assertion for request to join logic here
  });
});
