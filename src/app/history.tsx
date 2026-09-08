import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { MOCK_TESTS, TestRecord } from '@/components/FieldTestingData';
import { FieldTestingPage } from '@/components/FieldTestingPage';

type Filter = 'All' | TestRecord['result'];

const FILTERS: Filter[] = ['All', 'Positive', 'Negative', 'Pending'];

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredTests = MOCK_TESTS.filter((test) => {
    const matchesSearch =
      !normalizedQuery ||
      test.id.toLowerCase().includes(normalizedQuery) ||
      test.sampleId.toLowerCase().includes(normalizedQuery);
    const matchesFilter = activeFilter === 'All' || test.result === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <FieldTestingPage
      title="All test records"
      subtitle="Search and review your field testing activity."
      headerTitle="Test History"
      icon={{ ios: 'clock.fill', android: 'history', web: 'history' }}>
      <View style={styles.searchBar}>
        <SymbolView
          name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
          size={19}
          tintColor="#71858E"
        />
        <TextInput
          accessibilityLabel="Search by Test ID or Sample ID"
          onChangeText={setSearchQuery}
          placeholder="Search by Test ID or Sample ID"
          placeholderTextColor="#97A7AE"
          style={styles.searchInput}
          value={searchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable
            accessibilityLabel="Clear search"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => setSearchQuery('')}
            style={({ pressed }) => pressed && styles.pressed}>
            <SymbolView
              name={{ ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' }}
              size={18}
              tintColor="#91A0A6"
            />
          </Pressable>
        )}
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((filter) => {
          const selected = activeFilter === filter;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={({ pressed }) => [styles.filterChip, selected && styles.filterChipSelected, pressed && styles.pressed]}>
              <Text style={[styles.filterText, selected && styles.filterTextSelected]}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Test records</Text>
        <Text style={styles.resultsCount}>{filteredTests.length} found</Text>
      </View>

      {filteredTests.length > 0 ? (
        <View style={styles.recordList}>
          {filteredTests.map((test) => (
            <TestRecordCard key={test.id} test={test} />
          ))}
        </View>
      ) : (
        <EmptyState hasSearch={normalizedQuery.length > 0 || activeFilter !== 'All'} />
      )}
    </FieldTestingPage>
  );
}

function TestRecordCard({ test }: { test: TestRecord }) {
  const resultTone =
    test.result === 'Positive'
      ? { badge: '#FBE9E6', text: '#B75B52' }
      : test.result === 'Pending'
        ? { badge: '#FFF3DA', text: '#A47735' }
        : { badge: '#E6F1EB', text: '#4D8065' };

  return (
    <Pressable
      accessibilityLabel={`Open ${test.id}`}
      accessibilityRole="button"
      onPress={() => router.push({ pathname: '/test-details', params: { testId: test.id } })}
      style={({ pressed }) => [styles.recordCard, pressed && styles.recordCardPressed]}>
      <View style={styles.recordTopRow}>
        <View style={styles.recordIdentity}>
          <View style={styles.recordIcon}>
            <SymbolView
              name={{ ios: 'doc.text.fill', android: 'description', web: 'description' }}
              size={18}
              tintColor="#1D6877"
            />
          </View>
          <View>
            <Text style={styles.testId}>{test.id}</Text>
            <Text style={styles.sampleId}>Sample ID: {test.sampleId}</Text>
          </View>
        </View>
        <View style={[styles.resultBadge, { backgroundColor: resultTone.badge }]}>
          <Text style={[styles.resultText, { color: resultTone.text }]}>{test.result}</Text>
        </View>
      </View>
      <View style={styles.recordGrid}>
        <RecordMeta label="Date/time" value={test.dateTime} />
        <RecordMeta label="Location" value={test.location} />
        <RecordMeta label="Test type" value={test.testType} />
        <RecordMeta label="Status" value={test.status} valueStyle={test.result === 'Pending' ? styles.pendingText : undefined} />
      </View>
      <View style={styles.openRow}>
        <Text style={styles.openText}>View test details</Text>
        <SymbolView
          name={{ ios: 'chevron.right', android: 'arrow_forward', web: 'arrow_forward' }}
          size={16}
          tintColor="#1D6877"
        />
      </View>
    </Pressable>
  );
}

type RecordMetaProps = {
  label: string;
  value: string;
  valueStyle?: object;
};

function RecordMeta({ label, value, valueStyle }: RecordMetaProps) {
  return (
    <View style={styles.recordMeta}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text numberOfLines={1} style={[styles.metaValue, valueStyle]}>
        {value}
      </Text>
    </View>
  );
}

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <SymbolView
          name={{ ios: 'doc.text.magnifyingglass', android: 'search_off', web: 'search_off' }}
          size={27}
          tintColor="#6D858E"
        />
      </View>
      <Text style={styles.emptyTitle}>{hasSearch ? 'No matching tests' : 'No tests yet'}</Text>
      <Text style={styles.emptyDescription}>
        {hasSearch
          ? 'Try another Test ID, Sample ID, or result filter.'
          : 'Completed field tests will appear here when they are available.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D4E0E3',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#244657',
    fontSize: 13,
    paddingVertical: 0,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  filterChip: {
    minHeight: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1DEE1',
    backgroundColor: '#FFFFFF',
  },
  filterChipSelected: {
    borderColor: '#1D6877',
    backgroundColor: '#1D6877',
  },
  filterText: {
    color: '#71858E',
    fontSize: 12,
    fontWeight: '700',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 12,
  },
  resultsTitle: {
    color: '#18384B',
    fontSize: 17,
    fontWeight: '800',
  },
  resultsCount: {
    color: '#82939D',
    fontSize: 12,
    fontWeight: '600',
  },
  recordList: {
    gap: 11,
  },
  recordCard: {
    padding: 15,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  recordCardPressed: {
    backgroundColor: '#F4F9F9',
    transform: [{ scale: 0.99 }],
  },
  recordTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  recordIdentity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recordIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#E3F0F1',
  },
  testId: {
    color: '#244657',
    fontSize: 13,
    fontWeight: '800',
  },
  sampleId: {
    color: '#82939D',
    fontSize: 11,
    marginTop: 3,
  },
  resultBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },
  resultText: {
    fontSize: 11,
    fontWeight: '800',
  },
  recordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 13,
    columnGap: 8,
    paddingTop: 15,
    paddingBottom: 13,
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EDF1F2',
  },
  recordMeta: {
    flexBasis: '48%',
    minWidth: 130,
  },
  metaLabel: {
    color: '#8A9AA0',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.35,
  },
  metaValue: {
    color: '#526B77',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
  },
  pendingText: {
    color: '#A47735',
  },
  openRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  openText: {
    color: '#1D6877',
    fontSize: 11,
    fontWeight: '800',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 44,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  emptyIcon: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#E8F0F1',
  },
  emptyTitle: {
    color: '#244657',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 16,
  },
  emptyDescription: {
    maxWidth: 255,
    color: '#82939D',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
