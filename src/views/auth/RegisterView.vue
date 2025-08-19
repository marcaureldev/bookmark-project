<script setup lang="ts">
import { Icon } from "@iconify/vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { toast, type ToastOptions } from "vue3-toastify";

const name = ref("");
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const router = useRouter();

const notify = (message: string, type: "success" | "error" = "success") => {
  toast(message, {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_RIGHT,
    type: type,
  } as ToastOptions);
};

const messages = {
  success: "Compte créé avec succès",
  error: "Une erreur est survenue lors de la création du compte",
  empty: "Veuillez remplir tous les champs",
  invalidEmail: "Veuillez saisir une adresse email valide",
  passwordLength: "Le mot de passe doit contenir au moins 6 caractères",
  termsNotAccepted: "Veuillez accepter les conditions d'utilisation",
};

const validateForm = () => {
  if (!name.value || !email.value || !password.value) {
    notify(messages.empty, "error");
    return false;
  }

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    notify(messages.invalidEmail, "error");
    return false;
  }

  // Validation mot de passe
  if (password.value.length < 6) {
    notify(messages.passwordLength, "error");
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    const formData = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    const response = await axios.post(
      "https://frontend-test-api-eta.vercel.app/auth/register",
      formData
    );

    if (response.status === 200 || response.status === 201) {
      notify(messages.success, "success");
      router.push("/auth/login");
    }
  } catch (error: any) {
    console.error("Registration error:", error);

    let errorMessage = messages.error;

    if (error.response) {
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 409) {
        errorMessage = "Un compte avec cet email existe déjà";
      } else if (error.response.status === 400) {
        errorMessage = "Données invalides";
      }
    } else if (error.request) {
      errorMessage = "Erreur de connexion. Vérifiez votre connexion internet.";
    }

    notify(errorMessage, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center p-4">
    <div
      class="w-full max-w-lg bg-gray-800/40 backdrop-blur-xl rounded-xl p-8 border border-gray-500/40 shadow-2xl"
    >
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-4">Créer un compte</h1>
        <p class="text-gray-400 text-sm">Créez un compte pour commencer</p>
      </div>

      <div class="space-y-3 mb-6">
        <button
          class="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-600 transition-colors"
        >
          <div class="w-5 h-5 rounded-full flex items-center justify-center">
            <Icon icon="mdi:google" class="w-8 h-8" />
          </div>
          <span>Continuer avec Google</span>
        </button>
      </div>

      <div class="relative mb-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-gray-800/40 text-gray-400"
            >Ou continuer avec</span
          >
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-white text-sm font-medium mb-2">
          Nom complet
        </label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Icon
              icon="material-symbols:person-outline"
              class="w-5 h-5 text-gray-400"
            />
          </div>
          <input
            type="text"
            placeholder="John Doe"
            class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model="name"
            :disabled="isLoading"
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-white text-sm font-medium mb-2">
          Adresse email
        </label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Icon
              icon="material-symbols:mail-outline"
              class="w-5 h-5 text-gray-400"
            />
          </div>
          <input
            type="email"
            placeholder="votre@email.com"
            class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model="email"
            :disabled="isLoading"
          />
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-white text-sm font-medium mb-2">
          Mot de passe
        </label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Icon
              icon="material-symbols:lock-outline"
              class="w-5 h-5 text-gray-400"
            />
          </div>
          <input
            type="password"
            placeholder="••••••••"
            class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model="password"
            :disabled="isLoading"
          />
        </div>
      </div>

      <button
        class="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-600 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleSubmit"
        :disabled="isLoading"
      >
        <Icon
          v-if="isLoading"
          icon="material-symbols:hourglass-empty"
          class="w-5 h-5 animate-spin"
        />
        <Icon v-else icon="material-symbols:person-add" class="w-5 h-5" />
        <span>{{
          isLoading ? "Création en cours..." : "Créer un compte"
        }}</span>
      </button>

      <div class="text-center">
        <span class="text-gray-400 text-sm">Vous avez déjà un compte ? </span>
        <router-link
          to="/auth/login"
          class="text-blue-500 hover:text-blue-400 text-sm font-medium"
          >Se connecter</router-link
        >
      </div>
    </div>
  </div>
</template>
