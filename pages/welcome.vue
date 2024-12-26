<script setup lang="ts">
const router = useRouter();
const { updateProfile, updatePreferences, completeOnboarding } = useAuth();
const { start, finish } = useLoadingIndicator();

const { toast } = useToast();

const steps = [
  { id: 1, title: 'Profile' },
  { id: 2, title: 'Preferences' },
  { id: 3, title: 'Complete' },
];

const currentStep = ref(1);

const profile = ref({
  fullName: '',
  jobTitle: '',
  company: '',
});

const preferences = ref({
  emailNotifications: true,
  weeklyReport: true,
  timezone: 'UTC',
});

const handleError = (e: any) => {
  const message = e?.message || 'An error occurred';
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  });
};

const nextStep = async () => {
  try {
    start();
    if (currentStep.value === 1) {
      await updateProfile(profile.value);
    } else if (currentStep.value === 2) {
      await updatePreferences(preferences.value);
    }
    currentStep.value++;
  } catch (e) {
    handleError(e);
  } finally {
    finish();
  }
};

const finishOnboarding = async () => {
  try {
    start();
    await completeOnboarding();
    await router.push('/dashboard');
  } catch (e) {
    handleError(e);
  } finally {
    finish();
  }
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-16">
      <div class="mx-auto max-w-3xl space-y-8">
        <!-- Welcome Header -->
        <div class="space-y-4 text-center">
          <h1 class="text-4xl font-bold">Welcome to Your CRM Dashboard</h1>
          <p class="text-lg text-muted-foreground">Let's get you started with a few quick steps</p>
        </div>

        <!-- Progress Steps -->
        <div class="mb-8 flex items-center justify-between">
          <div v-for="step in steps" :key="step.id" class="relative flex-1">
            <div class="flex items-center">
              <div
                :class="[
                  'flex size-8 items-center justify-center rounded-full border-2',
                  currentStep >= step.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground text-muted-foreground'
                ]"
              >
                {{ step.id }}
              </div>
              <div
                v-if="step.id < steps.length"
                :class="[
                  'mx-2 h-1 flex-1',
                  currentStep > step.id ? 'bg-primary' : 'bg-muted'
                ]"
              />
            </div>
            <span class="absolute -bottom-6 left-0 text-sm text-muted-foreground">
              {{ step.title }}
            </span>
          </div>
        </div>

        <!-- Step Content -->
        <div class="mt-16 space-y-8">
          <!-- Profile Setup -->
          <div v-if="currentStep === 1" class="space-y-6">
            <h2 class="text-2xl font-semibold">Complete Your Profile</h2>
            <div class="grid gap-4">
              <div class="space-y-2">
                <Label for="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  v-model="profile.fullName" 
                  placeholder="John Doe"
                  :disabled="$loading" 
                />
              </div>
              <div class="space-y-2">
                <Label for="jobTitle">Job Title</Label>
                <Input 
                  id="jobTitle" 
                  v-model="profile.jobTitle" 
                  placeholder="Sales Manager"
                  :disabled="$loading" 
                />
              </div>
              <div class="space-y-2">
                <Label for="company">Company</Label>
                <Input 
                  id="company" 
                  v-model="profile.company" 
                  placeholder="Acme Inc."
                  :disabled="$loading" 
                />
              </div>
            </div>
          </div>

          <!-- Preferences -->
          <div v-if="currentStep === 2" class="space-y-6">
            <h2 class="text-2xl font-semibold">Set Your Preferences</h2>
            <div class="space-y-4">
              <div class="flex items-center space-x-2">
                <Checkbox 
                  id="emailNotifications" 
                  v-model="preferences.emailNotifications"
                  :disabled="$loading" 
                />
                <Label for="emailNotifications">Receive email notifications</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox 
                  id="weeklyReport" 
                  v-model="preferences.weeklyReport"
                  :disabled="$loading" 
                />
                <Label for="weeklyReport">Subscribe to weekly report</Label>
              </div>
              <div class="space-y-2">
                <Label for="timezone">Timezone</Label>
                <Select 
                  v-model="preferences.timezone"
                  :disabled="$loading"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                </Select>
              </div>
            </div>
          </div>

          <!-- Complete -->
          <div v-if="currentStep === 3" class="space-y-6 text-center">
            <div class="inline-flex size-16 items-center justify-center rounded-full bg-green-100">
              <Icon name="carbon:checkmark" class="size-8 text-green-600" />
            </div>
            <h2 class="text-2xl font-semibold">You're All Set!</h2>
            <p class="text-muted-foreground">
              Your profile is now complete. You can start using the CRM dashboard.
            </p>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between pt-8">
          <Button
            v-if="currentStep > 1"
            variant="outline"
            :disabled="$loading"
            @click="currentStep--"
          >
            Previous
          </Button>
          <div class="flex-1" />
          <Button
            v-if="currentStep < steps.length"
            :disabled="$loading"
            @click="nextStep"
          >
            <template v-if="$loading">
              <Icon name="carbon:circle-dash" class="mr-2 size-4 animate-spin" />
              Saving...
            </template>
            <template v-else>
              Continue
            </template>
          </Button>
          <Button
            v-else
            :disabled="$loading"
            @click="finishOnboarding"
          >
            <template v-if="$loading">
              <Icon name="carbon:circle-dash" class="mr-2 size-4 animate-spin" />
              Finishing...
            </template>
            <template v-else>
              Go to Dashboard
            </template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
