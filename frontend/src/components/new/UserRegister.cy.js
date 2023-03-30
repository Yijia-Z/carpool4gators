import React from 'react';
import { mount } from 'cypress/react18';
import axios from 'axios';
import UserRegister from './UserRegister.js';

describe('UserRegister Component', () => {
    beforeEach(() => {
        mount(<UserRegister />);
    });

    it('renders the form elements', () => {
        cy.get('form').should('exist');
        cy.get('input[type="text"]').should('have.length', 2);
        cy.get('input[type="password"]').should('exist');
        cy.get('input[type="email"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('handles form submission', () => {
        cy.intercept('POST', '/api/user/add_user', { fixture: 'user_registered.json' }).as('registerUser');
        cy.get('input[type="text"]').eq(0).type('testUsername');
        cy.get('input[type="password"]').type('testPassword');
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="text"]').eq(1).type('1234567890');
        cy.get('button[type="submit"]').click();

        cy.wait('@registerUser').then(({ request, response }) => {
            expect(request.body).to.deep.equal({
                username: 'testUsername',
                password: 'testPassword',
                email: 'test@example.com',
                phone: '1234567890',
            });
            expect(response.statusCode).to.equal(200);
        });

        cy.on('window:alert', (message) => {
            expect(message).to.equal('User registered successfully');
        });
    });
});
