import React from 'react';
import { mount } from 'cypress/react18';
import axios from 'axios';
import SearchTrips from './SearchTrips';

describe('SearchTrips Component', () => {
    beforeEach(() => {
        mount(<SearchTrips />);
    });

    it('renders the form elements', () => {
        cy.get('form').should('exist');
        cy.get('input[type="text"]').should('have.length', 2);
        cy.get('input[type="date"]').should('exist');
        cy.get('input[type="number"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('handles form submission and displays search results', () => {
        cy.intercept('GET', '/api/trips', { fixture: 'trips.json' }).as('searchTrips');
        cy.get('input[type="text"]').eq(0).type('StartCity');
        cy.get('input[type="text"]').eq(1).type('DestinationCity');
        cy.get('input[type="date"]').type('2023-04-15');
        cy.get('input[type="number"]').type('2');
        cy.get('button[type="submit"]').click();

        cy.wait('@searchTrips').then(({ request, response }) => {
            expect(request.url).to.contain('/api/trips');
            expect(request.url).to.contain('start=StartCity');
            expect(request.url).to.contain('destination=DestinationCity');
            expect(request.url).to.contain('date=2023-04-15');
            expect(request.url).to.contain('seat_count=12');
            expect(response.statusCode).to.equal(200);
        });

        cy.get('ul li').should('have.length', 2);
    });
});