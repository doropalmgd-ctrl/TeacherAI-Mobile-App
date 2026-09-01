import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const menuItems = [
    {
      id: '1',
      title: 'إنشاء درس',
      icon: 'book-open-variant',
      color: '#3498db',
      screen: 'CreateLesson',
    },
    {
      id: '2',
      title: 'إنشاء اختبار',
      icon: 'checkbox-marked-circle-outline',
      color: '#e74c3c',
      screen: 'CreateExam',
    },
    {
      id: '3',
      title: 'إنشاء صور',
      icon: 'image-plus',
      color: '#f39c12',
      screen: 'CreateImages',
    },
    {
      id: '4',
      title: 'إدارة الفيديوهات',
      icon: 'video-plus',
      color: '#9b59b6',
      screen: 'ManageVideos',
    },
  ];

  const recentItems = [
    { id: '1', title: 'الدرس الأول - الرياضيات', date: 'اليوم' },
    { id: '2', title: 'اختبار الفصل الأول', date: 'أمس' },
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.menuCard, { borderLeftColor: item.color }]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Icon name={item.icon} size={28} color="#fff" />
      </View>
      <Text style={styles.menuTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>مرحباً بك</Text>
          <Text style={styles.userName}>{user?.fullName || 'المعلم'}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="account-circle" size={40} color="#3498db" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الإجراءات السريعة</Text>
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.grid}
          scrollEnabled={false}
        />
      </View>

      {/* AI Assistant Card */}
      <View style={styles.assistantCard}>
        <View style={styles.assistantHeader}>
          <Text style={styles.assistantTitle}>🤖 كروبوت المساعد</Text>
          <Text style={styles.assistantSubtitle}>مساعدك الذكي</Text>
        </View>
        <Text style={styles.assistantText}>
          أنا هنا لمساعدتك في إنشاء الدروس والاختبارات والمحتوى التعليمي
        </Text>
        <TouchableOpacity
          style={styles.assistantButton}
          onPress={() => navigation.navigate('KaroBot')}
        >
          <Text style={styles.assistantButtonText}>دردش معي</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>العناصر الأخيرة</Text>
        {recentItems.map((item) => (
          <View key={item.id} style={styles.recentItem}>
            <View>
              <Text style={styles.recentTitle}>{item.title}</Text>
              <Text style={styles.recentDate}>{item.date}</Text>
            </View>
            <Icon name="chevron-left" size={24} color="#bdc3c7" />
          </View>
        ))}
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  greeting: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 4,
  },
  profileButton: {
    padding: 8,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  grid: {
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  assistantCard: {
    marginHorizontal: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#9b59b6',
  },
  assistantHeader: {
    marginBottom: 12,
  },
  assistantTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  assistantSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  assistantText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 22,
    marginBottom: 16,
  },
  assistantButton: {
    backgroundColor: '#9b59b6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  assistantButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  recentDate: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
  },
});

export default HomeScreen;