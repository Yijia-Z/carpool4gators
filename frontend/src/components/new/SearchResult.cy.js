import React from 'react';
import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import SearchResult from './SearchResult';

describe('SearchResult Component', () => {
    const trip = {
        id: 1,
        driver_id: 1,
        start: 'A',
        destination: 'B',
        date: '2023-04-19',
        seat_count: 4,
        available_seats: 2,
        price: 15.0,
    };

    it('renders correctly with the given trip', () => {
        mount(
            <MemoryRouter>
                <SearchResult trip={trip} />
            </MemoryRouter>
        );

        cy.get('[data-cy=driver-name]').contains(`Driver: ${trip.driver_id}`);
        cy.get('[data-cy=search-result]').contains(`Start: ${trip.start}`);
        cy.get('[data-cy=search-result]').contains(`Destination: ${trip.destination}`);
        cy.get('[data-cy=search-result]').contains(`Date: ${trip.date}`);
        cy.get('[data-cy=search-result]').contains(`Available Seats: ${trip.available_seats}`);
        cy.get('[data-cy=search-result]').contains(`Price: $${trip.price.toFixed(2)}`);
        cy.get('[data-cy=join-leave-btn]').contains('Join');
    });

    it('clicking on the driver name navigates to driver page', () => {
        mount(
            <MemoryRouter>
                <SearchResult trip={trip} />
            </MemoryRouter>
        );

        cy.get('[data-cy=driver-name]').click();
        cy.url().should('include', `/driver/${trip.driver_id}`);
    });

    it('clicking the join button changes its text to leave', () => {
        mount(
            <MemoryRouter>
                <SearchResult trip={trip} />
            </MemoryRouter>
        );

        cy.get('[data-cy=join-leave-btn]').click();
        cy.get('[data-cy=join-leave-btn]').contains('Leave');
    });
});
