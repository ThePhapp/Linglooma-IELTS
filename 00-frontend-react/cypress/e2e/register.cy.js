// cypress/e2e/register.cy.js

describe('Giao diện trang Đăng Ký', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4028/register');
  });

  it('Hiển thị đầy đủ các thành phần giao diện cơ bản', () => {
    cy.contains('Linglooma');
    cy.get('input[placeholder="Email address"]');
    cy.get('input[placeholder="Password"]');
    cy.get('input[placeholder="Confirm Password"]');
    cy.contains('Create new account');
    cy.contains('Go to home page');
  });

  it('Hiển thị lỗi khi các trường bị để trống', () => {
    cy.contains('Create new account').click();
    cy.contains('Please fill in all fields');
  });

  it('Hiển thị lỗi khi định dạng email không hợp lệ', () => {
    cy.get('input[placeholder="Email address"]').type('sai-email');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.get('input[placeholder="Confirm Password"]').type('123456');
    cy.contains('Create new account').click();
    cy.contains('Invlid email address');
  });

  it('Hiển thị lỗi khi mật khẩu không khớp nhau', () => {
    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.get('input[placeholder="Confirm Password"]').type('654321');
    cy.contains('Create new account').click();
    cy.contains('Passwords do not match');
  });

  it('Đăng ký thành công và điều hướng đến trang đăng nhập', () => {
    cy.intercept('POST', '**/api/register', {
      statusCode: 200,
      body: { success: true }
    }).as('registerRequest');

    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.get('input[placeholder="Confirm Password"]').type('123456');
    cy.contains('Create new account').click();

    cy.wait('@registerRequest');
    cy.contains('Create new user success');
  });

  it('Hiển thị lỗi khi backend trả về lỗi (ví dụ đã có email)', () => {
    cy.intercept('POST', '**/api/register', {
      statusCode: 400,
      body: { msg: '' } // không có message cụ thể
    }).as('registerFail');

    cy.get('input[placeholder="Email address"]').type('existing@example.com');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.get('input[placeholder="Confirm Password"]').type('123456');
    cy.contains('Create new account').click();

    cy.wait('@registerFail');
    cy.contains('Register failed');
  });

  it('Chuyển về trang chủ khi click vào "Go to home page"', () => {
    cy.contains('Go to home page').click();
    cy.url().should('eq', 'http://localhost:4028/');
  });

  it('Có thể bật/tắt hiện mật khẩu và xác nhận mật khẩu', () => {
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'password');
    cy.get('input[placeholder="Password"] + svg').click();
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'text');

    cy.get('input[placeholder="Confirm Password"]').should('have.attr', 'type', 'password');
    cy.get('input[placeholder="Confirm Password"] + svg').click();
    cy.get('input[placeholder="Confirm Password"]').should('have.attr', 'type', 'text');
  });

  it('Cho phép nhấn Enter để gửi form', () => {
    cy.intercept('POST', '**/api/register', {
      statusCode: 200,
      body: { success: true },
    }).as('enterRegister');

    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('123456{enter}');
    cy.get('input[placeholder="Confirm Password"]').type('123456{enter}');
    cy.wait('@enterRegister');
    cy.url().should('eq', 'http://localhost:4028/login');
  });
});
