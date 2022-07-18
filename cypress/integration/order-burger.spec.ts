/// <reference types="cypress" />

describe("Тесты", () => {
  it("доступность сайта localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });

  it("авторизация", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('[name="email"]').type("test@test.ghghgh");
    cy.get('[name="password"]').type("zxczxc");
    cy.get('[name="loginButton"]').click();
  });

  //открытие модального окна с описанием ингредиента,
  //отображение в модальном окне данных ингредиента,
  it("открытие модального окна с описанием ингредиента", () => {
    cy.get('[alt="Краторная булка N-200i"]').click();
    cy.get('[id="react-modals"]').contains("Краторная булка N-200i");
    cy.get('[data-cypress="closeModalButton"]').should('exist');
    cy.get('[data-cypress="closeModalButton"]').click();
    cy.get('[data-cypress="closeModalButton"]').should('not.exist');
  });

  //перетаскивание ингредиента в конструктор,
  it("перетаскивание ингредиента в конструктор", () => {
    cy.get('[alt="Краторная булка N-200i"]').trigger("dragstart");
    cy.get('[data-cypress="constructor"]').trigger("drop");
  });

  //открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»,
  it("открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»", () => {
    cy.get('[name="orderButton"]').click();
  });

   //закрытие модальных окон при клике на кнопку закрытия.
  it("закрытие модальных окон при клике на кнопку закрытия", () => {
    cy.get('[data-cypress="closeModalButton"]').should('exist');
    cy.get('[data-cypress="closeModalButton"]').click();
    cy.get('[data-cypress="closeModalButton"]').should('not.exist');
  });
 
});
