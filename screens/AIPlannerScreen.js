import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';

export default function AIPlannerScreen() {
  const [topic, setTopic] = useState('');
  const [hours, setHours] = useState('');
  const [aiPlan, setAiPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!topic.trim() || !hours) {
      Alert.alert('Error', 'Please enter both topic and hours');
      return;
    }
    setLoading(true);
    // Mock AI response (replace with actual OpenAI API call if desired)
    setTimeout(() => {
      const plan = `📚 Study Plan for "${topic}" (${hours} hours):
      
• Hour 1: Introduction & overview
• Hour 2: Core concepts deep dive
• Hour 3: Practice exercises
• Hour 4: Review & self-assessment

✅ Break every 50 minutes for 10 minutes.`;
      setAiPlan(plan);
      setLoading(false);
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>✨ AI Study Planner</Text>
      <Text style={styles.subtitle}>Let AI create your personalized study schedule</Text>

      <TextInput
        style={styles.input}
        placeholder="What do you want to study? (e.g., Calculus)"
        value={topic}
        onChangeText={setTopic}
      />
      <TextInput
        style={styles.input}
        placeholder="Total hours available"
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={generatePlan} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Generating...' : 'Generate AI Plan'}</Text>
      </TouchableOpacity>

      {aiPlan ? (
        <View style={styles.planCard}>
          <Text style={styles.planText}>{aiPlan}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4A90E2', textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  planCard: { backgroundColor: '#E8F0FE', padding: 20, borderRadius: 10, marginTop: 20, marginBottom: 30 },
  planText: { fontSize: 14, lineHeight: 22, color: '#333' }
});