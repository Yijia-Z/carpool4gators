import React from 'react';
import { mount } from 'cypress/react18';
import axios from 'axios';
import DriverRegister from './DriverRegister';

describe('DriverRegister Component', () => {
    beforeEach(() => {
        mount(<DriverRegister />);
    });

    it('renders the form elements', () => {
        cy.get('form').should('exist');
        cy.get('input[type="text"]').should('have.length', 2);
        cy.get('input[type="password"]').should('exist');
        cy.get('input[type="email"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('handles form submission', () => {
        cy.intercept('POST', '/api/driver/register', { fixture: 'driver_registered.json' }).as('registerDriver');
        cy.get('input[type="text"]').eq(0).type('testDriverUsername');
        cy.get('input[type="password"]').type('testDriverPassword');
        cy.get('input[type="email"]').type('testdriver@example.com');
        cy.get('input[type="text"]').eq(1).type('1234567890');
        cy.get('button[type="submit"]').click();

        cy.wait('@registerDriver').then(({ request, response }) => {
            expect(request.body).to.deep.equal({
                username: 'testDriverUsername',
                password: 'testDriverPassword',
                email: 'testdriver@example.com',
                phone: '1234567890',
            });
            expect(response.statusCode).to.equal(200);
        });

        cy.on('window:alert', (message) => {
            expect(message).to.equal('Driver registered successfully');
        });
    });
});