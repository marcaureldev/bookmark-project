<script setup lang="ts">
import Galaxy from "./Galaxy/Galaxy.vue";
import { Icon } from "@iconify/vue";
import Button from "./ui/Button.vue";
</script>

<template>
  <div class="relative w-full h-screen">
    <Galaxy />

    <nav
      class="max-w-3xl mx-auto px-6 py-4 absolute top-12 left-0 right-0 z-10 bg-gray-900/80 backdrop-blur-sm border border-gray-700 pointer-events-none rounded-full"
    >
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-[#78b4ff40] rounded-lg flex items-center justify-center"
          >
            <Icon
              icon="material-symbols:bookmark-outline"
              width="24"
              height="24"
            />
          </div>
          <span class="text-white font-semibold text-lg">BookMarker</span>
        </div>

        <div class="flex space-x-4 pointer-events-auto">
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
      class="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
    >
      <h1
        class="max-w-3xl text-7xl font-bold text-white text-center mb-12 leading-tight"
      >
        Gérez vos
        <span class="text-blue-400">favoris</span>
        en toute simplicité
      </h1>

      <p class="text-xl text-gray-300 max-w-2xl mb-12">
        Sauvegardez, organisez et retrouvez facilement tous vos liens web
        préférés
      </p>

      <div class="flex space-x-6">
        <router-link to="/auth/login">
          <Button
            icon="material-symbols:login"
            label="Commencer gratuitement"
          />
        </router-link>
        <Button icon="material-symbols:info" label="En savoir plus" />
      </div>
    </div>
  </div>
</template>
