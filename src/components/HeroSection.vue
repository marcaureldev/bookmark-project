<script setup lang="ts">
import Galaxy from "./Galaxy/Galaxy.vue";
import { Icon } from "@iconify/vue";
import Button from "./ui/Button.vue";
</script>

<template>
  <div class="relative w-full h-screen">
    <Galaxy />

    <nav
      class="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 absolute top-4 sm:top-8 lg:top-12 left-4 right-4 sm:left-0 sm:right-0 z-10 bg-gray-900/80 backdrop-blur-sm border border-gray-700 pointer-events-none rounded-full"
    >
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div
            class="w-6 h-6 sm:w-8 sm:h-8 bg-[#78b4ff40] rounded-lg flex items-center justify-center"
          >
            <Icon
              icon="material-symbols:bookmark-outline"
              class="w-5 h-5 sm:w-6 sm:h-6"
            />
          </div>
          <span class="text-white font-semibold text-sm sm:text-base lg:text-lg">BookMarker</span>
        </div>

        <div class="flex space-x-2 sm:space-x-4 pointer-events-auto">
          <router-link to="/auth/login">    
            <Button icon="material-symbols:login" label="Se connecter" />
          </router-link>
          <router-link to="/auth/register">
            <Button icon="material-symbols:person-add" label="S'inscrire" />
          </router-link>
        </div>
      </div>
    </nav>

    <div
      class="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 lg:px-8"
    >
      <h1
        class="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center mb-6 sm:mb-8 lg:mb-12 leading-tight"
      >
        Gérez vos
        <span class="text-blue-400">favoris</span>
        <span class="block sm:inline">en toute simplicité</span>
      </h1>

      <p class="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mb-8 sm:mb-10 lg:mb-12 text-center">
        Sauvegardez, organisez et retrouvez facilement tous vos liens web
        préférés
      </p>

      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
        <router-link to="/auth/login" class="w-full sm:w-auto">
          <Button
            icon="material-symbols:login"
            label="Commencer gratuitement"
            class="w-full sm:w-auto"
          />
        </router-link>
        <Button icon="material-symbols:info" label="En savoir plus" class="w-full sm:w-auto" />
      </div>
    </div>
  </div>
</template>
