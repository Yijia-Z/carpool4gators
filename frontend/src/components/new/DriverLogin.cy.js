import React from 'react';
import { mount } from 'cypress/react18';
import axios from 'axios';
import DriverLogin from './DriverLogin';

describe('DriverLogin Component', () => {
    beforeEach(() => {
        mount(<DriverLogin />);
    });

    it('renders the form elements', () => {
        cy.get('form').should('exist');
        cy.get('input[type="text"]').should('exist');
        cy.get('input[type="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('handles form submission', () => {
        cy.intercept('POST', '/api/driver/login', { fixture: 'driver_logged_in.json' }).as('loginDriver');
        cy.get('input[type="text"]').type('testDriverUsername');
        cy.get('input[type="password"]').type('testDriverPassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginDriver').then(({ request, response }) => {
            expect(request.body).to.deep.equal({
                username: 'testDriverUsername',
                password: 'testDriverPassword',
            });
            expect(response.statusCode).to.equal(200);
        });

        cy.on('window:alert', (message) => {
            expect(message).to.equal('Driver logged in successfully');
        });
    });
});