describe("products management works correctly", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("ingredient clicks open/clsoe modal with description", function () {
    // ingredient select working + click #11
    cy.get("[class^=burger-ingredient_link__]").first().as("ingredient");
    cy.get("@ingredient").click();

    // modal closing with overlay touch
    cy.get("[class^=modal-overlay_overlay__]").as("overlay");
    cy.get("@overlay").wait(500).invoke("click");

    cy.get("@ingredient").wait(500).click();

    // modal closing with closing button
    cy.get("[class^=modal_close__]").as("btnClose");
    cy.get("@btnClose").wait(500).click();
  });
});

describe("Dragtest", () => {
  it("should dragndrop", () => {
    cy.visit("http://localhost:3000");

    cy.get("[class^=burger-ingredient_link__]").first().as("ingredient");
    cy.get("[class^=burger-constructor_no_products__]").first().as("dropbox");

    cy.get("@ingredient").drag("@dropbox");
  });
});

// Order Create And Logging

describe("Order test", () => {
  it("should request order", () => {
    cy.visit("http://localhost:3000");

    cy.get("[class^=burger-ingredient_link__]").first().as("ingredient");
    cy.get("[class^=burger-constructor_no_products__]").first().as("dropbox");
    cy.get(".button").contains("ОФОРМИТЬ ЗАКАЗ").as("buttonOrder");

    cy.get("@buttonOrder").click();

    // redirected as we are not logged in 
    cy.url().should("include", "/login");

    cy.get('input[name="email"]').type("log@mail.com");
    cy.get('input[name="password"]').type("arpolozov1");

    cy.get("button").contains("Войти").as("loginButton");

    cy.get("@loginButton").click().wait(500);

    cy.get("@ingredient").drag("@dropbox");

    cy.get("@buttonOrder").click();
    cy.wait(15000);

    // rendered order details component 
    cy.get("[class^=order-details_wrap__]").as("orderCard").should("exist");

    // modal closing with closing button
    cy.get("[class^=modal_close__]").as("btnClose");
    cy.get("@btnClose").wait(500).click();
  });
});
