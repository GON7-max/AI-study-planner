import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { db, auth } from '../firebase/firebaseConfig';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import TaskCard from '../components/TaskCard';
import LoadingIndicator from '../components/LoadingIndicator';

export default function PlannerScreen() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState('');

  // Load tasks from Firebase
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksList);
    });

    return unsubscribe;
  }, []);

  // Validate form
  const validateForm = () => {
    let isValid = true;
    if (!title.trim()) {
      setTitleError('Task title is required');
      isValid = false;
    } else {
      setTitleError('');
    }
    return isValid;
  };

  // Create new task
  const createTask = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'tasks'), {
        title: title.trim(),
        description: description.trim(),
        completed: false,
        userId: auth.currentUser.uid,
        createdAt: new Date()
      });
      setTitle('');
      setDescription('');
      Alert.alert('Success', 'Task created successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  // Update existing task
  const updateTask = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'tasks', editingId), {
        title: title.trim(),
        description: description.trim()
      });
      setEditingId(null);
      setTitle('');
      setDescription('');
      Alert.alert('Success', 'Task updated successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      Alert.alert('Success', 'Task deleted successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Toggle task completion
  const toggleComplete = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'tasks', id), {
        completed: currentStatus
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Edit task (populate form)
  const editTask = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description || '');
    Keyboard.dismiss();
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setTitleError('');
  };

  // Render empty state
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>📚</Text>
      <Text style={styles.emptyTitle}>No Tasks Yet</Text>
      <Text style={styles.emptyText}>
        Create your first study task above!
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Form Section */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              {editingId ? 'Edit Task' : 'Create New Task'}
            </Text>

            <InputField
              label="Task Title"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title"
              required={true}
              error={titleError}
              icon="create-outline"
            />

            <InputField
              label="Description (Optional)"
              value={description}
              onChangeText={setDescription}
              placeholder="Enter task description"
              multiline={true}
              numberOfLines={3}
              icon="document-text-outline"
            />

            <View style={styles.buttonGroup}>
              <CustomButton
                title={editingId ? 'Update Task' : 'Create Task'}
                onPress={editingId ? updateTask : createTask}
                type="primary"
                size="large"
                loading={loading}
                style={styles.submitButton}
              />

              {editingId && (
                <CustomButton
                  title="Cancel Edit"
                  onPress={cancelEdit}
                  type="secondary"
                  size="medium"
                  style={styles.cancelButton}
                />
              )}
            </View>
          </View>

          {/* Tasks List Section */}
          <View style={styles.listContainer}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>
                My Tasks ({tasks.length})
              </Text>
              <Text style={styles.completedCount}>
                ✅ {tasks.filter(t => t.completed).length} completed
              </Text>
            </View>

            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskCard
                  task={item}
                  onEdit={editTask}
                  onDelete={deleteTask}
                  onToggleComplete={toggleComplete}
                  showActions={true}
                />
              )}
              ListEmptyComponent={renderEmptyList}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  inner: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    elevation: 2,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  buttonGroup: {
    marginTop: 10,
  },
  submitButton: {
    marginBottom: 10,
  },
  cancelButton: {
    marginBottom: 5,
  },
  listContainer: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  completedCount: {
    fontSize: 14,
    color: '#4A90E2',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});