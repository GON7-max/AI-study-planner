import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

export default function CustomButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  type = 'primary', // 'primary', 'secondary', 'danger'
  size = 'medium', // 'small', 'medium', 'large'
  style = {},
  textStyle = {}
}) {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    
    // Type styles
    if (type === 'primary') buttonStyle.push(styles.primary);
    else if (type === 'secondary') buttonStyle.push(styles.secondary);
    else if (type === 'danger') buttonStyle.push(styles.danger);
    
    // Size styles
    if (size === 'small') buttonStyle.push(styles.small);
    else if (size === 'large') buttonStyle.push(styles.large);
    
    // Disabled style
    if (disabled || loading) buttonStyle.push(styles.disabled);
    
    buttonStyle.push(style);
    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleObj = [styles.text];
    
    if (type === 'secondary') textStyleObj.push(styles.secondaryText);
    if (size === 'small') textStyleObj.push(styles.smallText);
    if (size === 'large') textStyleObj.push(styles.largeText);
    
    textStyleObj.push(textStyle);
    return textStyleObj;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  // Types
  primary: {
    backgroundColor: '#4A90E2',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#4A90E2',
  },
  danger: {
    backgroundColor: '#FF6B6B',
  },
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 80,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 160,
  },
  // Text
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryText: {
    color: '#4A90E2',
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  // Disabled
  disabled: {
    opacity: 0.5,
  },
});