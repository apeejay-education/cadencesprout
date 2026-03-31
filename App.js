import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  background: "#FAF7F2",
  surface: "#FFFFFF",
  primary: "#5C8B6E",
  text: "#1A1A1A",
  secondaryText: "#6B6B6B",
  tertiaryText: "#9A9A9A",
  border: "#E8E2D9",
  error: "#C0392B",
  warmYellow: "#F5C842",
};

function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf"),
    Inter_600SemiBold: require("@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf"),
    Fraunces_400Regular: require("@expo-google-fonts/fraunces/400Regular/Fraunces_400Regular.ttf"),
  });
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!fontsLoaded) {
    return <View style={styles.loadingScreen} />;
  }

  const canSubmit = phone.trim().length > 0 && password.trim().length > 0;

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      setError("Incorrect phone number or password.");
    }, 1000);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.screen}
        >
          <View style={styles.content}>
            <View style={styles.brandBlock}>
              <View style={styles.logoCircle}>
                <Ionicons name="sunny" size={28} color={COLORS.warmYellow} />
                <MaterialCommunityIcons
                  name="leaf"
                  size={22}
                  color={COLORS.primary}
                  style={styles.logoLeaf}
                />
              </View>
              <Text style={styles.schoolName}>Sunshine Preschool</Text>
              <Text style={styles.wordmark}>CadenceSprout</Text>
            </View>

            <View style={styles.formBlock}>
              <InputField
                labelPrefix="+91"
                placeholder="Phone number"
                value={phone}
                onChangeText={(value) => {
                  setPhone(value.replace(/[^0-9]/g, ""));
                  if (error) setError("");
                }}
                keyboardType="phone-pad"
                focused={focusedField === "phone"}
                errored={Boolean(error)}
                editable={!loading}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
              />

              <View style={styles.fieldSpacer} />

              <PasswordField
                placeholder="Password"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  if (error) setError("");
                }}
                visible={passwordVisible}
                onToggleVisibility={() => setPasswordVisible((current) => !current)}
                focused={focusedField === "password"}
                errored={Boolean(error)}
                editable={!loading}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Pressable style={styles.forgotRow}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>

              <Pressable
                onPress={handleLogin}
                disabled={!canSubmit || loading}
                style={({ pressed }) => [
                  styles.loginButton,
                  !canSubmit && styles.loginButtonDisabled,
                  pressed && canSubmit && !loading && styles.loginButtonPressed,
                ]}
              >
                {loading ? (
                  <View style={styles.loadingIndicator} />
                ) : (
                  <Text style={styles.loginButtonText}>Log In</Text>
                )}
              </Pressable>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by CadenceSprout</Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function InputField({
  labelPrefix,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  focused,
  errored,
  editable,
  onFocus,
  onBlur,
}) {
  return (
    <View
      style={[
        styles.inputShell,
        focused && styles.inputShellFocused,
        errored && styles.inputShellErrored,
        !editable && styles.inputShellDisabled,
      ]}
    >
      <View style={styles.prefixWrap}>
        <Text style={styles.prefixText}>{labelPrefix}</Text>
      </View>
      <View style={styles.prefixDivider} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.tertiaryText}
        keyboardType={keyboardType}
        style={styles.input}
        editable={editable}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
}

function PasswordField({
  placeholder,
  value,
  onChangeText,
  visible,
  onToggleVisibility,
  focused,
  errored,
  editable,
  onFocus,
  onBlur,
}) {
  return (
    <View
      style={[
        styles.inputShell,
        focused && styles.inputShellFocused,
        errored && styles.inputShellErrored,
        !editable && styles.inputShellDisabled,
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.tertiaryText}
        style={[styles.input, styles.passwordInput]}
        secureTextEntry={!visible}
        editable={editable}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Pressable onPress={onToggleVisibility} style={styles.eyeButton}>
        <Ionicons
          name={visible ? "eye-off-outline" : "eye-outline"}
          size={22}
          color={COLORS.tertiaryText}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 52,
  },
  brandBlock: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "rgba(35, 27, 16, 0.08)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 6,
  },
  logoLeaf: {
    position: "absolute",
    right: 15,
    bottom: 13,
  },
  schoolName: {
    marginTop: 8,
    color: COLORS.secondaryText,
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  wordmark: {
    marginTop: 24,
    color: COLORS.text,
    fontSize: 24,
    fontFamily: "Fraunces_400Regular",
  },
  formBlock: {
    width: "100%",
  },
  inputShell: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
  },
  inputShellFocused: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  inputShellErrored: {
    borderColor: COLORS.error,
  },
  inputShellDisabled: {
    opacity: 0.5,
  },
  prefixWrap: {
    justifyContent: "center",
    paddingLeft: 14,
    paddingRight: 10,
  },
  prefixText: {
    color: COLORS.secondaryText,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  prefixDivider: {
    width: 1,
    height: 22,
    backgroundColor: COLORS.border,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    outlineStyle: "none",
  },
  passwordInput: {
    paddingRight: 8,
  },
  eyeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldSpacer: {
    height: 16,
  },
  errorText: {
    marginTop: 10,
    color: COLORS.error,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  forgotRow: {
    alignSelf: "flex-end",
    marginTop: 12,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  loginButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonDisabled: {
    opacity: 0.55,
  },
  loginButtonPressed: {
    transform: [{ scale: 0.97 }],
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  loadingIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
    borderTopColor: "#FFFFFF",
  },
  footer: {
    paddingBottom: 18,
    paddingHorizontal: 24,
  },
  footerText: {
    textAlign: "center",
    color: COLORS.tertiaryText,
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
});

export default App;
