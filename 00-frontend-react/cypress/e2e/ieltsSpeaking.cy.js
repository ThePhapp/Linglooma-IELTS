describe("Practice Page - Highlight Word", () => {
  const lessonId = 1;

  const mockLessons = [
    {
      id: 1,
      name: "Lesson 1",
    }
  ];

  const mockScoreData = {
    questions: [
      {
        id: 1,
        content: "Sample Practice Question",
        passage: "This is a sample passage for practice.",
        score: 7,
        feedback: "Good pronunciation but work on fluency.",
        accuracyScore: 80,
        fluencyScore: 75,
        completenessScore: 90,
        pronScore: 85,
        // Dữ liệu cho IncorrectPhonemesTable
        incorrectPhonemes: [
          {
            word: "this",
            accuracyScore: 40,
            errorType: "Mispronounced",
            phonemes: [
              { phoneme: "th", accuracyScore: 40, errorType: "Mispronounced" },
              { phoneme: "ɪ", accuracyScore: 80, errorType: "None" },
              { phoneme: "s", accuracyScore: 90, errorType: "None" }
            ]
          }
        ]
      }
    ]
  };

  beforeEach(() => {
    cy.intercept("GET", "/api/lessons/all", mockLessons).as("getLessons");
    cy.intercept("GET", `/api/questions/${lessonId}`, mockScoreData).as("getQuestions");
    cy.intercept("GET", "/api/users/account", { statusCode: 200, body: {} }).as("getAccount");

    // Inject scoreData vào window trước khi app mount
    cy.visit(`/admin/features/practice/${lessonId}`, {
      onBeforeLoad(win) {
        win.__mockScoreData = {
          score: 7,
          feedback: "Good pronunciation but work on fluency.",
          accuracyScore: 80,
          fluencyScore: 75,
          completenessScore: 90,
          pronScore: 85,
          incorrectPhonemes: [
            {
              word: "this",
              accuracyScore: 40,
              errorType: "Mispronounced",
              phonemes: [
                { phoneme: "th", accuracyScore: 40, errorType: "Mispronounced" },
                { phoneme: "ɪ", accuracyScore: 80, errorType: "None" },
                { phoneme: "s", accuracyScore: 90, errorType: "None" }
              ]
            }
          ]
        };
      }
    });
    cy.wait("@getLessons");
    cy.wait("@getQuestions");
  });

  it("hiển thị tiêu đề câu hỏi đúng", () => {
    cy.contains("Sample Practice Question").should("be.visible");
  });

  it("hiển thị passage cho practice", () => {
    cy.contains("Sample Practice Question").should("be.visible");
  });

  it('Nút "Exit" điều hướng chính xác về trang luyện tập', () => {
    cy.contains("Exit").click();
    cy.url().should("eq", "http://localhost:4028/admin/features/lesson");
  });

  it('Nút "Feedback" điều hướng chính xác về trang feedback', () => {
    cy.contains("Feedback").click();
    cy.url().should("eq", "http://localhost:4028/admin/features/feedback/1");
  });
});
