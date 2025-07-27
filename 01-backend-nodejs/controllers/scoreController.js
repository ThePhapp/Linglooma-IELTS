const path = require("path");
const fs = require("fs");
const { saveBase64AudioToFile } = require("../utils/fileUtils");
const { assessPronunciation } = require("../services/azurePronunciationService");
const { calculateIELTSBand } = require("../services/ieltsScoringService");
const { findMismatchedWords } = require("../services/miscueService");
const { analyzePhonemes } = require("../utils/analyzePhonemes");
const { vietnameseWordsAssessment } = require("../utils/wordsAssessmentHelper");
const { countPhonemeErrors } = require('../utils/phonemeErrorCounter');
const { getGeminiFeedback } = require("../services/geminiFeedbackService");

exports.scoreAudio = async (req, res) => {
  try {
    const { audio, referenceText, questionId, index } = req.body;

    if (!audio) return res.status(400).json({ error: "Thiếu dữ liệu audio" });
    if (!referenceText || referenceText.trim() === "")
      return res.status(400).json({ error: "Thiếu câu mẫu (referenceText)" });
    if (!questionId) return res.status(400).json({ error: "Thiếu questionId" });
    if (index === null) return res.status(400).json({ error: "Thiếu curentIndex" });

    const filename = `audio_${Date.now()}.wav`;
    const filepath = path.join(__dirname, "..", "temp", filename);

    await saveBase64AudioToFile(audio, filepath);

    const { assessment, transcriptText, wordsAssessment } = await assessPronunciation(filepath, referenceText);

    const miscueWordsFromTranscript = findMismatchedWords(referenceText, transcriptText);

    // Xóa file tạm
    fs.unlink(filepath, (err) => {
      if (err) console.error("Lỗi xóa file tạm:", err);
    });

    const ieltsResult = calculateIELTSBand(assessment);
    const phonemeDetails = analyzePhonemes(assessment);
    const wordsAssessmentVn = vietnameseWordsAssessment(wordsAssessment);
    const errorMap = countPhonemeErrors(wordsAssessment);
    const geminiFeedback = await getGeminiFeedback({
  ieltsResult,
  assessment,
  transcriptText,
  miscueWords: miscueWordsFromTranscript,
});

    console.log("Gemini feedback:", geminiFeedback);
    res.json({
      score: ieltsResult.band,
      rawScore: ieltsResult.totalScore,
      feedback: ieltsResult.feedback,
      accuracyScore: assessment.AccuracyScore || null,
      fluencyScore: assessment.FluencyScore || null,
      completenessScore: assessment.CompletenessScore || null,
      pronScore: assessment.PronScore || null,
      transcript: transcriptText,
      miscueWords: miscueWordsFromTranscript,
      phonemeDetails,
      wordsAssessment: wordsAssessmentVn,
      incorrectPhonemes: wordsAssessment,
      err: errorMap,
    });
  } catch (error) {
    console.error("Lỗi khi chấm điểm:", error);
    res.status(500).json({ error: "Không nhận dạng được giọng nói" });
  }
};
