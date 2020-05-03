<template>
  <li class="todo">
   <div class="view">
      <div class="item-out">
				<a-popover>
					<template slot="content">
						<p>{{ todo.remark | noEmpty }}</p>
					</template>
					<span v-show="!editing" class="item-in" :class="{'item-done': isDone}"
						 @click="dealItem(todo)">
						({{todo.index}}). {{todo.text}}
					</span>
				</a-popover>
				<input class="edit"
					v-show="editing"
					v-focus="editing"
					:value="todo.text"
					@keyup.enter="doneEdit"
					@keyup.esc="cancelEdit"
					@blur="doneEdit">
      </div>
			
			<!-- 操作按钮 -->
			<div class="item-operate">
				<a-icon class="icon" v-show="singleComment" type="snippets"  
						@mouseenter="enter(1)" />
				<a-tooltip placement="top">
					<template slot="title">
						<span>备注</span>
					</template>
					<a-icon class="icon" v-show="!singleComment" type="snippets" theme="filled"
							@mouseleave="leave(1)" @click="showModal" />
				</a-tooltip>
				<a-modal title="备注" v-model="visible" okText="确定" cancelText="取消"
					@ok="handleOk(todo)">
					<a-textarea v-model="comment" 
						placeholder="填写备注"
						:autoSize="{ minRows: 2, maxRows: 6 }"
					/>
				</a-modal>
				
				<a-icon class="icon" v-show="singleEdit" type="edit" 
						@mouseenter="enter(2)" />
				<a-tooltip placement="top">
					<template slot="title">
						<span>编辑</span>
					</template>
					<a-icon class="icon" v-show="!singleEdit" type="edit" theme="filled"
							@mouseleave="leave(2)" @click="editting(todo)" />
				</a-tooltip>
						
				<a-popconfirm
				    title="确定要删除这项任务?"
				    @confirm="confirm(todo)"
				    @cancel="cancel"
				    okText="确定"
				    cancelText="取消"
				  >
					<a-icon class="icon" v-show="singleDelete" type="delete" 
							@mouseenter="enter(3)" />
					<a-tooltip placement="top">
						<template slot="title">
							<span>删除</span>
						</template>
						<a-icon class="icon" v-show="!singleDelete" type="delete" theme="filled"
								@mouseleave="leave(3)"  />
					</a-tooltip>
				</a-popconfirm>
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
			isDone: false,
      editing: false,
			singleComment: true,
			singleEdit: true,
			singleDelete: true,
			visible: false,
			comment: ''
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
	
	mounted: function() {
		if (this.todo.done) {
			this.isDone = true
		} else {
			this.isDone = false
		}
	},
	
  methods: {
    ...mapActions([
      'editTodo',
      'toggleTodo',
      'removeTodo'
    ]),
		
		showModal() {
			this.visible = true;
		},
		
		handleOk(todo) {
			todo.remark = this.comment
			this.visible = false;
		},

		dealItem (todo) {
			todo.done = !todo.done
			this.isDone = !this.isDone;
		},
		
		enter (index) {
			if(index == 1){
				this.singleComment = false;
			} else if(index == 2){
				this.singleEdit = false;
			} else if(index == 3) {
				this.singleDelete = false;
			}
		},
		
		leave (index) {
			if(index == 1){
				this.singleComment = true;
			} else if(index == 2){
				this.singleEdit = true;
			} else if(index == 3) {
				this.singleDelete = true;
			}
		},
		
		editting () {
			this.editing = true
		},
		
		confirm(todo) {
			this.removeTodo(todo)
		},
		
		cancel(e) {
			console.log(e);
		},
		
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
  },
	
  filters: {
		noEmpty: value => {console.log(333, value)
			if(!value)
				return "暂无备注"
					
			return value
		}
	}
}
</script>

<style>
/* toto item style */
li.todo {
	width: 90%;
	margin: 10px 0;
	margin-left: 5%;
	list-style-type: none;
}

div.view {
	width: 100%;
	text-align: left;
}

.item-out {
	width: 80%;
	display: inline-block;
}

.item-in {
	cursor: pointer;
}

.item-in:hover {
	color: yellowgreen;
	cursor: pointer;
}

.item-done {
	text-decoration: line-through;
}

.item-operate {
	width: 20%;
	text-align: right;
	display: inline-block;
}

.icon {
	cursor: pointer;
	margin-left: 5px;
}

input.edit {
	border: 0;
	border-bottom: 4px solid #1890ff;
	margin-left: 5px;
	font-family: "courier new";
	font-size: 18px;
	outline:0;
}
	
</style>