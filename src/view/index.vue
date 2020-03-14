<template>
	<div>
		<Top>
			<template v-slot:prefix>
				你好
			</template>
			
			<template v-slot:suffix>
				，欢迎您
			</template>
		</Top>
		
		<section class="todoapp">
			<!-- header -->
			<header class="header">
				<h1>待办事项</h1>
				<input class="new-todo"
					autofocus
					autocomplete="off"
					placeholder="What needs to be done?"
					@keyup.enter="addTodo">
			</header>

			<!-- main section -->
			<section class="main" v-show="todos.length">
				<input class="toggle-all" id="toggle-all"
					type="checkbox"
					:checked="allChecked"
					@change="toggleAll(!allChecked)">
				<label for="toggle-all">All</label>
				<ul class="todo-list">
					<TodoItem
						v-for="(todo, index) in filteredTodos"
						:key="index"
						:todo="todo"
					/>
				</ul>
			</section>

			<!-- footer -->
			<footer class="footer" v-show="todos.length">
				<span class="todo-count">
					<strong>{{ remaining }}</strong>
					{{ remaining | pluralize('item') }} left
				</span>
				<ul class="filters">
					<li v-for="(val, key) in filters" v-bind:key="key">
						<a :href="'#/' + key"
							:class="{ selected: visibility === key }"
							@click="visibility = key">{{ key | capitalize }}</a>
					</li>
				</ul>
				<button class="clear-completed"
					v-show="todos.length > remaining"
					@click="clearCompleted">
					Clear Completed
				</button>
			</footer>
		</section>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import TodoItem from './TodoItem.vue'
import Top from '../components/Top.vue'
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
export default {
  components: { TodoItem, Top },
	
  data () {
    return {
      visibility: 'all',
      filters: filters
    }
  },
	
  computed: {
    todos () {
      return this.$store.state.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
	
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted'
    ]),
    addTodo (e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.dispatch('addTodo', text)
      }
      e.target.value = ''
    }
  },
  filters: {
    pluralize: (n, w) => n === 1 || n === 0 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>

<style scoped>
  @import '../app.css';
</style>
