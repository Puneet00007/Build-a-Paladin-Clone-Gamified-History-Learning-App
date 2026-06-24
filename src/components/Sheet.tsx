import React from 'react';
import { View, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { Theme } from '../theme';

interface SheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Sheet({ visible, onClose, children }: SheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.sheetContainer}>
        <View style={styles.handle} />
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.dark.surfaceElevated,
    borderTopLeftRadius: Theme.radii.lg,
    borderTopRightRadius: Theme.radii.lg,
    padding: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xxxl, // safe area padding approx
    ...Theme.shadows.md,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Theme.colors.dark.textMuted,
    borderRadius: Theme.radii.full,
    alignSelf: 'center',
    marginBottom: Theme.spacing.lg,
  },
});
