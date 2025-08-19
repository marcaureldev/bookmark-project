<script setup lang="ts"></script>

<template>
  <div class="min-h-screen w-full bg-black text-white relative">
    <div
      class="absolute inset-0 z-0"
      style="
        background: radial-gradient(
          ellipse 80% 60% at 50% 0%,
          rgba(120, 180, 255, 0.25),
          transparent 70%
        ),
        #000000;
      "
    >
    <router-view />
    </div>
  </div>
</template>

<style scoped></style>
