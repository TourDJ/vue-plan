<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
   <div class="view">
      <div class="item-out">
				<span v-show="!editing" class="item-in" :class="{'item-done': itemDo}"
					 @click="dealItem(todo)">
					【{{todo.index}}】. {{todo.text}}
				</span>
				<input class="edit"
					v-show="editing"
					v-focus="editing"
					:value="todo.text"
					@keyup.enter="doneEdit"
					@keyup.esc="cancelEdit"
					@blur="doneEdit">
      </div>
			<div class="item-operate">
				<a-icon class="icon" v-show="singleEdit" type="edit" 
						@mouseenter="enter(1)" />
				<a-icon class="icon" v-show="!singleEdit" type="edit" theme="twoTone" 
						@mouseleave="leave(1)" @click="editting(todo)" />
				<a-popconfirm
				    title="Are you sure delete this task?"
				    @confirm="confirm(todo)"
				    @cancel="cancel"
				    okText="Yes"
				    cancelText="No"
				  >
					<a-icon class="icon" v-show="singleDelete" type="delete" 
							@mouseenter="enter(2)" />
					<a-icon class="icon" v-show="!singleDelete" type="delete" theme="twoTone"
							@mouseleave="leave(2)"  />
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
			itemDo: false,
      editing: false,
			singleEdit: true,
			singleDelete: true
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
		
		dealItem (todo) {
			todo.done = !todo.done
			this.itemDo = !this.itemDo;
		},
		
		enter (index) {
			if(index == 1){
				this.singleEdit = false;
			} else if(index == 2) {
				this.singleDelete = false;
			}
		},
		
		leave (index) {
			if(index == 1){
				this.singleEdit = true;
			} else if(index == 2) {
				this.singleDelete = true;
			}
		},
		
		editting () {
			this.editing = true
		},
		
		confirm(todo) {
			this.$message.success('Click on Yes');
			this.removeTodo(todo)
		},
		
		cancel(e) {
			console.log(e);
			this.$message.error('Click on No');
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
  }
}
</script>

<style>
/* toto item style */
li.todo {
	width: 100%;
	margin: 10px 0;
	margin-left: 10%;
	list-style-type: none;
}

div.view {
	width: 90%;
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
	margin-right: 5px;
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