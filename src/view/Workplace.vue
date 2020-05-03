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
<!-- 				<input class="toggle-all" id="toggle-all"
					type="checkbox"
					:checked="allChecked"
					@change="toggleAll(!allChecked)">
				<label for="toggle-all">全部</label> -->
				<ul class="todo-list">
					<TodoItem
						v-for="(todo, index) in filteredTodos"
						:key="index"
						:todo="todo"
					/>
				</ul>
			</div>

			<footer class="footer" v-show="todos.length">
				<span class="todo-count">
					剩余 <strong>{{ remaining }}</strong> 项
					<!-- {{ remaining | pluralize('item') }} left -->
				</span>
				<ul class="filters">
					<li v-for="(val, key) in filters" v-bind:key="key">
						<!-- <a-button type="primary" @click="visibility = key">{{ key | parse }}</a-button> -->
						<a :href="'#/' + key"
							:class="{ selected: visibility === key }"
							@click="visibility = key">{{ key | parse }}</a>
					</li>
				</ul>
<!-- 				<a-button type="primary"
					v-show="todos.length > remaining"
					@click="clearCompleted">
					Clear Completed
				</a-button> -->
			</footer>
		</div>
		
		<footer-tool-bar :style="{ width: '100%'}">
      <a-button type="primary" @click="save">提交</a-button>
			<a-modal title="Basic Modal" v-model="visible" @ok="handleOk">
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</a-modal>
    </footer-tool-bar>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem.vue'
import FooterToolBar from '@/components/FooterToolbar'
import { dateFormat } from '@/utils/util'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  components: { TodoItem, FooterToolBar },
	
  data () {
    return {
      visibility: 'all',
      filters: filters,
			checkList: [],
			visible: false,
    }
  },
	
  computed: {
    todos () {
      return this.$store.state.app.todos
    },
		index () {
			return this.todos.length
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
		
	mounted: function () {
		const user = this.$store.state.user.info.username
		const date = dateFormat(new Date(), "yyyy-MM-dd")
		console.log('111',user)
		console.log(date)
		const { GetTodoInfo } = this
		GetTodoInfo({user, date}).then(res => {
			console.log(res)
			if(res.data.status == 200) {
				if(res.data.result && res.data.result.todos) {
					this.$store.commit('resetTodo', res.data.result.todos)
				}
			}
		})
	},
	
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted',
			'SaveTodo',
			'GetTodoInfo'
    ]),
		
		handleOk(e) {
			const { SaveTodo } = this
			const user = this.$store.state.user.info.username
			const date = dateFormat(new Date(), "yyyy-MM-dd")
			SaveTodo({user, date, todos: this.todos}).then(res => {
				if (res.data.status == 200)
					this.saveSuccess(res)
			})
			.catch(err => {
				this.saveFailed(err)
			})
			this.visible = false;
		},
				
		save(e) {
			this.visible = true;
		},
		
    saveSuccess (res) {
      // console.log(res)
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '信息',
          description: `操作成功`
        })
      }, 500)
    },
		
    saveFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    },
		
    addTodo (e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.dispatch('addTodo', {text, index: this.index + 1})
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

<style>

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

.main {
	font-size: 24px;
}

ul.todo-list {
	margin: 0;
	padding: 0;
	width: 90%;
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
}
</style>
