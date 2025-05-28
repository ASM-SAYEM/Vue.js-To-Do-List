const { createApp, reactive, watch } = Vue

createApp({
  setup() {
    const state = reactive({
      newTask: '',
      tasks: JSON.parse(localStorage.getItem('vue-tasks')) || [],
      isColored: false 
    })
    
  

    function addTask() {
      if (state.newTask.trim()) {
        state.tasks.push({
          text: state.newTask.trim(),
          completed: false,
          editing: false,
          count: 0  ,
          createdAt: new Date().toLocaleString()
       
        })
        state.newTask = ''
      }
    }

    function deleteTask(index) {
      state.tasks.splice(index, 1)
    }

    function editTask(index) {
      state.tasks[index].editing = true,
      state.tasks[index].count++
    }

    function saveTask(index) {
      state.tasks[index].editing = false
    }
 
   function clearTask() {
   state.tasks = state.tasks.filter(task => !task.completed)
   }
   
   function SortTask()
   {
        state.tasks.sort((a, b) => a.completed - b.completed)
   }

   
    
   function ChangeTitleColor() {
      state.isColored = !state.isColored 
    }

   watch(
      () => state.tasks,
      (newVal) => {
        localStorage.setItem('vue-tasks', JSON.stringify(newVal))
      },
      { deep: true }
    )
    
    

    return {
      ...Vue.toRefs(state),
      addTask,
      deleteTask,
      editTask,
      saveTask,
      clearTask,
      SortTask,
      ChangeTitleColor
    }
  }
}).mount('#app')
