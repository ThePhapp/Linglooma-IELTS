describe('Component Lịch (Calendar)', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4028/admin/dashboard'); // Cập nhật nếu bạn dùng route khác
  });

  it('Hiển thị tiêu đề tháng đúng', () => {
    cy.contains('May 2025').should('exist');
  });

  it('Hiển thị đầy đủ 7 ngày trong tuần', () => {
    const ngayTrongTuan = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    ngayTrongTuan.forEach(ngay => {
      cy.contains(ngay).should('exist');
    });
  });

  it('Hiển thị đúng số lượng ngày trong tháng 5 (31 ngày)', () => {
    for (let i = 1; i <= 31; i++) {
      cy.contains('button', i.toString()).should('exist');
    }
  });

  it('Có đúng 3 ô trống đầu tháng (vì 1/5/2025 là thứ Năm)', () => {
    cy.get('.grid.grid-cols-7 > div.h-8').should('have.length', 3);
  });

  it('Đánh dấu ngày hôm nay với nền màu đặc biệt', () => {
    const homNay = new Date().getDate();
    cy.contains('button', homNay.toString())
      .should('have.class', 'bg-indigo-950')
      .and('have.class', 'text-white');
  });

    it('Các ngày không phải hôm nay có màu xám', () => {
    const homNay = new Date().getDate();
    cy.get('.grid-cols-7 button').each($btn => {
        const day = Number($btn.text());
        if (day !== homNay) {
        cy.wrap($btn).should('have.class', 'text-gray-500');
        }
    });
    });

  it('Không có ngày vượt quá 31', () => {
    cy.contains('32').should('not.exist');
    cy.contains('33').should('not.exist');
  });
});
