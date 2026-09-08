import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { FieldTestingPage } from '@/components/FieldTestingPage';

const TEST_TYPES = ['5-Panel Drug Screen', '10-Panel Drug Screen', 'Alcohol Screening'];
const SAMPLE_TYPES = ['Urine', 'Oral Fluid', 'Blood'];

export default function NewTestScreen() {
  const [testId, setTestId] = useState('');
  const [testType, setTestType] = useState(TEST_TYPES[0]);
  const [sampleType, setSampleType] = useState(SAMPLE_TYPES[0]);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [openPicker, setOpenPicker] = useState<'test' | 'sample' | null>(null);

  return (
    <FieldTestingPage
      title="New Drug Test"
      subtitle="Enter the test details before capturing a sample."
      icon={{ ios: 'plus.circle.fill', android: 'add_circle', web: 'add_circle' }}>
      <View style={styles.formCard}>
        <FieldLabel label="Test ID / Sample ID" />
        <TextInput
          accessibilityLabel="Test ID or Sample ID"
          autoCapitalize="characters"
          onChangeText={setTestId}
          placeholder="Enter test or sample ID"
          placeholderTextColor="#9AAAB2"
          style={styles.input}
          value={testId}
        />

        <FieldLabel label="Test type" />
        <OptionPicker
          accessibilityLabel="Test type"
          isOpen={openPicker === 'test'}
          onPress={() => setOpenPicker(openPicker === 'test' ? null : 'test')}
          options={TEST_TYPES}
          onSelect={(option) => {
            setTestType(option);
            setOpenPicker(null);
          }}
          value={testType}
        />

        <FieldLabel label="Sample type" />
        <OptionPicker
          accessibilityLabel="Sample type"
          isOpen={openPicker === 'sample'}
          onPress={() => setOpenPicker(openPicker === 'sample' ? null : 'sample')}
          options={SAMPLE_TYPES}
          onSelect={(option) => {
            setSampleType(option);
            setOpenPicker(null);
          }}
          value={sampleType}
        />

        <FieldLabel label="Location" />
        <View style={styles.inputWithIcon}>
          <SymbolView
            name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' }}
            size={19}
            tintColor="#70858F"
          />
          <TextInput
            accessibilityLabel="Location"
            onChangeText={setLocation}
            placeholder="Enter test location"
            placeholderTextColor="#9AAAB2"
            style={styles.inlineInput}
            value={location}
          />
        </View>

        <FieldLabel label="Optional notes" />
        <TextInput
          accessibilityLabel="Optional notes"
          multiline
          onChangeText={setNotes}
          placeholder="Add any relevant observations"
          placeholderTextColor="#9AAAB2"
          style={[styles.input, styles.notesInput]}
          textAlignVertical="top"
          value={notes}
        />
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <SymbolView
            name={{ ios: 'lightbulb.fill', android: 'lightbulb', web: 'lightbulb' }}
            size={19}
            tintColor="#9A7035"
          />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Before you continue</Text>
          <Text style={styles.infoDescription}>
            Place the test kit and color reference card on a flat, well-lit surface before continuing.
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            Keyboard.dismiss();
            router.replace('/camera');
          }}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>Continue to Camera</Text>
          <SymbolView
            name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
            size={19}
            tintColor="#FFFFFF"
          />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            Keyboard.dismiss();
            router.replace('/home');
          }}
          style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </View>
    </FieldTestingPage>
  );
}

type FieldLabelProps = {
  label: string;
};

function FieldLabel({ label }: FieldLabelProps) {
  return <Text style={styles.label}>{label}</Text>;
}

type OptionPickerProps = {
  accessibilityLabel: string;
  isOpen: boolean;
  onPress: () => void;
  onSelect: (option: string) => void;
  options: string[];
  value: string;
};

function OptionPicker({ accessibilityLabel, isOpen, onPress, onSelect, options, value }: OptionPickerProps) {
  return (
    <View style={styles.pickerContainer}>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        onPress={onPress}
        style={({ pressed }) => [styles.picker, pressed && styles.pressed]}>
        <Text style={styles.pickerValue}>{value}</Text>
        <SymbolView
          name={{ ios: isOpen ? 'chevron.up' : 'chevron.down', android: 'arrow_drop_down', web: 'arrow_drop_down' }}
          size={19}
          tintColor="#5D7580"
        />
      </Pressable>
      {isOpen && (
        <View style={styles.optionsMenu}>
          {options.map((option) => (
            <Pressable
              accessibilityRole="button"
              key={option}
              onPress={() => onSelect(option)}
              style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}>
              <Text style={[styles.optionText, option === value && styles.optionSelected]}>{option}</Text>
              {option === value && (
                <SymbolView
                  name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                  size={16}
                  tintColor="#1D6877"
                />
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    padding: 18,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  label: {
    color: '#314D5E',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    height: 51,
    color: '#244657',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#D4E0E3',
    borderRadius: 13,
    backgroundColor: '#FBFCFC',
    paddingHorizontal: 14,
    marginBottom: 17,
  },
  pickerContainer: {
    marginBottom: 17,
  },
  picker: {
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D4E0E3',
    borderRadius: 13,
    backgroundColor: '#FBFCFC',
    paddingHorizontal: 14,
  },
  pickerValue: {
    color: '#244657',
    fontSize: 14,
  },
  optionsMenu: {
    overflow: 'hidden',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#D4E0E3',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  option: {
    minHeight: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F3',
  },
  optionPressed: {
    backgroundColor: '#F1F7F7',
  },
  optionText: {
    color: '#526B77',
    fontSize: 13,
  },
  optionSelected: {
    color: '#1D6877',
    fontWeight: '800',
  },
  inputWithIcon: {
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderWidth: 1,
    borderColor: '#D4E0E3',
    borderRadius: 13,
    backgroundColor: '#FBFCFC',
    paddingHorizontal: 14,
    marginBottom: 17,
  },
  inlineInput: {
    flex: 1,
    height: '100%',
    color: '#244657',
    fontSize: 14,
    paddingVertical: 0,
  },
  notesInput: {
    height: 82,
    paddingTop: 13,
    paddingBottom: 13,
    marginBottom: 0,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    gap: 11,
    marginTop: 14,
    borderRadius: 18,
    backgroundColor: '#FFF9ED',
    borderWidth: 1,
    borderColor: '#F0DEB7',
  },
  infoIcon: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: '#F9EAC8',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    color: '#805F2C',
    fontSize: 13,
    fontWeight: '800',
  },
  infoDescription: {
    color: '#896F46',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  actions: {
    gap: 10,
    marginTop: 18,
    marginBottom: 3,
  },
  primaryButton: {
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    backgroundColor: '#1D556B',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  cancelButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CCDADD',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    color: '#58707B',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
