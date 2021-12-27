/// <reference types="cypress" />

context('Chat', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('render hidden chat', () => {
    cy.get('#cy-chat-window').should('not.visible');
  });

  it('toggle the chat', () => {
    cy.get('#cy-chat-button').click();
    cy.get('#cy-chat-window').should('be.visible');
    cy.get('#cy-chat-button').click();
    cy.get('#cy-chat-window').should('not.visible');
  });

  it('render chat elements without messages', () => {
    cy.get('#cy-chat-button').click();
    cy.get('#cy-chat-window')
      .should('exist')
      .within(() => {
        cy.get('#cy-chat-messages-list').should('exist');
        cy.get('#cy-message').should('not.exist');
        cy.get('#cy-form').should('exist');
        cy.get('#cy-chat-input').should('exist');
        cy.get('#cy-chat-input').invoke('attr', 'placeholder').should('contain', 'Send a message...');
        cy.get('#cy-submit').should('exist');
      });
  });

  it('interact with the chat - send and receive messages', () => {
    cy.get('#cy-chat-button').click();
    cy.get('#cy-bot-message').should('not.exist');
    cy.get('#cy-user-message').should('not.exist');

    cy.get('#cy-chat-input').type('Hello{enter}');

    cy.get('#cy-user-message').first().contains('Hello');
    cy.get('#cy-bot-message').last().should('exist');

    cy.get('input').invoke('val').should('be.empty');
  });
});
