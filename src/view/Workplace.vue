<template>
	<div :style="{ background: '#fff', padding: '10px', minHeight: '440px' }">
		
		<div class="todoapp">
			<div class="title">
				<h1>待办事项</h1>
				<input class="new-todo"
					autofocus
					autocomplete="off"
					placeholder="What needs to be done?"
					@keyup.enter="addTodo">
			</div>

			<div class="main" v-show="todos.length">
				<div>
					<div :style="{ borderBottom: '1px solid #E9E9E9' }">
						<a-checkbox
							@change="toggleAll(!allChecked)" 
							:checked="allChecked">
							全部
						</a-checkbox>
					</div>
					<br />
					<a-checkbox-group :options="todoOptions" v-model="checkList" @change="toggleTodo" />
				</div>				
<!-- 				<input class="toggle-all" id="toggle-all"
					type="checkbox"
					:checked="allChecked"
					@change="toggleAll(!allChecked)">
				<label for="toggle-all">全部</label>
				<ul class="todo-list">
					<TodoItem
						v-for="(todo, index) in filteredTodos"
						:key="index"
						:todo="todo"
					/>
				</ul> -->
			</div>

			<footer class="footer" v-show="todos.length">
				<span class="todo-count">
					<strong>{{ remaining }}</strong>
					{{ remaining | pluralize('item') }} left
				</span>
				<ul class="filters">
					<li v-for="(val, key) in filters" v-bind:key="key">
						<a-button type="primary" @click="visibility = key">{{ key | parse }}</a-button>
<!-- 						<a :href="'#/' + key"
							:class="{ selected: visibility === key }"
							@click="visibility = key">{{ key | capitalize }}</a> -->
					</li>
				</ul>
<!-- 				<a-button type="primary"
					v-show="todos.length > remaining"
					@click="clearCompleted">
					Clear Completed
				</a-button> -->
			</footer>
		</div>
		
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem.vue'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  components: { TodoItem },
	
  data () {
    return {
      visibility: 'all',
      filters: filters,
			checkList: []
    }
  },
	
  computed: {
    todos () {
      return this.$store.state.app.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    },
		todoOptions () {
			return this.todos.map(todo => todo.text)
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
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1),
		parse: value => {
			if(value == "active")
				return "未完成"
			else if(value == "completed")
				return "已完成"
			else
				return "全部"
		}
  }
}
</script>

<style scoped>

 .todoapp {
	margin: 0;
	padding: 0;
	font-family: 微软雅黑;
}

.title {
	margin: 10px 0;
	text-align: center;
}

.title h1 {
	font-size: 30px;
	letter-spacing: 10px;
}

input.new-todo {
	font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
	width: 90%;
	height: 30px;
	padding: 15px 10px;
	margin: 5px 5px;
	box-sizing: border-box;
  border: 4px solid #1890ff;
  border-radius: 6px;
	outline:0;
}

input.new-todo::placeholder {
	font-size: 1.2em;
	font-weight: bold;
}
/*
.main {
	font-family: "arial black";
	font-size: 24px;
}

input.toggle-all{
	text-align: left;
	margin-left: 10%;
}
input.toggle-all + label:hover {
	color: blue;
	cursor: pointer;
}

ul.todo-list {
	margin: 0;
	padding: 0;
	width: auto;
}

li.todo {
	width: 80%;
	margin: 10px 0;
	margin-left: 10%;
	list-style-type: none;
}

div.view {
	width: 100%;
	text-align: left;
}

div.item {
	width: 80%;
	display: inline-block;
}

input.toggle {
	margin-left: 0;
}

div.view label:hover {
	color: coral;
	cursor: pointer;
}

div.item-destroy {
	width: 20%;
	text-align: right;
	display: inline-block;
}

button.destroy {
	border: 0;
	position: relative;
	margin-left: 2px;
	background: #FFFFFF;
}

button.destroy::after {
	content: "\f00d";
	font-family: 'FontAwesome';
	cursor: pointer;
	font-size: 24px;
}

button.destroy:hover {
	background: #FF7F50;
}

input.edit {
	border: 0;
	border-bottom: 4px solid #0000FF;
	margin-left: 5px;
	font-family: "courier new";
	font-size: 18px;
	outline:0;
}

footer.footer {
	margin: 0;
	padding: 0;
	font-size: 20px;
	font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
	text-align: center;
}

span.todo-count {
	display: inline-block;
	width: 100%;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-weight: bold;
}

span.todo-count strong {
	color: red;
}

ul.filters {
	margin: 0;
	padding: 0;
	width: 50%;
	margin-left: 25%;
	display: flex;
	flex-direction: row;
	justify-content: center;
}

ul.filters li {
	list-style-type: none;
	height: 30px;
	width: 30%;
	line-height: 30px;
}

ul.filters li a {
	text-decoration: none;
}

ul.filters li a:hover {
	color: red;
	font-weight: bold;
}

button.clear-completed {
	font-size: 16px;
	border: 2px solid #1890ff;
	border-radius: 5px;
	height: 40px;
	background: #FFFFFF;
	color: rgba(0, 0, 0, 0.65);
}

button.clear-completed:hover {
	cursor: pointer;
	background: #1890ff;
	color: #FFFFFF;
} */ 
</style>
