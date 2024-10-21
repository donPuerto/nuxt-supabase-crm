<!-- KanbanBoard.vue -->
<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useDraggable } from 'vue-draggable-plus';

const columns = ref([
  { id: 1, title: 'To Do', tasks: [] },
  { id: 2, title: 'In Progress', tasks: [] },
  { id: 3, title: 'Done', tasks: [] },
]);
const nextTaskId = ref(1);
const newColumnName = ref('');
const showAddColumn = ref(false);

const columnRefs = ref([]);

const setupDraggable = (columnRef, columnTasks, columnTitle) => {
  if (columnRef) {
    useDraggable(columnRef, columnTasks, {
      animation: 150,
      ghostClass: 'ghost',
      group: 'tasks',
      onUpdate: () => {
        console.log(`Update in column: ${columnTitle}`);
      },
      onAdd: () => {
        console.log(`Add to column: ${columnTitle}`);
      },
      onRemove: () => {
        console.log(`Remove from column: ${columnTitle}`);
      },
      forceFallback: true,
      fallbackClass: 'task-dragging',
      fallbackOnBody: true,
      dragClass: 'task-drag',
      // Ensure only one item is dragged at a time
      multiDrag: false,
      selectedClass: 'selected',
    });
  }
};

onMounted(() => {
  nextTick(() => {
    columns.value.forEach((column, index) => {
      setupDraggable(columnRefs.value[index], column.tasks, column.title);
    });
  });
});

const addColumn = () => {
  if (newColumnName.value.trim()) {
    const newColumn = {
      id: columns.value.length + 1,
      title: newColumnName.value.trim(),
      tasks: [],
    };
    columns.value.push(newColumn);
    newColumnName.value = '';
    showAddColumn.value = false;

    nextTick(() => {
      const newColumnIndex = columns.value.length - 1;
      setupDraggable(columnRefs.value[newColumnIndex], newColumn.tasks, newColumn.title);
    });
  }
};

const addTask = (column, taskName) => {
  if (taskName.trim()) {
    column.tasks.push({
      id: nextTaskId.value++,
      title: taskName.trim(),
    });
  }
};
</script>

<template>
  <ClientOnly>
    <div class="kanban-board flex h-full flex-col space-y-4 rounded-lg border border-border bg-card p-4 shadow-md sm:p-6 md:p-8">
      <h2 class="text-2xl font-bold text-foreground">Kanban Board</h2>
      <div class="grow overflow-x-auto overflow-y-hidden">
        <div class="flex h-full space-x-4 pb-4">
          <div v-for="(column, index) in columns" :key="column.id" class="w-72 shrink-0">
            <div class="flex h-full flex-col rounded-lg bg-muted p-4">
              <h3 class="mb-2 font-bold text-foreground">{{ column.title }}</h3>
              <div
                :ref="el => { if (el) columnRefs[index] = el }"
                class="grow space-y-2 overflow-y-auto"
              >
                <div
                  v-for="task in column.tasks"
                  :key="task.id"
                  class="task-item cursor-move rounded bg-card p-2 shadow"
                >
                  <p class="text-foreground">{{ task.title }}</p>
                </div>
              </div>
              <div class="mt-4">
                <form class="space-y-2" @submit.prevent="addTask(column, $event.target.newTaskName.value); $event.target.reset()">
                  <UiInput
                    name="newTaskName"
                    placeholder="New task name"
                    class="w-full"
                  />
                  <UiButton type="submit" class="w-full bg-primary text-primary-foreground">
                    Add Task
                  </UiButton>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Add Column section -->
          <div class="w-72 shrink-0">
            <div v-if="!showAddColumn" class="h-10">
              <UiButton class="size-full bg-primary text-primary-foreground" @click="showAddColumn = true">
                Add Column
              </UiButton>
            </div>
            <div v-else class="flex h-full flex-col rounded-lg bg-muted p-4">
              <form class="space-y-2" @submit.prevent="addColumn">
                <UiInput
                  v-model="newColumnName"
                  placeholder="New column name"
                  class="w-full"
                />
                <div class="flex space-x-2">
                  <UiButton type="submit" class="grow bg-primary text-primary-foreground">Add</UiButton>
                  <UiButton type="button" class="bg-secondary text-secondary-foreground" @click="showAddColumn = false">Cancel</UiButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.kanban-board {
  @apply select-none;
}

.ghost {
  @apply opacity-50 bg-primary/20;
}

.task-item {
  @apply transition-all duration-200 ease-in-out;
}

.task-dragging {
  @apply bg-muted/80 scale-105 z-50 shadow-lg border-2 border-primary;
  transform: scale(1.05);
}

.task-drag {
  @apply scale-105 border-2 border-primary;
}

.selected {
  @apply bg-accent;
}
</style>
