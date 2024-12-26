<script lang="ts" setup>
const features = [
  {
    name: 'AI-Powered Customer Insights',
    description: 'Leverage advanced machine learning to predict customer needs, analyze sentiment, and provide personalized recommendations in real-time.',
    icon: 'carbon:machine-learning-model',
  },
  {
    name: 'Intelligent Sales Forecasting',
    description: 'Predict revenue trends and opportunities with AI-driven analytics that learn from your historical data and market patterns.',
    icon: 'carbon:chart-relationship',
  },
  {
    name: 'Smart Task Automation',
    description: 'Automate routine tasks with AI workflows that adapt to your team\'s patterns and prioritize high-impact activities.',
    icon: 'carbon:flow-stream',
  },
  {
    name: 'Predictive Analytics',
    description: 'Transform data into actionable insights with AI models that forecast trends, identify risks, and uncover growth opportunities.',
    icon: 'carbon:data-vis-4',
  },
  {
    name: 'Intelligent Lead Scoring',
    description: 'Prioritize leads automatically using AI that analyzes behavior patterns, engagement metrics, and conversion probability.',
    icon: 'carbon:model-alt',
  },
  {
    name: 'Smart Communications',
    description: 'Engage customers with AI-optimized messaging that personalizes content, timing, and channel selection for maximum impact.',
    icon: 'carbon:chat-bot',
  },
] as const;

const stats = [
  { label: 'AI Predictions Made', value: '1M+' },
  { label: 'Time Saved Weekly', value: '40h+' },
  { label: 'Revenue Increase', value: '32%' },
] as const;

const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: 'carbon:logo-facebook',
  },
  {
    name: 'Twitter',
    href: '#',
    icon: 'carbon:logo-twitter',
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: 'carbon:logo-linkedin',
  },
  {
    name: 'GitHub',
    href: '#',
    icon: 'carbon:logo-github',
  },
] as const;
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation -->
    <nav class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-16 items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="flex items-center justify-center">
            <Icon name="carbon:compass" class="size-8 text-primary opacity-90" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold tracking-tight text-foreground">Pathfinder <span class="bg-gradient-to-r from-primary to-primary/80 bg-clip-text font-extrabold text-transparent">AI</span></span>
            <span class="text-xs font-medium text-muted-foreground">Navigating Intelligence</span>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <UiButton variant="ghost" as-child>
            <NuxtLink to="/auth/login">
              Login
            </NuxtLink>
          </UiButton>
          <UiButton variant="default" as-child>
            <NuxtLink to="/auth/register">
              Get Started
            </NuxtLink>
          </UiButton>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="container relative">
      <div class="relative z-10 py-16 lg:py-28">
        <div class="space-y-6 text-center lg:text-left">
          <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span class="block">Transform Data into</span>
            <span class="block text-primary">Customer Success</span>
          </h1>
          <p class="mx-auto text-lg text-muted-foreground lg:mx-0">
            Unlock deeper customer understanding with AI-powered insights. Turn every interaction into an opportunity with intelligent predictions and personalized engagement.
          </p>
          <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <UiButton size="lg" variant="default" as-child>
              <NuxtLink to="/auth/register">
                Start AI Journey
              </NuxtLink>
            </UiButton>
            <UiButton size="lg" variant="outline" as-child>
              <a href="#features">
                Explore AI Features
              </a>
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="container space-y-12 py-16">
      <div class="space-y-6 text-center">
        <div class="space-y-2">
          <UiBadge variant="outline" class="border-primary/20 text-primary">Powered by AI</UiBadge>
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Intelligence that grows with you
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
            Our advanced AI algorithms learn from your data to provide increasingly accurate insights and automation over time.
          </p>
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <UiCard v-for="feature in features" :key="feature.name" class="group relative overflow-hidden transition-colors hover:border-primary/50">
          <UiCardHeader>
            <div class="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
              <Icon :name="feature.icon" class="size-6 text-primary" />
            </div>
            <UiCardTitle class="ml-2 text-lg font-semibold">{{ feature.name }}</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="text-muted-foreground">{{ feature.description }}</p>
          </UiCardContent>
        </UiCard>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="border-y bg-muted/50">
      <div class="container py-16">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="text-3xl font-bold text-foreground sm:text-4xl">
            AI-Driven Results
          </h2>
          <p class="mt-3 text-xl text-muted-foreground">
            See how our AI transforms business metrics for companies worldwide
          </p>
        </div>
        <dl class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <dt class="text-lg font-medium text-muted-foreground">
              {{ stat.label }}
            </dt>
            <dd class="mt-2 text-5xl font-bold text-foreground">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t">
      <div class="container py-8">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p class="text-sm text-muted-foreground">
            &copy; {{ new Date().getFullYear() }} Insight+. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <UiButton
              v-for="item in socialLinks"
              :key="item.name"
              :href="item.href"
              variant="ghost"
              size="icon"
              class="size-9"
            >
              <Icon :name="item.icon" class="size-5" />
              <span class="sr-only">{{ item.name }}</span>
            </UiButton>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
