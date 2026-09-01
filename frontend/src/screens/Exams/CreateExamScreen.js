import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../services/api';

const CreateExamScreen = () => {
  const [examData, setExamData] = useState({
    title: '',
    subject: '',
    topic: '',
    level: 'متوسط',
    questionCount: '5',
    questionType: 'multiple',
  });
  const [loading, setLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);

  const handleGenerateExam = async () => {
    if (!examData.topic) {
      alert('الرجاء إدخال موضوع الاختبار');
      return;
    }

    setLoading(true);
    try {
      const response = await API.post('/ai/generate-exam-questions', {
        topic: examData.topic,
        level: examData.level,
        count: parseInt(examData.questionCount),
        question_type: examData.questionType,
      });

      setGeneratedQuestions(response.data);
      alert('تم إنشاء الاختبار بنجاح!');
    } catch (error) {
      alert('خطأ في إنشاء الاختبار');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExam = async () => {
    try {
      // Save exam to backend
      alert('تم حفظ الاختبار بنجاح!');
    } catch (error) {
      alert('خطأ في حفظ الاختبار');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Icon name="checkbox-marked-circle-outline" size={32} color="#e74c3c" />
        <Text style={styles.headerTitle}>إنشاء اختبار</Text>
      </View>

      {!generatedQuestions ? (
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>عنوان الاختبار</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: اختبار الفصل الأول"
              value={examData.title}
              onChangeText={(text) => setExamData({ ...examData, title: text })}
              editable={!loading}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>الموضوع *</Text>
            <TextInput
              style={styles.input}
              placeholder="أدخل موضوع الاختبار"
              value={examData.topic}
              onChangeText={(text) => setExamData({ ...examData, topic: text })}
              editable={!loading}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>مستوى الصعوبة</Text>
            <View style={styles.levelButtons}>
              {['سهل', 'متوسط', 'صعب'].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.levelButton,
                    examData.level === level && styles.levelButtonActive,
                  ]}
                  onPress={() => setExamData({ ...examData, level })}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.levelButtonText,
                      examData.level === level && styles.levelButtonTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>عدد الأسئلة</Text>
            <TextInput
              style={styles.input}
              placeholder="5"
              keyboardType="numeric"
              value={examData.questionCount}
              onChangeText={(text) => setExamData({ ...examData, questionCount: text })}
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleGenerateExam}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon name="wand" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>توليد الاختبار بـ AI</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.questionsContainer}>
          <View style={styles.successMessage}>
            <Icon name="check-circle" size={32} color="#27ae60" />
            <Text style={styles.successText}>تم إنشاء الاختبار بنجاح!</Text>
          </View>

          {generatedQuestions.questions &&
            generatedQuestions.questions.map((question, index) => (
              <View key={index} style={styles.questionCard}>
                <Text style={styles.questionNumber}>السؤال {index + 1}</Text>
                <Text style={styles.questionText}>{question.question}</Text>

                {question.options && (
                  <View style={styles.optionsContainer}>
                    {question.options.map((option, optIndex) => (
                      <View key={optIndex} style={styles.option}>
                        <Text style={styles.optionText}>{String.fromCharCode(65 + optIndex)}) {option}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.answerSection}>
                  <Text style={styles.correctAnswer}>
                    الإجابة الصحيحة: {question.correct_answer}
                  </Text>
                  {question.explanation && (
                    <Text style={styles.explanation}>{question.explanation}</Text>
                  )}
                </View>
              </View>
            ))}

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveExam}>
            <Icon name="content-save" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>حفظ الاختبار</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setGeneratedQuestions(null)}
          >
            <Text style={styles.resetButtonText}>إنشاء اختبار جديد</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 12,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#2c3e50',
  },
  levelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  levelButtonActive: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
  },
  levelButtonText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  levelButtonTextActive: {
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  questionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  successMessage: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  successText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27ae60',
    marginTop: 8,
  },
  questionCard: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 12,
    lineHeight: 20,
  },
  optionsContainer: {
    marginVertical: 12,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 13,
    color: '#2c3e50',
  },
  answerSection: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 3,
    borderLeftColor: '#27ae60',
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  correctAnswer: {
    fontSize: 13,
    fontWeight: '600',
    color: '#27ae60',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 12,
    color: '#558b2f',
    lineHeight: 18,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#27ae60',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  resetButtonText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CreateExamScreen;