describe('Login', () => {
    it('Log in to the website', () => {
      cy.visit('http://localhost:3000');
      
      cy.get('#basic-button').click();
      
      cy.contains('Sign in').click();
      
      cy.get('form').within(() => {
        cy.get('input[name="username"]').type('Thomas');
        cy.get('input[name="password"]').type('test');
        cy.get('button').click();
      });

      cy.getCookie('next-auth.session-token').should('exist');
     
    })
  })
  