describe('Giao diện nút phát âm - TextToSpeechButton', () => {
  const lessonId = 1;

  beforeEach(() => {
    // Truy cập vào trang luyện tập có chứa TextToSpeechButton
    cy.visit(`http://localhost:4028/admin/features/practice/${lessonId}`);
  });

  it('Hiển thị nút phát âm với icon và tooltip', () => {
    cy.get("button[aria-label='Play text to speech']")
      .should("exist")
      .should("be.visible")
      .should("have.attr", "title", "Nghe mẫu giọng đọc")
      .within(() => {
        cy.get("svg").should("exist");
      });
  });

  it('Click nút sẽ gọi speechSynthesis.speak nếu trình duyệt hỗ trợ', () => {
    cy.window().then((win) => {
      // Stub SpeechSynthesisUtterance để không lỗi khi set voice
      win.SpeechSynthesisUtterance = function(text) {
        this.text = text;
        this.voice = null;
        this.lang = null;
      };
      // Stub phương thức speak và getVoices
      if (!win.speechSynthesis) {
        win.speechSynthesis = {};
      }
      const speakStub = cy.stub();
      win.speechSynthesis.speak = speakStub;
      win.speechSynthesis.getVoices = () => [
        { name: "Mark", lang: "en-US" },
        { name: "Google US English", lang: "en-US" },
      ];

      cy.get("button[aria-label='Play text to speech']").click();
      cy.wrap(speakStub).should("have.been.calledOnce");
    });
  });

  it('Hiển thị alert nếu trình duyệt không hỗ trợ speechSynthesis', () => {
    cy.window().then((win) => {
      delete win.speechSynthesis;
      cy.stub(win, "alert").as("alertStub");
    });

    cy.get("button[aria-label='Play text to speech']").click();
    cy.get("@alertStub").should(
      "have.been.calledWith",
      "Trình duyệt của bạn không hỗ trợ chức năng này."
    );
  });
});
