import React from 'react';
import { mount } from 'cypress/react';
import UserRegister from './UserRegister';

describe('UserRegister', () => {
    it('should register a new user', () => {
        mount(<UserRegister />);

        // fill out the form
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('testpass');
        cy.get('input[name="email"]').type('testuser@example.com');
        cy.get('input[name="phone"]').type('555-555-5555');

        // submit the form
        cy.get('button[type="submit"]').click();

        // check the response
        cy.on('window:alert', (alertMsg) => {
            expect(alertMsg).to.equal('User registered successfully');
        });
    });
});
