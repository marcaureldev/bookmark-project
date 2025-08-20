<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { toast, type ToastOptions } from "vue3-toastify";
import { useRouter } from "vue-router";
import { authService } from "../../api/api";

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
  success: "Connexion réussie",
  error: "Une erreur est survenue lors de la connexion",
  empty: "Veuillez remplir tous les champs",
  invalidEmail: "Veuillez saisir une adresse email valide",
  invalidCredentials: "Email ou mot de passe incorrect",
  networkError: "Erreur de connexion. Vérifiez votre connexion internet.",
};

const validateForm = () => {
  if (!email.value || !password.value) {
    notify(messages.empty, "error");
    return false;
  }

  // Validation email basique
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    notify(messages.invalidEmail, "error");
    return false;
  }

  // Pour la connexion, on vérifie juste que le mot de passe n'est pas vide
  if (password.value.trim() === "") {
    notify("Veuillez saisir votre mot de passe", "error");
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    const response = await authService.login(email.value.trim(), password.value);
    
    if (response.access_token) {
      localStorage.setItem("token", response.access_token);
      notify(messages.success, "success");

      setTimeout(() => {
        router.replace("/dashboard");
      }, 100);
    } else {
      notify("Token d'accès manquant dans la réponse", "error");
    }
  } catch (error: any) {
    let errorMessage = messages.error;
    
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = messages.invalidCredentials;
      } else if (error.response.status === 400) {
        errorMessage = "Données invalides";
      } else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.request) {
      errorMessage = messages.networkError;
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
      class="w-full max-w-md bg-gray-800/40 backdrop-blur-xl rounded-xl p-8 border border-gray-500/40 shadow-2xl"
    >
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Bon retour !</h1>
        <p class="text-gray-400 text-sm">
          Connectez-vous à votre compte pour continuer
        </p>
      </div>

      <div class="space-y-3 mb-6">
        <button
          class="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-600 transition-colors"
          :disabled="isLoading"
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
          <span class="px-2 bg-gray-900 text-gray-400">Ou continuer avec</span>
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
            v-model="email"
            :disabled="isLoading"
            class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
            v-model="password"
            :disabled="isLoading"
            class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
        <Icon 
          v-else 
          icon="material-symbols:login" 
          class="w-5 h-5" 
        />
        <span>{{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}</span>
      </button>

      <div class="text-center">
        <span class="text-gray-400 text-sm">Vous n'avez pas de compte ? </span>
        <router-link
          to="/auth/register"
          class="text-blue-500 hover:text-blue-400 text-sm font-medium"
          >Créer un compte</router-link
        >
      </div>
    </div>
  </div>
</template>
