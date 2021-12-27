/// <reference types="cypress" />

context('Chat button', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('render chat icon correctly', () => {
    cy.get('#cy-chat-button')
      .should('exist')
      .should('have.class', 'animate__animated')
      .within(() => {
        cy.get('#cy-open-chat').should('exist');
        cy.get('#cy-close-chat').should('not.exist');
      });
  });

  it('toggle chat icon correctly', () => {
    cy.get('#cy-chat-window').should('not.visible');
    cy.get('#cy-close-chat').should('not.exist');
    cy.get('#cy-open-chat').should('exist');

    cy.get('#cy-chat-button')
      .click()
      .within(() => {
        cy.get('#cy-close-chat').should('exist');
      });
    cy.get('#cy-chat-window').should('be.visible');
  });
});
