import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#4A90E2',
  background: '#F5F7FA',
  white: '#FFFFFF',
  error: '#FF6B6B',
  text: '#333333'
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3
  }
});