// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Edit account', () => {
    before(() => {
        cy.visit('http://localhost:3000/api/auth/signin');
    
        cy.get('input[name="username"]').type('Testing');
        cy.get('input[name="password"]').type('test');
        cy.get('form').submit();

        cy.get('a[href="/accounts"]').click();
        cy.wait(1000);
        cy.get('button[name="Edit_account"]').click();
    });

    beforeEach(() => {
       Cypress.Cookies.preserveOnce('next-auth.session-token', 'next-auth.csrf-token', 'next-auth.callback-url')      
    });

    it('Check list length', () => {
        cy.get('main').within(() => {
            cy.get('#demo-simple-select').click();
            cy.wait(1000);
        });
        cy.get('ul[aria-labelledby="demo-simple-select-label"]').within(() => {
            cy.contains('44444444').click();
            cy.wait(1000);
        });
        cy.get('main').within(() => {
            cy.get('tbody').within(() => {
                cy.get('tr').should('have.length', 4);
            })
        });
    });
    it('Create new row', () => {
        cy.get('main').within(() => {
            cy.contains('Create new row').click();
            cy.wait(1000);
            cy.get('tbody').within(() => {
                cy.get('tr').should('have.length', 5);
            })
        });
    });
    it('Delete row', () => {
        cy.get('main').within(() => {
            cy.get('tbody').within(() => {
                cy.get('tr').eq(4).contains('Delete').click();
                cy.wait(1000);
                cy.get('tr').should('have.length', 4);
            })
            cy.contains('Upload all').click();
            cy.wait(1000);
            cy.get('tbody').within(() => {
                cy.get('tr').should('have.length', 4);
            })
        });
    });
});