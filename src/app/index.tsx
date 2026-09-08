import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.page}>
            <View style={styles.brandBlock}>
              <View style={styles.logoShadow}>
                <View style={styles.logo}>
                  <SymbolView
                    name={{ ios: 'shield.fill', android: 'shield', web: 'shield' }}
                    size={43}
                    tintColor="#FFFFFF"
                  />
                </View>
              </View>
              <Text style={styles.overline}>OFFICIAL TESTING PORTAL</Text>
              <Text style={styles.title}>Field Drug Testing</Text>
              <Text style={styles.subtitle}>Secure Digital Testing Platform</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeading}>
                <Text style={styles.cardTitle}>Sign in to your account</Text>
                <Text style={styles.cardDescription}>
                  Enter your credentials to access active field tests.
                </Text>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email or Officer ID</Text>
                <View style={styles.inputShell}>
                  <SymbolView
                    name={{
                      ios: 'person.crop.circle.fill',
                      android: 'account_circle',
                      web: 'account_circle',
                    }}
                    size={21}
                    tintColor="#64748B"
                  />
                  <TextInput
                    accessibilityLabel="Email or Officer ID"
                    autoCapitalize="none"
                    autoComplete="username"
                    keyboardType="email-address"
                    placeholder="name@agency.gov"
                    placeholderTextColor="#94A3B8"
                    returnKeyType="next"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputShell}>
                  <SymbolView
                    name={{ ios: 'lock.fill', android: 'lock', web: 'lock' }}
                    size={21}
                    tintColor="#64748B"
                  />
                  <TextInput
                    accessibilityLabel="Password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                  />
                  <Pressable
                    accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                    accessibilityRole="button"
                    hitSlop={10}
                    onPress={() => setPasswordVisible((current) => !current)}
                    style={({ pressed }) => [styles.eyeButton, pressed && styles.pressed]}>
                    <SymbolView
                      name={
                        passwordVisible
                          ? { ios: 'eye.slash.fill', android: 'visibility_off', web: 'visibility_off' }
                          : { ios: 'eye.fill', android: 'visibility', web: 'visibility' }
                      }
                      size={22}
                      tintColor="#526579"
                    />
                  </Pressable>
                </View>
              </View>

              <View style={styles.optionsRow}>
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: rememberMe }}
                  onPress={() => setRememberMe((current) => !current)}
                  style={({ pressed }) => [styles.rememberOption, pressed && styles.pressed]}>
                  <View style={[styles.checkbox, rememberMe && styles.checkboxSelected]}>
                    {rememberMe && (
                      <SymbolView
                        name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                        size={15}
                        tintColor="#FFFFFF"
                      />
                    )}
                  </View>
                  <Text style={styles.rememberText}>Remember me</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="link"
                  onPress={Keyboard.dismiss}
                  style={({ pressed }) => pressed && styles.pressed}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </Pressable>
              </View>

              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  if (!username.trim() || !password.trim()) return;
                  Keyboard.dismiss();
                  router.replace('/home');
                }}
                style={({ pressed }) => [styles.loginButton, pressed && styles.loginButtonPressed]}>
                <Text style={styles.loginButtonText}>Login</Text>
                <SymbolView
                  name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
                  size={21}
                  tintColor="#FFFFFF"
                />
              </Pressable>

              <View style={styles.secureNotice}>
                <SymbolView
                  name={{ ios: 'lock.fill', android: 'lock', web: 'lock' }}
                  size={17}
                  tintColor="#3B6C57"
                />
                <Text style={styles.secureText}>Protected access for authorized personnel</Text>
              </View>
            </View>

            <Text style={styles.footer}>FIELD OPERATIONS SYSTEM  •  SECURE ACCESS</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF2F5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  page: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoShadow: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#D7E5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#173B50',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  overline: {
    color: '#4B6474',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  title: {
    color: '#102E42',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.7,
    textAlign: 'center',
  },
  subtitle: {
    color: '#637787',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 430,
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5EA',
    shadowColor: '#1B3342',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 4,
  },
  cardHeading: {
    marginBottom: 24,
  },
  cardTitle: {
    color: '#18384B',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  cardDescription: {
    color: '#6B7F8E',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#314D5E',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputShell: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#CBD6DD',
    borderRadius: 14,
    backgroundColor: '#F9FBFC',
    paddingLeft: 15,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#18384B',
    fontSize: 15,
    paddingVertical: 0,
  },
  eyeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
    minHeight: 32,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 2,
    marginBottom: 23,
  },
  rememberOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#98AAB5',
    backgroundColor: '#FFFFFF',
  },
  checkboxSelected: {
    borderColor: '#1E5A70',
    backgroundColor: '#1E5A70',
  },
  rememberText: {
    color: '#516978',
    fontSize: 13,
    fontWeight: '500',
  },
  forgotPassword: {
    color: '#1E5A70',
    fontSize: 13,
    fontWeight: '700',
  },
  loginButton: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 15,
    backgroundColor: '#1D556B',
    shadowColor: '#12394A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.17,
    shadowRadius: 10,
    elevation: 3,
  },
  loginButtonPressed: {
    backgroundColor: '#164759',
    transform: [{ scale: 0.99 }],
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  secureNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 20,
  },
  secureText: {
    color: '#5C7367',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    color: '#7A8C97',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.9,
    marginTop: 23,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
