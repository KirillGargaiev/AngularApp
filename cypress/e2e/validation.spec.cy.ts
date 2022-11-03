describe('Category Page', () => {
  beforeEach(()=>{
    cy.visit('/')
  })

  it('should check the existence of validators', () => {
    cy.get("div[data-cy='pic_title']:last").click()
    cy.get("div[data-cy='form_item']:nth-child(2) > input:nth-child(2)").type('privet')
    cy.get("button[data-cy='form_item-button']").click({force:true})
    cy.get("div[data-cy='form_email']").should('exist')
    cy.get("div[data-cy='form_email']").should('have.text', 'Enter valid email')
  });
})
