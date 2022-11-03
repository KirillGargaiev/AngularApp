describe('Product Page', ()=>{
  beforeEach(()=>{
    cy.visit('/')
  })

  it('should add product to basket', () => {
    cy.get("button[data-cy='pic_button']:last").click(60,15)
    cy.get("img[data-cy='basket_icon']").click()
    cy.get("div[data-cy='order_item']").should('exist')
  });

  it('should add a review to product', ()=>{
    cy.get("div[data-cy=pic_title]:last").click()
    const review = {
      name: "Oleg",
      email: "Oleg@mail.ru",
      rate: "5",
      comment: "Test is done"
    }
    cy.get("div[data-cy='form_item']:nth-child(1) > input:nth-child(2)").type(review.name)
    cy.get("div[data-cy='form_item']:nth-child(2) > input:nth-child(2)").type(review.email)
    cy.get("div[data-cy='form_item']:nth-child(3) > select:nth-child(2)").select(review.rate)
    cy.get("div[data-cy='form_item']:nth-child(4) > input:nth-child(2)").type(review.comment)
    cy.get("button[data-cy='form_item-button']").click(50, 30, {force: true})
    cy.get("div[data-cy='review_item']:last-child > div:nth-child(1)").should('have.text', `${review.name}:`)
    cy.get("div[data-cy='review_item']:last-child > div:nth-child(2)").should('have.text', `"${review.comment}"`)

  })
})
