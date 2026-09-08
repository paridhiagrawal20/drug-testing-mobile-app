import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FieldTestingNav } from './FieldTestingNav';

type FieldTestingPageProps = {
  title: string;
  subtitle: string;
  icon: SymbolViewProps['name'];
  children: ReactNode;
};

export function FieldTestingPage({ title, subtitle, icon, children }: FieldTestingPageProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.topBar}>
              <Pressable
                accessibilityLabel="Go to Home"
                accessibilityRole="button"
                onPress={() => router.replace('/home')}
                style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
                <SymbolView
                  name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
                  size={21}
                  tintColor="#1D556B"
                />
              </Pressable>
              <Text style={styles.brandName}>Field Drug Testing</Text>
              <View style={styles.topBarSpacer} />
            </View>
            <View style={styles.pageHeading}>
              <View style={styles.pageIcon}>
                <SymbolView name={icon} size={23} tintColor="#1D6877" />
              </View>
              <View style={styles.pageHeadingText}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
              </View>
            </View>
            {children}
          </View>
        </ScrollView>
        <FieldTestingNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6F7',
  },
  screen: {
    flex: 1,
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  backButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#E0ECEE',
  },
  brandName: {
    color: '#18384B',
    fontSize: 16,
    fontWeight: '800',
  },
  topBarSpacer: {
    width: 38,
  },
  pageHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginBottom: 25,
  },
  pageIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#E0ECEE',
  },
  pageHeadingText: {
    flex: 1,
  },
  title: {
    color: '#18384B',
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    color: '#72848D',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 3,
  },
  pressed: {
    opacity: 0.7,
  },
});
