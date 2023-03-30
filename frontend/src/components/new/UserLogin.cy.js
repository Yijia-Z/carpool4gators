import React from 'react';
import { mount } from 'cypress/react';
import axios from 'axios';
import UserLogin from './UserLogin';

describe('UserLogin Component', () => {
    beforeEach(() => {
        mount(<UserLogin />);
    });

    it('renders the form elements', () => {
        cy.get('form').should('exist');
        cy.get('input[type="text"]').should('exist');
        cy.get('input[type="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('handles form submission', () => {
        cy.intercept('POST', '/api/user/login', { fixture: 'user_logged_in.json' }).as('loginUser');
        cy.get('input[type="text"]').type('testUsername');
        cy.get('input[type="password"]').type('testPassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginUser').then(({ request, response }) => {
            expect(request.body).to.deep.equal({
                username: 'testUsername',
                password: 'testPassword',
            });
            expect(response.statusCode).to.equal(200);
        });

        cy.on('window:alert', (message) => {
            expect(message).to.equal('User logged in successfully');
        });
    });
});