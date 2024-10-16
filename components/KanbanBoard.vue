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
    <div class="h-full flex flex-col bg-card rounded-lg border border-border shadow-md p-4 sm:p-6 md:p-8 space-y-4 kanban-board">
      <h2 class="text-2xl font-bold text-foreground">Kanban Board</h2>
      <div class="flex-grow overflow-x-auto overflow-y-hidden">
        <div class="flex h-full space-x-4 pb-4">
          <div v-for="(column, index) in columns" :key="column.id" class="flex-shrink-0 w-72">
            <div class="bg-muted rounded-lg p-4 h-full flex flex-col">
              <h3 class="font-bold mb-2 text-foreground">{{ column.title }}</h3>
              <div
                :ref="el => { if (el) columnRefs[index] = el }"
                class="flex-grow overflow-y-auto space-y-2"
              >
                <div
                  v-for="task in column.tasks"
                  :key="task.id"
                  class="bg-card p-2 rounded shadow cursor-move task-item"
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
                  <UiButton type="submit" class="bg-primary text-primary-foreground w-full">
                    Add Task
                  </UiButton>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Add Column section -->
          <div class="flex-shrink-0 w-72">
            <div v-if="!showAddColumn" class="h-10">
              <UiButton class="bg-primary text-primary-foreground w-full h-full" @click="showAddColumn = true">
                Add Column
              </UiButton>
            </div>
            <div v-else class="bg-muted rounded-lg p-4 h-full flex flex-col">
              <form class="space-y-2" @submit.prevent="addColumn">
                <UiInput
                  v-model="newColumnName"
                  placeholder="New column name"
                  class="w-full"
                />
                <div class="flex space-x-2">
                  <UiButton type="submit" class="bg-primary text-primary-foreground flex-grow">Add</UiButton>
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

<style scoped>
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
