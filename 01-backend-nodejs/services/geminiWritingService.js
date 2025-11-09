const fetch = require("node-fetch");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Chấm bài Writing IELTS bằng AI Gemini
 * @param {Object} params
 * @param {string} params.taskType - Task 1 hoặc Task 2
 * @param {string} params.promptText - Đề bài
 * @param {string} params.essayText - Bài viết của học sinh
 * @param {number} params.wordCount - Số từ trong bài viết
 * @returns {Promise<Object>} Kết quả chấm bài
 */
async function evaluateWritingWithGemini({ taskType, promptText, essayText, wordCount }) {
  const minWords = taskType === 'Task 1' ? 150 : 250;
  
  const prompt = `
You are an experienced IELTS examiner specializing in Writing assessment. You need to evaluate the following IELTS ${taskType} essay according to official IELTS Writing band descriptors.

**Essay Prompt:**
${promptText}

**Student's Essay (${wordCount} words):**
${essayText}

**Your task:**
Evaluate this essay using the four IELTS Writing criteria and provide detailed feedback in JSON format.

Return ONLY a valid JSON object (no markdown, no explanations outside JSON) with this exact structure:

{
  "scores": {
    "task_achievement": <float 0-9>,
    "coherence_cohesion": <float 0-9>,
    "lexical_resource": <float 0-9>,
    "grammar_accuracy": <float 0-9>,
    "overall_band": <float 0-9>
  },
  "overall_feedback": "<2-3 sentences summarizing the essay quality>",
  "strengths": "<bullet points of what the student did well>",
  "weaknesses": "<bullet points of areas needing improvement>",
  "grammar_errors": [
    {
      "error": "<incorrect sentence or phrase>",
      "correction": "<corrected version>",
      "explanation": "<why it's wrong and how to fix it>"
    }
  ],
  "vocabulary_suggestions": [
    {
      "word": "<basic/repetitive word used>",
      "suggestion": "<better alternative>",
      "context": "<example sentence using the suggestion>"
    }
  ],
  "structure_feedback": "<feedback on essay organization, paragraphing, introduction, conclusion>",
  "improvement_tips": "<3-5 specific actionable tips to improve writing>"
}

**Evaluation Guidelines:**
1. Task Achievement (Task 1) / Task Response (Task 2): Does the essay address all parts of the task? Is the response clear and well-developed?
2. Coherence and Cohesion: Is the essay logically organized? Are ideas connected smoothly?
3. Lexical Resource: Range and accuracy of vocabulary. Avoid repetition.
4. Grammatical Range and Accuracy: Variety of sentence structures, accuracy of grammar.

**Note:** 
- If word count is less than ${minWords}, deduct points from Task Achievement/Response.
- Be constructive but honest in feedback.
- Identify specific errors with clear corrections.
- Overall band should be the average of the four criteria, rounded to nearest 0.5.
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,  // Lower temperature for more consistent scoring
            topK: 40,
            topP: 0.95,
          }
        }),
      }
    );

    const data = await res.json();
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error("No response from Gemini API");
    }

    // Extract JSON from response (remove markdown code blocks if present)
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const evaluation = JSON.parse(jsonText);
    
    // Validate response structure
    if (!evaluation.scores || !evaluation.overall_feedback) {
      throw new Error("Invalid response structure from Gemini");
    }

    return evaluation;
    
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API cho Writing evaluation:", error);
    
    // Return fallback response
    return {
      scores: {
        task_achievement: 5.0,
        coherence_cohesion: 5.0,
        lexical_resource: 5.0,
        grammar_accuracy: 5.0,
        overall_band: 5.0
      },
      overall_feedback: "Unable to evaluate essay at this time. Please try again.",
      strengths: "N/A",
      weaknesses: "N/A",
      grammar_errors: [],
      vocabulary_suggestions: [],
      structure_feedback: "Evaluation unavailable",
      improvement_tips: "Please try submitting again.",
      error: error.message
    };
  }
}

module.exports = {
  evaluateWritingWithGemini,
};
