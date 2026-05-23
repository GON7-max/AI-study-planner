import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error = null,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'none',
  required = false,
  icon = null, // icon prop kept for compatibility but not used
  style = {}
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Get icon emoji if icon name is provided
  const getIconEmoji = () => {
    if (!icon) return null;
    if (icon.includes('mail')) return '📧';
    if (icon.includes('lock')) return '🔒';
    if (icon.includes('create')) return '✏️';
    if (icon.includes('document')) return '📄';
    return '📌';
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && (
          <View style={styles.iconContainer}>
            <Text style={styles.iconEmoji}>{getIconEmoji()}</Text>
          </View>
        )}
        
        <TextInput
          style={[
            styles.input,
            multiline && styles.multiline,
            icon && styles.inputWithIcon
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={togglePasswordVisibility}
          >
            <Text style={styles.eyeEmoji}>
              {isPasswordVisible ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#FF6B6B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
  iconEmoji: {
    fontSize: 18,
  },
  eyeButton: {
    padding: 8,
  },
  eyeEmoji: {
    fontSize: 18,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});