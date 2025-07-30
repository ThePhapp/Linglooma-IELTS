describe('Kiểm thử giao diện trang đăng nhập', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4028/login');
  });

  it('Hiển thị đầy đủ các thành phần giao diện', () => {
    cy.contains('Linglooma').should('exist'); // Tiêu đề
    cy.get('input[placeholder="Email address"]').should('exist'); // Ô email
    cy.get('input[placeholder="Password"]').should('exist'); // Ô password
    cy.contains('Login').should('exist'); // Nút đăng nhập
    cy.contains('Go to home page').should('exist'); // Link về trang chủ
    cy.contains('Do you have an account ?').should('exist'); // Link sang đăng ký
    cy.contains('Forgot password ?').should('exist'); // Dòng quên mật khẩu
    cy.get('img[alt=""]').should('exist'); // Icon Google
    cy.get('img[alt="google-icon"]').should('exist'); // Icon Facebook
  });

  it('Chuyển đổi hiển thị mật khẩu khi nhấn vào biểu tượng con mắt', () => {
    cy.get('input[placeholder="Password"]').type('test123456');

    // Trước khi click, mật khẩu đang ẩn
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'password');

    // Tìm icon con mắt kế bên input (có class .cursor-pointer và là phần tử cuối trong input wrapper)
    cy.get('input[placeholder="Password"]')
      .parent()
      .find('.cursor-pointer')
      .click();

    // Sau khi click, mật khẩu hiển thị
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'text');
  });


  it('Thông báo lỗi khi email không hợp lệ', () => {
    cy.get('input[placeholder="Email address"]').type('khonghople');
    cy.get('input[placeholder="Password"]').type('matkhau');
    cy.contains('Login').click();
    cy.contains('Invalid email address').should('exist');
  });

  it('Thông báo lỗi khi không nhập mật khẩu', () => {
    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.contains('Login').click();
    cy.contains('Invalid password').should('exist');
  });

  it('Thông báo lỗi khi cả email và mật khẩu đều không được nhập', () => {
    // Không nhập gì cả
    cy.contains('Login').click();
    cy.contains('Invalid email address').should('exist');
  });

  it('Giả lập đăng nhập thành công và điều hướng sang trang admin', () => {
    cy.intercept('POST', '**/api/login', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'test@example.com',
          name: 'Test User',
          phone: '123456789',
          gender: 'male',
          nationality: 'Vietnamese',
        },
      },
    }).as('loginSuccess');

    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('12345678');
    cy.contains('Login').click();

    cy.wait('@loginSuccess');
    cy.location('pathname').should('eq', '/admin/dashboard');
  });


  it('Giả lập đăng nhập thất bại và vẫn ở lại trang login', () => {
    cy.intercept('POST', '**/api/login', {
      statusCode: 401,
      body: { success: false },
    }).as('loginFailed');

    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('saimatkhau');
    cy.contains('Login').click();

    cy.wait('@loginFailed');
    cy.location('pathname').should('eq', '/login');
  });

  it('Chuyển hướng đến trang đăng ký khi nhấn vào dòng "Do you have an account?"', () => {
    cy.contains('Do you have an account ?').click();
    cy.location('pathname').should('eq', '/register');
  });

  it('Chuyển hướng về trang chủ khi nhấn vào dòng "Go to home page"', () => {
    cy.contains('Go to home page').click();
    cy.location('pathname').should('eq', '/');
  });

  it('Không cho phép nhấn nút Login nhiều lần liên tục khi chưa nhập thông tin', () => {
    cy.contains('Login').click().click().click(); // nhấn liên tục
    cy.contains('Invalid email address').should('exist');
  });

  it('Cho phép nhập lại nếu nhập sai email', () => {
    cy.intercept('POST', '**/api/login', (req) => {
      const { email } = req.body;

      if (email === 'saiemail') {
        req.reply({
          statusCode: 400,
          body: { success: false, msg: 'Invalid email' },
        });
      } else if (email === 'dung@example.com') {
        req.reply({
          statusCode: 200,
          body: {
            success: true,
            user: {
              email: 'dung@example.com',
              name: 'Dung',
              phone: '0123456789',
              gender: 'male',
              nationality: 'Vietnamese'
            }
          }
        });
      }
    }).as('login');

    // Nhập sai email lần đầu
    cy.get('input[placeholder="Email address"]').type('saiemail');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.contains('Login').click();
    //cy.wait('@login'); // chờ request đầu

    // Nhập lại email đúng
    cy.get('input[placeholder="Email address"]').clear().type('dung@example.com');
    cy.contains('Login').click();
    cy.wait('@login'); // chờ request thứ hai

    // Kiểm tra chuyển trang thành công
    cy.location('pathname').should('eq', '/admin/dashboard');
  });


  it('Cho phép nhấn Enter để gửi form', () => {
    // intercept phải đặt trước khi hành động gửi request xảy ra
    cy.intercept('POST', '**/api/login', {
      statusCode: 200,
      body: { success: true,
              user: {
                    email: 'dung@example.com',
                    name: 'Dung',
                    phone: '0123456789',
                    gender: 'male',
                    nationality: 'Vietnamese'
              }
      },
    }).as('enterLogin');

    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('123456{enter}');

    cy.wait('@enterLogin'); // chờ request bị intercept
  });
});
