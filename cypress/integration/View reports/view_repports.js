describe('Edit account', () => {
    before(() => {
        cy.visit('http://localhost:3000/api/auth/signin');
    
        cy.get('input[name="username"]').type('Testing');
        cy.get('input[name="password"]').type('test');
        cy.get('form').submit();

        cy.get('a[href="/accounts"]').click();
        cy.wait(1000);
        cy.get('button[name="View_reports"]').click();
    });

    beforeEach(() => {
       Cypress.Cookies.preserveOnce('next-auth.session-token', 'next-auth.csrf-token', 'next-auth.callback-url')      
    });

    it('Check diagram', () => {
        cy.get('main').within(() => {
            cy.get('#demo-simple-select').click();
            cy.wait(1000);
        });
        cy.get('ul[aria-labelledby="demo-simple-select-label"]').within(() => {
            cy.contains('44444444').click();
            cy.wait(3000);
        });
        
        cy.get('canvas').should('exist');


    })
})