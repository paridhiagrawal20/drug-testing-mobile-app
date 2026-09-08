import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FieldTestingNav } from './FieldTestingNav';
import { MOCK_TESTS, TestRecord } from './FieldTestingData';

export function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View>
                <Text style={styles.brandName}>Field Drug Testing</Text>
                <View style={styles.welcomeRow}>
                  <Text style={styles.welcomeText}>Welcome, Officer</Text>
                  <View style={styles.onlineDot} />
                </View>
              </View>
              <Pressable
                accessibilityLabel="Open profile"
                accessibilityRole="button"
                onPress={() => router.replace('/profile')}
                style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}>
                <SymbolView
                  name={{ ios: 'person.fill', android: 'person', web: 'person' }}
                  size={21}
                  tintColor="#1D556B"
                />
              </Pressable>
            </View>

            <View style={styles.actionCard}>
              <View style={styles.actionIconCircle}>
                <SymbolView
                  name={{ ios: 'waveform.path.ecg', android: 'science', web: 'science' }}
                  size={26}
                  tintColor="#FFFFFF"
                />
              </View>
              <Text style={styles.actionTitle}>Start New Test</Text>
              <Text style={styles.actionDescription}>
                Capture and analyze a new field drug test
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace('/new-test')}
                style={({ pressed }) => [styles.startButton, pressed && styles.startButtonPressed]}>
                <Text style={styles.startButtonText}>Start Test</Text>
                <SymbolView
                  name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
                  size={19}
                  tintColor="#1D556B"
                />
              </Pressable>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.sectionCaption}>This month</Text>
            </View>
            <View style={styles.statsGrid}>
              <StatCard label="Tests Today" value="12" icon="calendar" iconColor="#2D6A78" />
              <StatCard label="Total Tests" value="248" icon="clipboard" iconColor="#8B6D3A" />
              <StatCard label="Positive Results" value="09" icon="warning" iconColor="#B75B52" />
              <StatCard label="Negative Results" value="239" icon="checkmark" iconColor="#4D8065" />
            </View>

            <View style={[styles.sectionHeader, styles.recentHeader]}>
              <Text style={styles.sectionTitle}>Recent Tests</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace('/history')}
                style={({ pressed }) => pressed && styles.pressed}>
                <Text style={styles.viewAll}>View all</Text>
              </Pressable>
            </View>
            <View style={styles.testList}>
              {MOCK_TESTS.slice(0, 4).map((test) => (
                <TestRow key={test.id} test={test} />
              ))}
            </View>
          </View>
        </ScrollView>
        <FieldTestingNav />
      </View>
    </SafeAreaView>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  icon: 'calendar' | 'clipboard' | 'warning' | 'checkmark';
  iconColor: string;
};

function StatCard({ label, value, icon, iconColor }: StatCardProps) {
  const iconNames = {
    calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
    clipboard: { ios: 'doc.text.fill', android: 'assignment', web: 'assignment' },
    warning: { ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' },
    checkmark: { ios: 'checkmark.seal.fill', android: 'verified', web: 'verified' },
  } as const;

  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: `${iconColor}16` }]}>
        <SymbolView name={iconNames[icon]} size={18} tintColor={iconColor} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function TestRow({ test }: { test: TestRecord }) {
  const resultColor = test.result === 'Positive' ? '#B75B52' : test.result === 'Pending' ? '#A47735' : '#4D8065';
  const statusColor = test.status === 'Pending review' ? '#A47735' : '#647A84';

  return (
    <View style={styles.testRow}>
      <View style={styles.testIcon}>
        <SymbolView
          name={{ ios: 'doc.text.fill', android: 'description', web: 'description' }}
          size={18}
          tintColor="#2D6A78"
        />
      </View>
      <View style={styles.testDetails}>
        <Text style={styles.testId}>{test.id}</Text>
        <Text style={styles.testMeta}>{test.dateTime}</Text>
        <Text style={styles.testMeta}>{test.sampleType}</Text>
      </View>
      <View style={styles.resultDetails}>
        <Text style={[styles.resultText, { color: resultColor }]}>{test.result}</Text>
        <Text style={[styles.statusText, { color: statusColor }]}>{test.status}</Text>
      </View>
    </View>
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
    paddingTop: 22,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  brandName: {
    color: '#18384B',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.35,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 5,
  },
  welcomeText: {
    color: '#71838D',
    fontSize: 13,
    fontWeight: '500',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4D8065',
  },
  profileButton: {
    width: 43,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#E0ECEE',
    borderWidth: 1,
    borderColor: '#C9DEE1',
  },
  actionCard: {
    overflow: 'hidden',
    padding: 22,
    borderRadius: 22,
    backgroundColor: '#1D556B',
    shadowColor: '#12394A',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 4,
  },
  actionIconCircle: {
    width: 49,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.16)',
    marginBottom: 17,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.35,
  },
  actionDescription: {
    maxWidth: 280,
    color: '#C4DADD',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  startButton: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    marginTop: 21,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  startButtonPressed: {
    backgroundColor: '#E4F0F1',
    transform: [{ scale: 0.98 }],
  },
  startButtonText: {
    color: '#1D556B',
    fontSize: 14,
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 26,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#18384B',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  sectionCaption: {
    color: '#82939D',
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 11,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: '42%',
    minWidth: 140,
    padding: 15,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E9EB',
  },
  statIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 12,
  },
  statValue: {
    color: '#18384B',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  statLabel: {
    color: '#758790',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  recentHeader: {
    marginTop: 29,
  },
  viewAll: {
    color: '#1D6877',
    fontSize: 12,
    fontWeight: '800',
  },
  testList: {
    gap: 10,
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E9EB',
  },
  testIcon: {
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#E6F0F1',
    marginRight: 11,
  },
  testDetails: {
    flex: 1,
    minWidth: 0,
  },
  testId: {
    color: '#244657',
    fontSize: 13,
    fontWeight: '800',
  },
  testMeta: {
    color: '#83939B',
    fontSize: 11,
    marginTop: 3,
  },
  resultDetails: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  resultText: {
    fontSize: 13,
    fontWeight: '800',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});
