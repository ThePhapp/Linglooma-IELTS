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

    // Validation
    if (!audio) {
      console.error('❌ scoreAudio: Missing audio data');
      return res.status(400).json({ error: "Thiếu dữ liệu audio" });
    }
    if (!referenceText || referenceText.trim() === "") {
      console.error('❌ scoreAudio: Missing referenceText');
      return res.status(400).json({ error: "Thiếu câu mẫu (referenceText)" });
    }
    if (!questionId) {
      console.error('❌ scoreAudio: Missing questionId');
      return res.status(400).json({ error: "Thiếu questionId" });
    }
    if (index === null || index === undefined) {
      console.error('❌ scoreAudio: Missing index');
      return res.status(400).json({ error: "Thiếu curentIndex" });
    }

    console.log('🎤 scoreAudio request:', { questionId, index, referenceTextLength: referenceText.length });

    const filename = `audio_${Date.now()}.wav`;
    const filepath = path.join(__dirname, "..", "temp", filename);

    // Check if temp directory exists
    const tempDir = path.join(__dirname, "..", "temp");
    if (!fs.existsSync(tempDir)) {
      console.log('📁 Creating temp directory:', tempDir);
      fs.mkdirSync(tempDir, { recursive: true });
    }

    await saveBase64AudioToFile(audio, filepath);
    console.log('✅ Audio file saved:', filepath);

    const { assessment, transcriptText, wordsAssessment } = await assessPronunciation(filepath, referenceText);
    console.log('✅ Pronunciation assessed, transcript:', transcriptText);

    const miscueWordsFromTranscript = findMismatchedWords(referenceText, transcriptText);

    // Xóa file tạm
    fs.unlink(filepath, (err) => {
      if (err) console.error("Lỗi xóa file tạm:", err);
      else console.log('🗑️ Temp file deleted:', filepath);
    });

    const ieltsResult = calculateIELTSBand(assessment);
    const phonemeDetails = analyzePhonemes(assessment);
    const wordsAssessmentVn = vietnameseWordsAssessment(wordsAssessment);
    const errorMap = countPhonemeErrors(wordsAssessment);
    
    console.log('🧠 Getting Gemini feedback...');
    const geminiFeedback = await getGeminiFeedback({
      ieltsResult,
      assessment,
      transcriptText,
      miscueWords: miscueWordsFromTranscript,
    });
    console.log('✅ scoreAudio completed successfully, band:', ieltsResult.band);

    res.json({
      score: ieltsResult.band,
      rawScore: ieltsResult.totalScore,
      feedback: geminiFeedback || "Không có phản hồi từ Gemini",
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
    console.error("❌ Lỗi khi chấm điểm:", error);
    console.error("❌ Error stack:", error.stack);
    
    // Chi tiết hơn về loại lỗi
    if (error.message?.includes('Azure')) {
      return res.status(503).json({ 
        error: "Dịch vụ Azure Speech không khả dụng",
        details: "Vui lòng kiểm tra API key và region"
      });
    }
    
    if (error.message?.includes('Gemini')) {
      return res.status(503).json({ 
        error: "Dịch vụ Gemini AI không khả dụng",
        details: "Vui lòng kiểm tra API key"
      });
    }
    
    res.status(500).json({ 
      error: "Không nhận dạng được giọng nói",
      details: error.message
    });
  }
};
