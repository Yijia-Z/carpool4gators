import React from 'react';
import { mount } from 'cypress/react18';
import axios from 'axios';
import EditDriverInfo from './EditDriverInfo';

describe('EditDriverInfo', () => {
    beforeEach(() => {
        mount(<EditDriverInfo />);
    });

    it('displays the form inputs', () => {
        cy.get('form').should('exist')
        cy.get('input[name="username"]').should('exist')
        cy.get('input[name="email"]').should('exist')
        cy.get('input[name="phone"]').should('exist')
        cy.get('input[name="password"]').should('exist')
        cy.get('button[type="submit"]').should('exist')
    })

    it('updates driver info on form submission', () => {
        cy.intercept('PUT', '/api/driver/*', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    code: 0,
                    msg: 'Driver information updated successfully'
                }
            })
        }).as('updateDriver')

        const updatedFormData = {
            username: 'newusername',
            email: 'newemail@example.com',
            phone: '1234567890',
            password: 'newpassword'
        }

        cy.get('input[name="username"]').clear().type(updatedFormData.username)
        cy.get('input[name="email"]').clear().type(updatedFormData.email)
        cy.get('input[name="phone"]').clear().type(updatedFormData.phone)
        cy.get('input[name="password"]').clear().type(updatedFormData.password)

        cy.get('button[type="submit"]').click()

        cy.wait('@updateDriver').its('request.body').should('deep.equal', updatedFormData)
        cy.get('form').should('not.exist')
        cy.contains('Driver information updated successfully').should('exist')
    })

    it('displays error message on form submission failure', () => {
        cy.intercept('PUT', '/api/driver/*', {
            statusCode: 500,
            body: {}
        }).as('updateDriver')

        cy.get('button[type="submit"]').click()

        cy.wait('@updateDriver')
        cy.contains('Error updating driver information').should('exist')
    })
})
