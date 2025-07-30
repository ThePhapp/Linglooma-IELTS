describe('ViewResultsPage', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/incorrectphonemes/resultView', {
      fixture: 'mockResults.json'
    }).as('getResults');

    cy.visit('http://localhost:4028/admin/view-results');
    cy.wait('@getResults');
  });

  it('Hiển thị tiêu đề và phần giới thiệu đúng', () => {
    cy.contains('IELTS 4-Skill Training');
    cy.contains('Practice your pronunciation');
    cy.contains('Result');
  });

  it('Hiển thị bảng kết quả đúng với dữ liệu mock', () => {
    cy.get('table tbody tr').should('have.length', 4); // 3 dòng dữ liệu + 1 dòng tổng
    cy.contains('Bài 1 - Giới thiệu bản thân');
    cy.contains('Bài 2 - Nói về sở thích');
    cy.contains('Bài 3 - Chủ đề khó');
  });

  it('Tìm kiếm hoạt động đúng', () => {
    cy.get('input[placeholder="Tìm bài kiểm tra..."]').type('sở thích');
    cy.get('table tbody tr').should('have.length', 2); // 1 kết quả + 1 tổng
    cy.contains('Bài 2 - Nói về sở thích');
  });

  it('Biểu đồ ẩn/hiện đúng khi nhấn nút', () => {
    cy.contains('Xem biểu đồ').click();
    cy.get('svg.recharts-surface').should('exist');
    cy.contains('Đóng biểu đồ').click();
    cy.get('svg.recharts-surface').should('not.exist');
  });

  it('Hiển thị icon đúng theo điểm số', () => {
    // Bài 1: 7.2 → xanh
    cy.get('tbody tr')
      .eq(0)
      .find('svg')
      .should('have.class', 'text-green-500');

    // Bài 2: 5.5 → vàng
    cy.get('tbody tr')
      .eq(1)
      .find('svg')
      .should('have.class', 'text-yellow-500');

    // Bài 3: 4.3 → đỏ
    cy.get('tbody tr')
      .eq(2)
      .find('svg')
      .should('have.class', 'text-red-500');
  });

  it('Tổng điểm trung bình hiển thị đúng', () => {
    cy.contains('Total Average Score')
      .parent()
      .should('contain.text', '5.7');
  });

  it('Nhấn vào điểm chuyển hướng đúng đến trang feedback', () => {
    cy.get('tbody tr')
      .eq(0)
      .contains('7.20')
      .click();
    cy.url().should('include', '/admin/features/feedback/1');
  });
});
