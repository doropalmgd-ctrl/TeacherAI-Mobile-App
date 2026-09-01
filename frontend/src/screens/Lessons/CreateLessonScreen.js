import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateLessonScreen = () => {
  const [lessonData, setLessonData] = useState({
    title: '',
    subject: '',
    grade: '',
    duration: '',
    objectives: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  const handleCreateLesson = async () => {
    setLoading(true);
    // TODO: Send to AI service
    setTimeout(() => {
      alert('تم إنشاء الدرس بنجاح');
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Icon name="book-open-variant" size={32} color="#3498db" />
        <Text style={styles.headerTitle}>إنشاء درس جديد</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>عنوان الدرس *</Text>
          <TextInput
            style={styles.input}
            placeholder="أدخل عنوان الدرس"
            value={lessonData.title}
            onChangeText={(text) => setLessonData({ ...lessonData, title: text })}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>المادة *</Text>
          <TextInput
            style={styles.input}
            placeholder="مثال: الرياضيات، العلوم"
            value={lessonData.subject}
            onChangeText={(text) => setLessonData({ ...lessonData, subject: text })}
            editable={!loading}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, styles.flex]}>
            <Text style={styles.label}>المرحلة *</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: الأول ابتدائي"
              value={lessonData.grade}
              onChangeText={(text) => setLessonData({ ...lessonData, grade: text })}
              editable={!loading}
            />
          </View>
          <View style={[styles.formGroup, styles.flex]}>
            <Text style={styles.label}>المدة (دقيقة)</Text>
            <TextInput
              style={styles.input}
              placeholder="45"
              keyboardType="numeric"
              value={lessonData.duration}
              onChangeText={(text) => setLessonData({ ...lessonData, duration: text })}
              editable={!loading}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>أهداف التعلم</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="اكتب أهداف التعلم للدرس"
            multiline
            numberOfLines={4}
            value={lessonData.objectives}
            onChangeText={(text) => setLessonData({ ...lessonData, objectives: text })}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>محتوى الدرس</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="اكتب محتوى الدرس أو الملاحظات الرئيسية"
            multiline
            numberOfLines={6}
            value={lessonData.content}
            onChangeText={(text) => setLessonData({ ...lessonData, content: text })}
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCreateLesson}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Icon name="plus" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>إنشاء الدرس</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
    marginRight: 12,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
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
});

export default CreateLessonScreen;