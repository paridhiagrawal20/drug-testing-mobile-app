import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FieldTestingPage } from '@/components/FieldTestingPage';

export default function CameraScreen() {
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);
  const [captured, setCaptured] = useState(false);

  return (
    <FieldTestingPage
      title="Capture Test"
      subtitle="Position the test kit for a clear reading."
      headerTitle="Capture Test"
      backRoute="/new-test"
      backLabel="Go to New Drug Test"
      icon={{ ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' }}>
      <View style={styles.cameraCard}>
        <View style={[styles.cameraPreview, captured && styles.cameraPreviewCaptured]}>
          <View style={styles.previewTopBar}>
            <View style={styles.previewPill}>
              <View style={styles.liveDot} />
              <Text style={styles.previewPillText}>{captured ? 'CAPTURED' : 'LIVE PREVIEW'}</Text>
            </View>
            <SymbolView
              name={{ ios: 'viewfinder', android: 'center_focus_strong', web: 'center_focus_strong' }}
              size={22}
              tintColor="rgba(255,255,255,0.8)"
            />
          </View>

          <View style={styles.previewCenter}>
            <View style={[styles.detectionFrame, captured && styles.detectionFrameCaptured]}>
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
              {captured ? (
                <View style={styles.capturedMark}>
                  <SymbolView
                    name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
                    size={31}
                    tintColor="#A8E4C0"
                  />
                  <Text style={styles.capturedText}>Mock image captured</Text>
                </View>
              ) : (
                <SymbolView
                  name={{ ios: 'rectangle.dashed', android: 'crop_free', web: 'crop_free' }}
                  size={39}
                  tintColor="rgba(255,255,255,0.55)"
                />
              )}
            </View>
            <Text style={styles.alignmentText}>
              Align the test strip and color reference card inside the frame
            </Text>
          </View>

          <View style={styles.previewBottomBar}>
            <Text style={styles.previewHint}>{frontCamera ? 'Front camera' : 'Rear camera'}</Text>
            <Text style={styles.previewHint}>{flashEnabled ? 'Flash on' : 'Flash off'}</Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={[styles.statusDot, captured && styles.statusDotCaptured]} />
          <Text style={styles.statusText}>{captured ? 'Mock capture ready' : 'Ready to capture'}</Text>
        </View>
      </View>

      {!captured && (
        <View style={styles.instructionsCard}>
          <InstructionRow icon="steady" text="Keep the camera steady" />
          <InstructionRow icon="light" text="Ensure good lighting" />
          <InstructionRow icon="card" text="Keep the color card visible" />
        </View>
      )}

      <View style={styles.controls}>
        <ControlButton
          active={flashEnabled}
          icon={flashEnabled ? 'flash' : 'flash-off'}
          label="Flash"
          onPress={() => setFlashEnabled((current) => !current)}
        />
        <Pressable
          accessibilityLabel={captured ? 'Retake test image' : 'Capture test image'}
          accessibilityRole="button"
          onPress={() => setCaptured(true)}
          style={({ pressed }) => [styles.captureButton, pressed && styles.capturePressed]}>
          <View style={styles.captureButtonInner}>
            <SymbolView
              name={{ ios: captured ? 'arrow.counterclockwise' : 'camera.fill', android: captured ? 'refresh' : 'photo_camera', web: captured ? 'refresh' : 'photo_camera' }}
              size={27}
              tintColor="#FFFFFF"
            />
          </View>
        </Pressable>
        <ControlButton
          active={false}
          icon="flip"
          label="Flip"
          onPress={() => setFrontCamera((current) => !current)}
        />
      </View>

      {captured && (
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/test-result')}
          style={({ pressed }) => [styles.analyzeButton, pressed && styles.pressed]}>
          <Text style={styles.analyzeButtonText}>Analyze Test</Text>
          <SymbolView
            name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
            size={19}
            tintColor="#FFFFFF"
          />
        </Pressable>
      )}
    </FieldTestingPage>
  );
}

type InstructionIcon = 'steady' | 'light' | 'card';

type InstructionRowProps = {
  icon: InstructionIcon;
  text: string;
};

function InstructionRow({ icon, text }: InstructionRowProps) {
  const icons = {
    steady: { ios: 'hand.raised.fill', android: 'pan_tool', web: 'pan_tool' },
    light: { ios: 'sun.max.fill', android: 'wb_sunny', web: 'wb_sunny' },
    card: { ios: 'rectangle.fill', android: 'credit_card', web: 'credit_card' },
  } as const;

  return (
    <View style={styles.instructionRow}>
      <SymbolView name={icons[icon]} size={18} tintColor="#1D6877" />
      <Text style={styles.instructionText}>{text}</Text>
    </View>
  );
}

type ControlButtonProps = {
  active: boolean;
  icon: 'flash' | 'flash-off' | 'flip';
  label: string;
  onPress: () => void;
};

function ControlButton({ active, icon, label, onPress }: ControlButtonProps) {
  const icons = {
    flash: { ios: 'bolt.fill', android: 'flash_on', web: 'flash_on' },
    'flash-off': { ios: 'bolt.slash.fill', android: 'flash_off', web: 'flash_off' },
    flip: { ios: 'camera.rotate.fill', android: 'flip_camera_android', web: 'flip_camera_android' },
  } as const;

  return (
    <Pressable
      accessibilityLabel={`${label} toggle`}
      accessibilityRole="button"
      accessibilityState={{ checked: active }}
      onPress={onPress}
      style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}>
      <View style={[styles.controlIcon, active && styles.controlIconActive]}>
        <SymbolView name={icons[icon]} size={20} tintColor={active ? '#FFFFFF' : '#56717C'} />
      </View>
      <Text style={styles.controlLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cameraCard: {
    padding: 12,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  cameraPreview: {
    height: 390,
    overflow: 'hidden',
    justifyContent: 'space-between',
    borderRadius: 16,
    backgroundColor: '#213D49',
  },
  cameraPreviewCaptured: {
    backgroundColor: '#244B4F',
  },
  previewTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  previewPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.27)',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A8E4C0',
  },
  previewPillText: {
    color: '#E7F0F1',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  previewCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  detectionFrame: {
    width: '100%',
    height: 155,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  detectionFrameCaptured: {
    backgroundColor: 'rgba(103, 180, 139, 0.12)',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#D0F2DA',
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 7,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 7,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 7,
  },
  cornerBottomRight: {
    right: 0,
    bottom: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderBottomRightRadius: 7,
  },
  capturedMark: {
    alignItems: 'center',
    gap: 8,
  },
  capturedText: {
    color: '#D0F2DA',
    fontSize: 12,
    fontWeight: '700',
  },
  alignmentText: {
    maxWidth: 270,
    color: '#E5EFF0',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 18,
    textAlign: 'center',
  },
  previewBottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  previewHint: {
    color: 'rgba(231,240,241,0.75)',
    fontSize: 10,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingTop: 14,
    paddingBottom: 2,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D5A249',
  },
  statusDotCaptured: {
    backgroundColor: '#4D8065',
  },
  statusText: {
    color: '#637A82',
    fontSize: 12,
    fontWeight: '700',
  },
  instructionsCard: {
    gap: 12,
    padding: 16,
    marginTop: 13,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E9EB',
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  instructionText: {
    color: '#526B77',
    fontSize: 13,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 19,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    minWidth: 62,
    minHeight: 56,
  },
  controlIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    backgroundColor: '#E3ECEE',
  },
  controlIconActive: {
    backgroundColor: '#1D6877',
  },
  controlLabel: {
    color: '#657C85',
    fontSize: 10,
    fontWeight: '700',
  },
  captureButton: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
    backgroundColor: '#DDE9EA',
    borderWidth: 3,
    borderColor: '#1D6877',
  },
  captureButtonInner: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: '#1D6877',
  },
  capturePressed: {
    transform: [{ scale: 0.94 }],
  },
  analyzeButton: {
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: '#1D556B',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.7,
  },
});
