<script lang="ts" setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

definePageMeta({
  layout: 'auth',
});

const { signInWithOAuth, loading, error } = useAuth();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

const handleEmailLogin = () => {
  // Implement email/password login logic here
  console.log('Email login:', email.value, password.value, 'Remember me:', rememberMe.value);
};

const handleSocialLogin = (provider: 'github' | 'google' | 'facebook') => {
  signInWithOAuth(provider);
};
</script>

<template>
  <div class="bg-card rounded-lg border border-border shadow-md p-6 sm:p-8 md:p-10 space-y-6">
    <div class="text-left">
      <h1 class="text-2xl font-bold">Welcome back</h1>
      <p class="text-sm text-muted-foreground mt-2">
        Don't have an account?
        <a href="#" class="text-primary hover:underline">Create today!</a>
      </p>
    </div>
    
    <form class="space-y-4" @submit.prevent="handleEmailLogin">
      <div>
        <UiLabel for="email" class="block text-sm font-medium text-foreground mb-1">Email</UiLabel>
        <UiInput
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="you@example.com"
        />
      </div>
      <div>
        <UiLabel for="password" class="block text-sm font-medium text-foreground mb-1">Password</UiLabel>
        <UiInput
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="••••••••"
        />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <UiCheckbox 
            id="remember-me"
            v-model="rememberMe"
            type="checkbox"
          />
          <UiLabel for="remember-me" class="ml-2 block text-sm text-foreground">Remember me</UiLabel>
        </div>
        <div class="text-sm">
          <a href="#" class="text-primary hover:underline">Forgot password?</a>
        </div>
      </div>
      <UiButton type="submit" class="w-full ">
        Sign in
      </UiButton>
    </form>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t border-border" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-card px-2 text-muted-foreground">Or continue with</span>
      </div>
    </div>

    <div class="flex space-x-4">
      <button 
        class="flex-1 bg-card hover:bg-accent text-foreground rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
        :disabled="loading"
        @click="handleSocialLogin('google')"
      >
        <Icon name="logos:google-icon" class="w-5 h-5 mr-2" /> Google
      </button>
      <button 
        class="flex-1 bg-card hover:bg-accent text-foreground rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
        :disabled="loading"
        @click="handleSocialLogin('github')"
      >
        <Icon name="logos:github-icon" class="w-5 h-5 mr-2" /> GitHub
      </button>
      <button 
        class="flex-1 bg-card hover:bg-accent text-foreground rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
        :disabled="loading"
        @click="handleSocialLogin('facebook')"
      >
        <Icon name="logos:facebook" class="w-5 h-5 mr-2" /> Facebook
      </button>
    </div>

    <p v-if="error" class="text-destructive text-sm text-center">{{ error }}</p>
  </div>
</template>
