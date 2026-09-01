import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const KaroBotScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      text: 'مرحباً! أنا كروبوت، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'هذا رد تلقائي. سيتم تطوير الردود الذكية في المرحلة القادمة.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1000);
  };

  const renderMessage = ({ item }) => {
    const isBot = item.type === 'bot';
    return (
      <View style={[styles.messageContainer, isBot && styles.botContainer]}>
        {isBot && <Icon name="robot" size={20} color="#9b59b6" style={styles.botIcon} />}
        <View style={[styles.messageBubble, isBot && styles.botBubble]}>
          <Text style={[styles.messageText, isBot && styles.botText]}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤖 كروبوت المساعد</Text>
        <Text style={styles.headerSubtitle}>مساعدك الذكي في كل خطوة</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#9b59b6" size="small" />
          <Text style={styles.loadingText}>جاري الكتابة...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="اكتب رسالتك..."
          placeholderTextColor="#bdc3c7"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || loading) && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || loading}
        >
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 8,
  },
  botContainer: {
    justifyContent: 'flex-start',
  },
  botIcon: {
    marginHorizontal: 8,
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    backgroundColor: '#3498db',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  botBubble: {
    backgroundColor: '#e8f0ff',
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
  },
  botText: {
    color: '#2c3e50',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#7f8c8d',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 14,
    color: '#2c3e50',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9b59b6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default KaroBotScreen;