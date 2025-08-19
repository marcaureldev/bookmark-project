<script setup lang="ts">
import { Icon } from "@iconify/vue";
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
            class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-white text-sm font-medium mb-2">
          Password
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

      <div class="flex items-center justify-between mb-6">
        <label class="flex items-center">
          <input
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span class="ml-2 text-white text-sm">Remember me</span>
        </label>
        <a href="#" class="text-blue-500 hover:text-blue-400 text-sm"
          >Mot de passe oublié ?</a
        >
      </div>

      <button
        class="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-600 transition-colors mb-4"
      >
        <Icon icon="material-symbols:login" class="w-5 h-5" />
        <span>Se connecter</span>
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
