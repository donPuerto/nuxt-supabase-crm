<script lang="ts" setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useToast } from '@/composables/useToast';
import * as yup from 'yup';
import { useForm } from 'vee-validate';

definePageMeta({
  layout: 'auth',
});

const { toast } = useToast();
const { start, finish } = useLoadingIndicator();

const { meta, handleSubmit, defineField, errors } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Please enter a valid email address').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address').required().label('Email'),
    password: yup.string().required().label('Password'),
  }),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const { signInWithEmailAndPassword, signInWithOAuth, loading, error } = useAuth();

const rememberMe = ref(false);

const handleEmailLogin = handleSubmit(async (values, { resetForm }) => {
  const { email, password } = values;
  loading.value = true;
  start();
  try {
    await signInWithEmailAndPassword(email, password);
    toast({
      title: 'Signed in successfully',
      description: 'Welcome to the platform.',
      variant: 'success',      
    });

    resetForm();
  } catch (error) {
    toast({
      title: 'An Error Occurred',
      description: (error as Error)?.message || 'Failed to sign in. Please try again later.',
      variant: 'destructive',      
    });
  }
  finally {
    loading.value = false;
    finish();
  }
});

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
          v-bind="emailAttrs"
          v-model="email"
          type="email"
          placeholder="you@email.com"
        />
        <span v-if="errors.email" class="text-destructive text-sm pt-1">{{ errors.email }}</span>
      </div>
      <div>
        <UiLabel for="password" class="block text-sm font-medium text-foreground mb-1">Password</UiLabel>
        <UiInput
          id="password"
          v-bind="passwordAttrs"
          v-model="password"
          type="password"
          placeholder="••••••••"
        />
        <span v-if="errors.password" class="text-destructive text-sm pt-1">{{ errors.password }}</span>
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
      <UiButton 
        type="submit" 
        class="w-full"
        :disabled="!meta.touched"
        :loading="loading"
      >
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
        <Icon name="Google" :size="18" class="mr-2" /> Google
      </button>

    </div>

    <p v-if="error" class="text-destructive text-sm text-center">{{ error }}</p>
  </div>
</template>
