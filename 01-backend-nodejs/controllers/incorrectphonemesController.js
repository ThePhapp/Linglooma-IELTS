const {
  insertOrUpdateIncorrectPhonemes,
  getIncorrectPhonemesOfLesson,
  getTopIncorrectPhonemesWithAvgScore,
  getResultViews,
} = require("../models/incorrectphonemesModel");

const insertIncorrectPhonemeController = async (req, res) => {
  const { phoneme: errorMap, questionResultId, lessonResultId, questionId, studentId } = req.body;

  if (!errorMap || !questionResultId || !lessonResultId || !questionId || !studentId) {
    console.warn("Missing required fields in insert request");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await insertOrUpdateIncorrectPhonemes(errorMap, questionResultId, lessonResultId, questionId, studentId);
    res.status(200).json({ message: "Insert/Update incorrect phonemes successfully" });
  } catch (err) {
    console.error("Insert/Update incorrect phonemes failed:", err);
    res.status(500).json({ message: "Insert/Update incorrect phonemes failed" });
  }
};

const getIncorrectPhonemesOfLessonController = async (req, res) => {
  const { studentId, lessonResultId } = req.params;
  if (!studentId || !lessonResultId) {
    return res.status(400).json({ message: "Missing parameters studentId or lessonResultId" });
  }

  try {
    const result = await getIncorrectPhonemesOfLesson(studentId, lessonResultId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Get incorrect phonemes failed: ", err);
    res.status(500).json({ message: "Get incorrect phonemes failed" });
  }
};

const getFeedbackSummaryController = async (req, res) => {
  const { lessonResultId } = req.query;
  
  if (!lessonResultId) {
    return res.status(400).json({ message: "lessonResultId is required" });
  }

  try {
    const rows = await getTopIncorrectPhonemesWithAvgScore(lessonResultId);
    
    console.log('📊 Feedback summary rows:', rows.length);
    
    // Extract lesson info (will be in every row, or we fetch it separately)
    let lessonInfo = null;
    
    if (rows.length > 0 && rows[0].lesson_name) {
      lessonInfo = {
        lessonName: rows[0].lesson_name,
        lessonType: rows[0].lesson_type,
        finishedTime: rows[0].finishedtime,
        lessonScore: rows[0].lesson_score,
        questionCount: rows[0].question_count
      };
      console.log('Lesson info from rows:', lessonInfo);
    } else {
      // Return demo data if no real data exists
      console.log('⚠️ No data found, returning demo data');
      
      const demoLessonInfo = {
        lessonName: "Technology and Innovation",
        lessonType: "Speaking Practice",
        finishedTime: new Date().toISOString(),
        lessonScore: 6.5,
        questionCount: 6
      };

      const demoQuestions = [
        {
          questionId: 1,
          averageScores: {
            ieltsBand: 6.5,
            accuracy: 85,
            fluency: 80,
            completeness: 90,
            pronunciation: 75
          },
          feedback: "Good pronunciation overall. Pay attention to stress patterns in longer words.",
          topIncorrectPhonemes: [
            { phoneme: "/θ/", count: 3 },
            { phoneme: "/ð/", count: 2 },
            { phoneme: "/v/", count: 1 }
          ]
        },
        {
          questionId: 2,
          averageScores: {
            ieltsBand: 7.0,
            accuracy: 90,
            fluency: 85,
            completeness: 88,
            pronunciation: 82
          },
          feedback: "Excellent fluency! Work on the 'th' sounds for better clarity.",
          topIncorrectPhonemes: [
            { phoneme: "/ʃ/", count: 2 },
            { phoneme: "/r/", count: 1 }
          ]
        },
        {
          questionId: 3,
          averageScores: {
            ieltsBand: 6.0,
            accuracy: 78,
            fluency: 75,
            completeness: 80,
            pronunciation: 70
          },
          feedback: "Try to maintain consistent pacing. Practice word stress in multi-syllable words.",
          topIncorrectPhonemes: [
            { phoneme: "/æ/", count: 4 },
            { phoneme: "/ɜː/", count: 2 },
            { phoneme: "/ŋ/", count: 1 }
          ]
        },
        {
          questionId: 4,
          averageScores: {
            ieltsBand: 6.5,
            accuracy: 82,
            fluency: 78,
            completeness: 85,
            pronunciation: 77
          },
          feedback: "Good content delivery. Focus on intonation patterns for questions vs statements.",
          topIncorrectPhonemes: [
            { phoneme: "/w/", count: 2 },
            { phoneme: "/j/", count: 1 }
          ]
        },
        {
          questionId: 5,
          averageScores: {
            ieltsBand: 7.5,
            accuracy: 92,
            fluency: 88,
            completeness: 95,
            pronunciation: 85
          },
          feedback: "Excellent performance! Very natural and confident delivery.",
          topIncorrectPhonemes: [
            { phoneme: "/l/", count: 1 }
          ]
        },
        {
          questionId: 6,
          averageScores: {
            ieltsBand: 6.0,
            accuracy: 75,
            fluency: 72,
            completeness: 78,
            pronunciation: 73
          },
          feedback: "Good effort. Practice connected speech and linking sounds between words.",
          topIncorrectPhonemes: [
            { phoneme: "/ð/", count: 3 },
            { phoneme: "/θ/", count: 2 },
            { phoneme: "/z/", count: 1 }
          ]
        }
      ];

      return res.json({
        lessonInfo: demoLessonInfo,
        questions: demoQuestions,
        isDemo: true
      });
    }

    const feedbackSummary = {};
    rows.forEach(
      ({
        questionid,
        phoneme,
        total_incorrect,
        ieltsband,
        accuracy,
        fluency,
        completeness,
        pronunciation,
        avg_feedback,
      }) => {
        if (!feedbackSummary[questionid]) {
          feedbackSummary[questionid] = {
            questionId: questionid,
            averageScores: {
              ieltsBand: ieltsband || null,
              accuracy: accuracy || null,
              fluency: fluency || null,
              completeness: completeness || null,
              pronunciation: pronunciation || null,
            },
            feedback: avg_feedback || "",
            topIncorrectPhonemes: [],
          };
        }
        feedbackSummary[questionid].topIncorrectPhonemes.push({
          phoneme,
          count: total_incorrect,
        });
      }
    );

    const response = {
      lessonInfo,
      questions: Object.values(feedbackSummary),
      isDemo: false
    };
    
    console.log('📤 Sending response with', response.questions.length, 'questions');
    res.json(response);
  } catch (err) {
    console.error("❌ Failed to get feedback summary:", err);
    res.status(500).json({ message: "Failed to get feedback summary" });
  }
};

const getLessonsSummaryController = async (req, res) => {
  try {
    const data = await getResultViews();

    // Format latestFinishedTime thành ISO string nếu có
    const formattedData = data.map(item => ({
      lessonId: item.lessonId,
      lessonName: item.lessonName,
      latestFinishedTime: item.latestFinishedTime ? item.latestFinishedTime.toISOString() : null,
      averageScore: item.averageScore,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching lessons summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  insertIncorrectPhonemeController,
  getIncorrectPhonemesOfLessonController,
  getFeedbackSummaryController,
  getLessonsSummaryController,
};
