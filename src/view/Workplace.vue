<template>
	<div :style="{ background: '#fff', padding: '10px', minHeight: '440px' }">		
		<div class="todoapp">
			<div class="title">
				<h1>待办事项</h1>
				<input class="new-todo"
					autofocus
					autocomplete="off"
					placeholder="有什么想要做的?"
					@keyup.enter="addTodo">
			</div>

			<div class="main" v-show="todos.length">			
				<ul class="todo-list">
					<TodoItem
						v-for="(todo, index) in filteredTodos"
						:key="index"
						:todo="todo"
					/>
				</ul>
			</div>

			<footer class="footer" v-show="todos.length">
				<hr style="width: 90%; border-top: 4px solid forestgreen;" />
				<div class="todo-footer">
					<div class="todo-footer-title">
						<strong>未完成：</strong>
					</div>
					<div class="todo-footer-count">
						剩余 <strong>{{ remaining }}</strong> 项
					</div>
				</div>
				
				<div class="todo-footer">
					<span class="todo-footer-title">
						<strong>过滤选项：</strong>
					</span>
					<div class="todo-footer-count">
						<a-radio-group @change="optionsChange" v-model="options">
							<a-radio v-for="(val, key) in filters" v-bind:key="key" :value="key">
								{{ key | parse }}
							</a-radio>
						</a-radio-group>
<!-- 						<span v-for="(val, key) in filters" v-bind:key="key" class="todo-footer-item">
							<a :href="'#/' + key"
								:class="{ selected: visibility === key }"
								@click="visibility = key">{{ key | parse }}</a>
						</span> -->
					</div>
<!-- 					<ul class="filters">
						<li v-for="(val, key) in filters" v-bind:key="key">
							<a :href="'#/' + key"
								:class="{ selected: visibility === key }"
								@click="visibility = key">{{ key | parse }}</a>
						</li>
					</ul> -->
				</div>
			</footer>
		</div>
		
		<footer-tool-bar :style="{ width: '100%'}">
			<a-button class="todo-btn" type="danger" ghost :disabled="disableButton"
					@click="clearAll">清空</a-button>
      <a-button class="todo-btn" type="primary" :disabled="disableButton"
					@click="save">提交</a-button>
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
			disableButton: true,
			options: ''
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
    }
  },
		
	mounted: function () {
		const user = this.$store.state.user.info.username
		const date = dateFormat(new Date(), "yyyy-MM-dd")
		const { GetTodoInfo } = this
		GetTodoInfo({user, date}).then(res => {
			if(res.data.status == 200) {
				if(res.data.result && res.data.result.todos) {
					this.$store.commit('resetTodo', res.data.result.todos)
					this.disableButton = false
				}
			}
		}).catch(err => {
			console.log(err)
		})
	},
	
  methods: {
    ...mapActions([
      'toggleAll',
      'clear',
			'SaveTodo',
			'GetTodoInfo'
    ]),
		
		optionsChange () {
			this.visibility = this.options
		},
		
		clearAll() {
			const { clear } = this
			this.$confirm({
				title: '清空确认',
				content: '确定一定以及肯定要删除所有代办事项吗?',
				okText: '确定',
				cancelText: '取消',
				onOk() {
					return new Promise((resolve, reject) => {
						clear()
						this.disableButton = true
					}).catch((err) => {
						console.log(err)
					});
				},
				onCancel() {},
			});
		},
				
		save(e) {
			const { SaveTodo } = this
			this.visible = true;
			this.$confirm({
				title: '提交确认',
				content: '确定要提交吗?',
				okText: '确定',
				cancelText: '取消',
				onOk() {
					return new Promise((resolve, reject) => {
						const user = this.$store.state.user.info.username
						const date = dateFormat(new Date(), "yyyy-MM-dd")
						SaveTodo({user, date, todos: this.todos}).then(res => {
							if (res.data.status == 200)
								this.saveSuccess(res)
						})
						.catch(err => {
							this.saveFailed(err)
						})
					}).catch((err) => {
						console.log(err)
					});
				},
				onCancel() {},
			});
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
			if(this.todos.length > 0)
				this.disableButton = false
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
	width: 100%;
}

/* footer style **/
footer.footer {
	margin: 0;
	padding: 0;
	margin-top: 50px;
	font-size: 20px;
	font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
	text-align: left;
}

div.todo-footer {
	width: 90%;
	margin-left: 5%;
}

.todo-footer-title {
	display: inline-block;
	width: 15%;
}

.todo-footer-count {
	display: inline-block;
	width: 85%;
	height: 30px;
	line-height: 30px;
	text-align: left;
	font-weight: bold;
}

.todo-footer-count strong {
	color: red;
}

.todo-footer-item {
	
}

ul.filters {
	margin: 0;
	padding: 0;
	width: 50%;
	margin-left: 25%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	bottom: 0;
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

.todo-btn {
	margin-left: 10px;
}
</style>
