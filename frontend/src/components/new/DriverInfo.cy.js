import React from 'react';
import { mount } from 'cypress/react18';
import axios from 'axios';
import DriverInfo from './DriverInfo';

describe('DriverInfo Component', () => {
    const driverId = 1;

    beforeEach(() => {
        mount(<DriverInfo driverId={driverId} />);
    });

    it('fetches and displays driver information', () => {
        cy.intercept('GET', `/api/driver/${driverId}`, { fixture: 'driver_info.json' }).as('fetchDriverInfo');

        cy.wait('@fetchDriverInfo').then(({ request, response }) => {
            expect(request.url).to.contain(`/api/driver/${driverId}`);
            expect(response.statusCode).to.equal(200);
        });

        cy.get('ul li').should('have.length', 5);
    });
});