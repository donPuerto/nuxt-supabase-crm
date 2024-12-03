<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useToast } from '@/composables/useToast';
import * as yup from 'yup';
import { AUTH_SOCIAL_PROVIDERS } from '~/utils/constants';
import type { AuthSocialProvider } from '@/types';
import { useForm } from 'vee-validate';

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
});

const { toast } = useToast();
const { start, finish } = useLoadingIndicator();

const passwordRequirements = [
  { regex: /.{8,}/, text: 'At least 8 characters length' },
  { regex: /\d/, text: 'At least 1 numeric character' },
  { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  { regex: /[!@#$%^&*(),.?":{}|<>]/, text: 'At least 1 special character' },
];

const { meta, handleSubmit, defineField, errors } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Please enter a valid email address').required().label('Email'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least 1 capital letter')
      .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character')
      .matches(/\d/, 'Password must contain at least 1 numeric character')
      .required()
      .label('Password'),
    agreedToTerms: yup.boolean()
      .oneOf([true], 'You must agree to the Terms of Service and Privacy Policy')
      .required()
      .label('Terms Agreement'),
  }),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [agreedToTerms, agreedToTermsAttrs] = defineField('agreedToTerms');

const showRequirements = ref(false);

const checkRequirement = (requirement: { regex: RegExp, text: string }) => {
  return requirement.regex.test(password.value || '');
};

const handlePasswordFocus = () => {
  showRequirements.value = true;
};

const { signUp, loading, error, signInWithOAuth } = useAuth();

// Compute whether the form is valid and all fields are filled
const isFormValid = computed(() => {
  return meta.value.valid && 
         email.value && 
         password.value && 
         agreedToTerms.value && 
         !loading.value;
});

const onSubmit = handleSubmit(async (values) => {
  const { email, password } = values;
  loading.value = true;
  start();
  try {
    await signUp(email, password);
    toast({
      title: 'Registration Successful',
      description: 'Please check your email to verify your account.',
      variant: 'success',      
    });
    // You might want to redirect the user or clear the form here
  } catch (error) {
    
    toast({
      title: 'An Error Occurred',
      description: (error as Error)?.message || 'Failed to register. Please try again later.',
      variant: 'destructive',      
    });
  }
  finally {
    loading.value = false;
    finish();
  }
});

const handleSocialLogin = (providerName: AuthSocialProvider) => {
  if (providerName === 'github' || providerName === 'google' || providerName === 'facebook') {
    signInWithOAuth(providerName);
  } else {
    toast({
      title: 'Unsupported Provider',
      description: `Provider '${providerName}' is not supported.`,
      variant: 'destructive',
    });
  }
};

const handleTermsChange = (checked: boolean) => {
  agreedToTerms.value = checked;
};
</script>

<template>
  <div class="space-y-6 rounded-lg border border-border bg-card p-6 shadow-md sm:p-8 md:p-10">
    <div class="text-left">
      <h1 class="text-2xl font-bold">Create an account</h1> 
      <p class="mt-2 text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-primary hover:underline">Log in here</NuxtLink>
      </p>
    </div>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <UiLabel for="email" class="mb-1 block text-sm font-medium text-foreground">Email</UiLabel>
        <UiInput
          id="email"
          v-bind="emailAttrs"
          v-model="email"
          type="email"
          placeholder="you@email.com"
        />
        <span v-if="errors.email" class="pt-1 text-sm text-destructive">{{ errors.email }}</span>
      </div>
      <div>
        <UiLabel for="password" class="mb-1 block text-sm font-medium text-foreground">Password</UiLabel>
        <UiInput
          id="password"
          v-bind="passwordAttrs"
          v-model="password"
          type="password"
          placeholder="••••••••"
          autocomplete="new-password"
          @focus="handlePasswordFocus"
        />
        <TransitionGroup
          tag="ul"
          v-if="showRequirements"
          class="mt-3 space-y-1 text-sm text-muted-foreground"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <li
            v-for="req in passwordRequirements"
            :key="req.text"
            class="flex items-center space-x-2"
          >
            <Icon
              :name="checkRequirement(req) ? 'ph:check-circle-fill' : 'ph:circle'"
              class="h-4 w-4"
              :class="checkRequirement(req) ? 'text-success' : 'text-muted-foreground'"
            />
            <span>
              {{ req.text }}
            </span>
          </li>
        </TransitionGroup>
        <span v-if="errors.password" class="pt-1 text-sm text-destructive">{{ errors.password }}</span>
      </div>
      
      <!-- Checkbox for Terms and Privacy Policy -->
      <div class="space-y-2">
        <div class="flex items-start">
          <UiCheckbox 
            id="checkbox-terms" 
            v-bind="agreedToTermsAttrs"
            :checked="agreedToTerms"
            @update:checked="handleTermsChange"
          />
          <div class="ml-3 text-xs">
            <UiLabel for="checkbox-terms" class="inline text-foreground">
              I agree to the 
              <a href="/terms-of-service" class="text-primary hover:underline">Terms of Service</a>
              <span class="mx-1">and</span>
              <a href="/privacy-policy" class="text-primary hover:underline">Privacy Policy</a>
            </UiLabel>
          </div>
        </div>
   
        <span v-if="errors.agreedToTerms" class="block text-sm text-destructive">{{ errors.agreedToTerms }}</span>
      </div>
      
      <UiButton 
        type="submit" 
        class="w-full"
        :loading="loading"
        :disabled="!isFormValid"
      >
        Create Account
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

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <UiButton 
        v-for="provider in AUTH_SOCIAL_PROVIDERS"
        :key="provider.name"
        class="flex w-full items-center justify-center"
        variant="ghost"
        :disabled="loading"
        @click="handleSocialLogin(provider.name)"
      >
        <Icon 
          :name="provider.icon" 
          :size="provider.size" 
          class="mr-2 hidden sm:inline-block md:mr-0"
        /> 
        <span class="sm:hidden">{{ provider.label }}</span>
        <span class="hidden sm:inline md:hidden lg:inline">{{ provider.label }}</span>
      </UiButton>
    </div>

    <p v-if="error" class="text-center text-sm text-destructive">{{ error }}</p>
  </div>
</template>

<style scoped>
.text-sm {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.flex-shrink-0 {
  flex-shrink: 0;
}
</style>
