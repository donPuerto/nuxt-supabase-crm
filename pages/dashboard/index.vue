
<script setup lang="ts">
import { ref } from 'vue';

// Basic user data
const user = ref({
  name: 'John Doe',
  role: 'admin',
});

const metrics = ref([
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    trend: 20.1,
    icon: 'carbon:currency',
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    trend: 180.1,
    icon: 'carbon:user-multiple',
  },
  {
    title: 'Active Projects',
    value: '12',
    trend: -10,
    icon: 'carbon:document',
  },
  {
    title: 'Active Now',
    value: '+573',
    trend: 201,
    icon: 'carbon:activity',
  },
]);

const projects = ref([
  {
    name: 'New Website',
    status: 'In Progress',
    progress: 60,
  },
  {
    name: 'Marketing Campaign',
    status: 'Completed',
    progress: 100,
  },
  {
    name: 'Mobile App',
    status: 'In Progress',
    progress: 30,
  },
]);

const quickActions = ref([
  {
    label: 'Create New Project',
    icon: 'carbon:add',
  },
  {
    label: 'View Reports',
    icon: 'carbon:report',
  },
  {
    label: 'Team Members',
    icon: 'carbon:group',
  },
  {
    label: 'Settings',
    icon: 'carbon:settings',
  },
]);

const recentActivities = ref([
  {
    id: 1,
    title: 'Project "Website Redesign" created',
    time: '2 hours ago',
    icon: 'carbon:document-add',
  },
  {
    id: 2,
    title: 'New team member added',
    time: '4 hours ago',
    icon: 'carbon:user-follow',
  },
  {
    id: 3,
    title: 'Client meeting scheduled',
    time: '6 hours ago',
    icon: 'carbon:calendar',
  },
]);
</script>

<template>
  <div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
    <!-- Dashboard Header -->
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Welcome back, {{ user.name }}</h2>
      <div class="flex items-center space-x-2">
        <Button variant="outline">
          <Icon name="carbon:download" class="mr-2 size-4" />
          Download Reports
        </Button>
      </div>
    </div>

    <!-- Overview Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="metric in metrics" :key="metric.title">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">{{ metric.title }}</CardTitle>
          <Icon :name="metric.icon" class="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ metric.value }}</div>
          <p class="text-xs text-muted-foreground">
            <span :class="metric.trend >= 0 ? 'text-green-500' : 'text-red-500'">
              {{ metric.trend >= 0 ? '+' : '' }}{{ metric.trend }}%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Main Content Area -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <!-- Main Widget -->
      <div class="col-span-4">
        <Card class="h-full">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>A list of your recent projects and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                <div>Project</div>
                <div>Status</div>
                <div>Progress</div>
              </div>
              <div v-for="project in projects" :key="project.name" class="grid grid-cols-3 items-center gap-4">
                <div>{{ project.name }}</div>
                <div>
                  <Badge :variant="project.status === 'Completed' ? 'secondary' : 'outline'">
                    {{ project.status }}
                  </Badge>
                </div>
                <div class="w-full">
                  <div class="h-2 rounded bg-primary" :style="{ width: project.progress + '%' }" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Side Widgets -->
      <div class="col-span-3">
        <div class="grid gap-4">
          <!-- Quick Actions -->
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent class="space-y-2">
              <Button
                v-for="action in quickActions"
                :key="action.label"
                variant="ghost"
                class="w-full justify-start"
              >
                <Icon :name="action.icon" class="mr-2 size-4" />
                {{ action.label }}
              </Button>
            </CardContent>
          </Card>

          <!-- Recent Activity -->
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div
                  v-for="activity in recentActivities"
                  :key="activity.id"
                  class="flex items-center space-x-4"
                >
                  <div class="flex size-8 items-center justify-center rounded-full bg-primary/10">
                    <Icon :name="activity.icon" class="size-4 text-primary" />
                  </div>
                  <div class="flex-1 space-y-1">
                    <p class="text-sm font-medium">{{ activity.title }}</p>
                    <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
