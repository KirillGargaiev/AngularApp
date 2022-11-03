describe('Category Page', () => {
  beforeEach(()=>{
    cy.visit('/')
  })

  it('should create',  () => {
    cy.title().should('exist', 'Angular HW')
  });

  it('should redirect to categories', () => {
    cy.get("div[data-cy='categories']").click()
    cy.url().should('include', '/categories')
  });

  it('should redirect to first category', ()=>{
    cy.get("div[data-cy='categories']").click()
    cy.get("div[data-cy='menu_item']:first").click(20,5)
    cy.url().should('include', '/categories/0')
  })

  it('should change view to list',  () => {
    cy.get("div[data-cy='categories']").click()
    cy.get("div[data-cy='menu_item']:first").click(20,5)
    cy.get("div[data-cy='list_button']").click()
    cy.get("div[class='list']").should('exist')
  });

  it('should change view to grid', () => {
    cy.get("div[data-cy='categories']").click()
    cy.get("div[data-cy='menu_item']:first").click(20,5)
    cy.get("div[data-cy='list_button']").click()
    cy.get("div[data-cy='grid_button']").click()
    cy.get("div[class='grid']").should('exist')
  });

  it('should redirect to product and set this title', () => {
    cy.get("div[data-cy='categories']").click()
    cy.get("div[data-cy='menu_item']:first").click(20,5)
    cy.get("div[data-cy='product_button']:first").click()
    cy.url().should("include", '/product/2')
  });
})
