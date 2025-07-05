import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function HomeScreen() {
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 + 57); // 24:57 in seconds
  const [isRunning, setIsRunning] = useState(true);
  const [bellsRemaining, setBellsRemaining] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meditation</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.timerSection}>
          <Text style={styles.meditationType}>Sakya</Text>
          <Text style={styles.timerDisplay}>{formatTime(timeRemaining)}</Text>
          <Text style={styles.bellsText}>{bellsRemaining} bell remaining</Text>
        </View>

        <View style={styles.controlsSection}>
          <TouchableOpacity style={styles.pauseButton} onPress={toggleTimer}>
            <View style={styles.pauseIcon}>
              <View style={styles.pauseBar} />
              <View style={styles.pauseBar} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    color: "#888",
    fontSize: 18,
    fontWeight: "400",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  timerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  meditationType: {
    color: "#888",
    fontSize: 20,
    marginBottom: 30,
  },
  timerDisplay: {
    color: "#fff",
    fontSize: 72,
    fontWeight: "200",
    marginBottom: 20,
  },
  bellsText: {
    color: "#666",
    fontSize: 16,
  },
  controlsSection: {
    alignItems: "center",
    paddingBottom: 100,
  },
  pauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  pauseIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pauseBar: {
    width: 6,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 3,
  },
});
