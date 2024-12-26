<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth';
import { useToast } from '@/composables/useToast';
import * as yup from 'yup';

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
});

const route = useRoute();
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
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least 1 capital letter')
      .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character')
      .matches(/\d/, 'Password must contain at least 1 numeric character')
      .required()
      .label('Password'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required()
      .label('Confirm Password'),
  }),
});

const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');

const showRequirements = ref(false);

const checkRequirement = (requirement: { regex: RegExp, text: string }) => {
  return requirement.regex.test(password.value || '');
};

const handlePasswordFocus = () => {
  showRequirements.value = true;
};

const { updatePassword, loading, error } = useAuth();

const onSubmit = handleSubmit(async (values) => {
  try {
    start();
    const { error: resetError } = await updatePassword(values.password);
    
    if (resetError) {
      toast({
        title: 'Error',
        description: resetError.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Your password has been updated successfully.',
      variant: 'success',
    });
    
    // Navigate to login page
    navigateTo('/auth/login');
  } catch (e: any) {
    toast({
      title: 'Error',
      description: e.message || 'Failed to update password',
      variant: 'destructive',
    });
  } finally {
    finish();
  }
});
</script>

<template>
  <div class="bg-card rounded-lg border border-border shadow-md p-6 sm:p-8 md:p-10 space-y-6">
    <div class="text-left">
      <h1 class="text-2xl font-bold">Reset Password</h1>
      <p class="text-sm text-muted-foreground mt-2">
        Please enter your new password below.
      </p>
    </div>
    
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <UiLabel for="password" class="block text-sm font-medium text-foreground mb-1">New Password</UiLabel>
        <UiInput
          id="password"
          v-bind="passwordAttrs"
          v-model="password"
          type="password"
          placeholder="••••••••"
          @focus="handlePasswordFocus"
        />
        <span v-if="errors.password" class="text-destructive text-sm pt-1">{{ errors.password }}</span>
      </div>

      <div v-if="showRequirements" class="space-y-2">
        <p class="text-sm font-medium text-foreground">Password Requirements:</p>
        <ul class="space-y-1">
          <li
            v-for="requirement in passwordRequirements"
            :key="requirement.text"
            class="text-sm flex items-center space-x-2"
            :class="checkRequirement(requirement) ? 'text-success' : 'text-destructive'"
          >
            <Icon
              :name="checkRequirement(requirement) ? 'heroicons:check-circle' : 'heroicons:x-circle'"
              class="w-4 h-4"
            />
            <span>{{ requirement.text }}</span>
          </li>
        </ul>
      </div>

      <div>
        <UiLabel for="confirmPassword" class="block text-sm font-medium text-foreground mb-1">Confirm Password</UiLabel>
        <UiInput
          id="confirmPassword"
          v-bind="confirmPasswordAttrs"
          v-model="confirmPassword"
          type="password"
          placeholder="••••••••"
        />
        <span v-if="errors.confirmPassword" class="text-destructive text-sm pt-1">{{ errors.confirmPassword }}</span>
      </div>

      <UiButton 
        type="submit" 
        class="w-full"
        :disabled="!meta.valid"
        :loading="loading"
      >
        Reset Password
      </UiButton>
    </form>

    <div class="text-center">
      <NuxtLink to="/auth/login" class="text-primary hover:underline">Back to Login</NuxtLink>
    </div>

    <p v-if="error" class="text-destructive text-sm text-center">{{ error }}</p>
  </div>
</template>
