import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../state/authSlice";
import { router } from "expo-router";
import { AppDispatch } from "@/state/store";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      router.replace("/");
    } else {
      alert("Gagal login");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={["#5B4FFF", "#7B6FFF"]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <Text style={styles.headerSubtext}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.headerLink}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.logo}>Test</Text>
      </LinearGradient>

      {/* Form Container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <ScrollView style={styles.formContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Enter your details below</Text>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="nicholas@ergemla.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••••••••••"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity onPress={handleLogin}>
            <LinearGradient
              colors={["#5B4FFF", "#B84FFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInButton}
            >
              <Text style={styles.signInButtonText}>Sign in</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>

          <Text style={styles.divider}>Or sign in with</Text>

          {/* Social Login Buttons */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  headerLink: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  logo: {
    color: "#FFF",
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    marginTop: -20,
  },
  formContent: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 15,
    color: "#1A1A1A",
  },
  eyeIcon: {
    padding: 16,
  },
  signInButton: {
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
  },
  signInButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#666",
    fontSize: 14,
  },
  divider: {
    textAlign: "center",
    color: "#999",
    fontSize: 13,
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 40,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    gap: 8,
  },
  socialButtonText: {
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "500",
  },
});


