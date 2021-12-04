// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Create account', () => {
    before(() => {
        cy.visit('http://localhost:3000/api/auth/signin');
    
        cy.get('input[name="username"]').type('Testing');
        cy.get('input[name="password"]').type('test');
        cy.get('form').submit();

        cy.get('a[href="/accounts"]').click();
        cy.wait(1000);
        cy.get('button[name="Create_account"]').click();
    });

    beforeEach(() => {
       Cypress.Cookies.preserveOnce('next-auth.session-token', 'next-auth.csrf-token', 'next-auth.callback-url')      
    });

    it('List item should be availible', () => {
        cy.get('main').within(() => {
            cy.get('ul').get('li').should('have.text', '44444444');
        });
    });

    it('Create new list item', () => {
        cy.get('main').within(() => {
            cy.get('input[type="text"]').type("A new test item");
            cy.contains('Create account').click();
            cy.wait(3500);
            cy.get('li').eq(1).should('have.text', 'A new test item');
        });
    });

    it('Delete list item', () => {
        cy.get('main').within(() => {
            cy.get('li').eq(1).within(() => {
                cy.get('input').click();
            });
            cy.contains('Delete account').click();
            cy.wait(3500);
            cy.get('ul').its('length').should('eq', 1);
        });
    });
});