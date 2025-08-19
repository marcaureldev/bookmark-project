<script setup lang="ts">
import { Icon } from "@iconify/vue";
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
          />
        </div>
      </div>

      <div class="flex items-center mb-6">
        <input
          type="checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
        />
        <span class="ml-2 text-white text-xs">
          J'accepte les
          <a href="#" class="text-blue-500 hover:text-blue-400"
            >Conditions d'utilisation</a
          >
          et la
          <a href="#" class="text-blue-500 hover:text-blue-400"
            >Politique de confidentialité</a
          >
        </span>
      </div>

      <button
        class="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-600 transition-colors mb-4"
      >
        <Icon icon="material-symbols:person-add" class="w-5 h-5" />
        <span>Créer un compte</span>
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
