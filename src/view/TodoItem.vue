<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <div class="item">
		<input class="toggle"
			type="checkbox"
			:checked="todo.done"
			@change="toggleTodo(todo)">
		<label v-text="todo.text" 
			@click="todo.done = !todo.done"
			@dblclick="editing = true"></label>
		<input class="edit"
		  v-show="editing"
		  v-focus="editing"
		  :value="todo.text"
		  @keyup.enter="doneEdit"
		  @keyup.esc="cancelEdit"
		  @blur="doneEdit">
      </div>
	  <div class="item-destroy">
		<button class="destroy" @click="removeTodo(todo)"></button>
	  </div>
    </div>
  </li>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Todo',
  props: ['todo'],
  data () {
    return {
      editing: false
    }
  },
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'editTodo',
      'toggleTodo',
      'removeTodo'
    ]),
    doneEdit (e) {
      const value = e.target.value.trim()
      const { todo } = this
	  console.log(todo)
      if (!value) {
        this.removeTodo(todo)
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit (e) {
      e.target.value = this.todo.text
      this.editing = false
    }
  }
}
</script>
