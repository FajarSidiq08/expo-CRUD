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
import { register } from "../state/authSlice";
import { router } from "expo-router";
import { AppDispatch } from "@/state/store";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { text: "", color: "#E8E8E8" };
    if (password.length < 6) return { text: "Weak", color: "#FF6B6B" };
    if (password.length < 10) return { text: "Medium", color: "#FFB84D" };
    return { text: "Strong", color: "#51CF66" };
  };

  const passwordStrength = getPasswordStrength(form.password);

  const handleRegister = async () => {
    const result = await dispatch(register(form));

    if (register.fulfilled.match(result)) {
      router.replace("/login");
    } else {
      alert("Gagal register");
    }
  };

  return (
    <View style={registerStyles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={["#5B4FFF", "#7B6FFF"]}
        style={registerStyles.header}
      >
        <View style={registerStyles.headerContent}>
          <TouchableOpacity 
            style={registerStyles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          
          <View style={registerStyles.headerRight}>
            <Text style={registerStyles.headerSubtext}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={registerStyles.headerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={registerStyles.logo}>Test</Text>
      </LinearGradient>

      {/* Form Container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={registerStyles.formContainer}
      >
        <ScrollView style={registerStyles.formContent} showsVerticalScrollIndicator={false}>
          <Text style={registerStyles.title}>Get started free.</Text>
          <Text style={registerStyles.subtitle}>Free forever. No credit card needed.</Text>

          {/* Email Input */}
          <View style={registerStyles.inputGroup}>
            <Text style={registerStyles.label}>Email Address</Text>
            <TextInput
              style={registerStyles.input}
              value={form.email}
              onChangeText={(v) => setForm({ ...form, email: v })}
              placeholder="nicholas@ergemla.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Name Input */}
          <View style={registerStyles.inputGroup}>
            <Text style={registerStyles.label}>Your name</Text>
            <TextInput
              style={registerStyles.input}
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
              placeholder="Nicholas Ergemla"
              placeholderTextColor="#999"
            />
          </View>

          {/* Password Input */}
          <View style={registerStyles.inputGroup}>
            <Text style={registerStyles.label}>Password</Text>
            <View style={registerStyles.passwordContainer}>
              <TextInput
                style={registerStyles.passwordInput}
                value={form.password}
                onChangeText={(v) => setForm({ ...form, password: v })}
                placeholder="••••••••••••••••"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={registerStyles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            
            {/* Password Strength Indicator */}
            {form.password.length > 0 && (
              <View style={registerStyles.strengthContainer}>
                <View style={registerStyles.strengthBar}>
                  <View 
                    style={[
                      registerStyles.strengthFill, 
                      { 
                        width: `${(form.password.length / 15) * 100}%`,
                        backgroundColor: passwordStrength.color 
                      }
                    ]} 
                  />
                </View>
                <Text style={[registerStyles.strengthText, { color: passwordStrength.color }]}>
                  {passwordStrength.text}
                </Text>
              </View>
            )}
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity onPress={handleRegister}>
            <LinearGradient
              colors={["#5B4FFF", "#B84FFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={registerStyles.signUpButton}
            >
              <Text style={registerStyles.signUpButtonText}>Sign up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={registerStyles.divider}>Or sign up with</Text>

          {/* Social Login Buttons */}
          <View style={registerStyles.socialButtons}>
            <TouchableOpacity style={registerStyles.socialButton}>
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text style={registerStyles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={registerStyles.socialButton}>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              <Text style={registerStyles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const registerStyles = StyleSheet.create({
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
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#E8E8E8",
    borderRadius: 2,
    overflow: "hidden",
  },
  strengthFill: {
    height: "100%",
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: "600",
  },
  signUpButton: {
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
  },
  signUpButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    textAlign: "center",
    color: "#999",
    fontSize: 13,
    marginTop: 24,
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