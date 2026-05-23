import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import AppNavigator from './navigation/AppNavigator';
import LoadingIndicator from './components/LoadingIndicator';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <LoadingIndicator />;
  return (
    <NavigationContainer>
      <AppNavigator user={user} />
    </NavigationContainer>
  );
}