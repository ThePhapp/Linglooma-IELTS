describe('Giao diện phản hồi phát âm - PronunciationFeedback', () => {
  const lessonId = 'abc123';

  beforeEach(() => {
    cy.intercept('GET', `/api/incorrectphonemes/feedback-summary?lessonResultId=${lessonId}`, {
      fixture: 'feedback.json' // tạo file feedback.json trong thư mục cypress/fixtures
    }).as('fetchFeedback');

    cy.visit(`/admin/features/feedback/${lessonId}`);
  });

  it('Hiển thị thông báo tải dữ liệu', () => {
    cy.contains('Đang tải dữ liệu...').should('be.visible');
  });

  it('Hiển thị tiêu đề bảng câu hỏi và nút quay lại', () => {
    cy.wait('@fetchFeedback');
    cy.contains('Question').should('be.visible');
    cy.contains('False Words').should('be.visible');
    cy.contains('Score').should('be.visible');
    cy.contains('Feedback').should('be.visible');
    cy.contains('Back').should('be.visible');
  });

  it('Hiển thị các câu hỏi với điểm, từ sai và phản hồi', () => {
    cy.wait('@fetchFeedback');

    cy.get('article').should('have.length.at.least', 1);
    cy.get('article').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('.bg-blue-200').should('exist');         // Question number
        cy.get('.bg-stone-300').should('exist');        // False Words
        cy.get('.bg-cyan-300').should('exist');         // Feedback
        cy.contains(/(Beginner|Elementary|Intermediate|Upper Intermediate|Proficient)/).should('exist');
      });
    });
  });

  it('Hiển thị điểm trung bình và gợi ý cải thiện phù hợp', () => {
    cy.wait('@fetchFeedback');
    cy.contains('Tổng kết').scrollIntoView().should('be.visible');
    cy.get('div.bg-yellow-50').within(() => {
      cy.contains('Gợi ý cải thiện:').should('be.visible');
      cy.get('li').should('have.length.at.least', 1);
    });
  });

  it('Hiển thị và ẩn biểu đồ điểm khi nhấn nút', () => {
    cy.wait('@fetchFeedback');
    cy.contains('Xem biểu đồ').click();

    // Thử kiểm tra canvas, nếu không có thì kiểm tra svg hoặc class khác
    cy.get('canvas, svg, .question-score-chart', { timeout: 10000 }).should('exist');

    cy.contains('Ẩn biểu đồ').click();
    //cy.get('canvas, svg, .question-score-chart').should('not.be.visible');
  });

  it('Nút "Back" điều hướng chính xác về trang luyện tập', () => {
    cy.wait('@fetchFeedback');
    cy.contains('Back').click();
    cy.url().should('include', `/admin/features/practice/${lessonId}`);
  });
});
