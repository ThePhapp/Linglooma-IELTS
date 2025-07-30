describe('PracticeCard', () => {
  beforeEach(() => {
    // Giả sử trang features/skill4 sẽ render các PracticeCard
    cy.visit('http://localhost:4028/admin/features');
  });

  it('Hiển thị đúng title, description và nút LEARN', () => {
    cy.contains('IELTS 4-Skill Training').should('exist');
    cy.contains('Practice your pronunciation by recording yourself reading the passage').should('exist');

    // Kiểm tra card Speaking Practice
    cy.contains('header', 'Speaking Practice').should('exist');
    cy.contains('button', 'LEARN').should('exist');
  });

  it('Click LEARN ở ô Speaking Practice sẽ chuyển hướng đúng', () => {
    // Giả sử card có title "Speaking Practice"
    cy.contains('header', 'Speaking Practice')
      .parent()
      .within(() => {
        cy.contains('button', 'LEARN').click();
      });

    // Kiểm tra đã chuyển hướng đúng route
    cy.url().should('include', '/admin/features/lesson');
  });
});