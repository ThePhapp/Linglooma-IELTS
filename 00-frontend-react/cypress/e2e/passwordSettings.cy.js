describe('Form đổi mật khẩu - PasswordSettingsForm', () => {
  beforeEach(() => {
    // Mock API lấy thông tin user nếu có
    cy.intercept('GET', '/api/users/account', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          username: 'testuser',
          email: 'test@example.com',
          gender: 'male',
          nationality: 'Vietnamese',
          phonenumber: '0123456789'
        }
      }
    }).as('getMe');
    cy.loginUI && cy.loginUI();
    cy.visit('admin/settings');
  });

  it('Hiển thị đầy đủ các trường và nút', () => {
    cy.get('form').eq(1).within(() => {
      cy.get('label').contains('User Name').should('exist');
      cy.get('input#username').should('exist');
      cy.get('label').contains('Current Password').should('exist');
      cy.get('input#currentPassword').should('exist');
      cy.get('label').contains('New Password').should('exist');
      cy.get('input#newPassword').should('exist');
      cy.get('label').contains('Confirm Password').should('exist');
      cy.get('input#confirmPassword').should('exist');
      cy.get('label').contains('Gender').should('exist');
      cy.get('input#gender').should('exist');
      cy.get('label').contains('Nationality').should('exist');
      cy.get('input#nationality').should('exist');
      cy.get('label').contains('Phone number').should('exist');
      cy.get('input#phonenumber').should('exist');
      cy.get('button[type="submit"]').contains('Save').should('exist');
    });
  });

  it('Báo lỗi khi mật khẩu mới và xác nhận không khớp', () => {
    // Mock lại API trước khi reload để tránh lỗi Network Error
    cy.intercept('GET', '/api/users/account', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          username: 'testuser',
          email: 'test@example.com',
          gender: 'male',
          nationality: 'Vietnamese',
          phonenumber: '0123456789'
        }
      }
    }).as('getMeReload');
    cy.reload();
    cy.get('input#currentPassword').type('oldpass123');
    cy.get('input#newPassword').type('newpass456');
    cy.get('input#confirmPassword').type('khongtrung456');
    cy.get('button[type="submit"]').click();
    cy.contains('New password and confirm password do not match').should('be.visible');
  });

  it('Gửi đúng payload khi đổi mật khẩu thành công', () => {
    cy.intercept('PUT', '/api/users/update', {
      statusCode: 200,
      body: { success: true }
    }).as('updatePassword');

    cy.get('input#username').clear().type('newusername');
    cy.get('input#currentPassword').type('oldpass123');
    cy.get('input#newPassword').type('newpass456');
    cy.get('input#confirmPassword').type('newpass456');
    cy.get('input#gender').clear().type('male');
    cy.get('input#nationality').clear().type('Vietnamese');
    cy.get('input#phonenumber').clear().type('0123456789');
    cy.get('button[type="submit"]').click();

    cy.wait('@updatePassword').its('request.body').should((body) => {
      expect(body.username).to.eq('newusername');
      expect(body.currentPassword).to.eq('oldpass123');
      expect(body.password).to.eq('newpass456');
      expect(body.gender).to.eq('male');
      expect(body.nationality).to.eq('Vietnamese');
      expect(body.phonenumber).to.eq('0123456789');
    });
    cy.contains('Cập nhật thành công').should('be.visible');
  });

  it('Hiển thị lỗi khi API trả về lỗi', () => {
    cy.intercept('PUT', '/api/users/update', {
      statusCode: 400,
      body: { message: 'Lỗi: Sai mật khẩu hiện tại' }
    }).as('updateFail');

    cy.get('input#currentPassword').type('saioldpass');
    cy.get('input#newPassword').type('newpass456');
    cy.get('input#confirmPassword').type('newpass456');
    cy.get('button[type="submit"]').click();

    cy.wait('@updateFail');
    cy.contains('Lỗi: Sai mật khẩu hiện tại').should('be.visible');
  });

  it('Hiển thị loading khi đang gửi dữ liệu (giả lập delay)', () => {
    cy.intercept('PUT', '/api/users/update', (req) => {
      req.reply((res) => {
        res.delay = 1500;
        res.send({ success: true });
      });
    }).as('updateDelay');

    cy.reload();
    cy.get('input#currentPassword').type('oldpass123');
    cy.get('input#newPassword').type('newpass456');
    cy.get('input#confirmPassword').type('newpass456');
    cy.get('button[type="submit"]').click();

    // Có thể kiểm tra trạng thái loading nếu UI có hiển thị
    // cy.contains('Đang lưu...').should('exist');
    cy.wait('@updateDelay');
    cy.contains('Cập nhật thành công').should('be.visible');
  });

  it('Reset các trường mật khẩu sau khi đổi thành công', () => {
    cy.intercept('PUT', '/api/users/update', {
      statusCode: 200,
      body: { success: true }
    }).as('updatePassword');

    cy.get('input#currentPassword').type('oldpass123');
    cy.get('input#newPassword').type('newpass456');
    cy.get('input#confirmPassword').type('newpass456');
    cy.get('button[type="submit"]').click();
    cy.wait('@updatePassword');

    cy.get('input#currentPassword').should('have.value', '');
    cy.get('input#newPassword').should('have.value', '');
    cy.get('input#confirmPassword').should('have.value', '');
  });
});