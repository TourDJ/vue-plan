<template>
  <div>
  	<div style="text-align:center;margin-bottom:40px;">
  		<a-input	style="width: 80%;margin-right:20px;"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
      <a-button type="primary" html-type="submit">
        Log in
      </a-button>
  	</div>

  	<div style="text-align:left;">
	    <a-button class="editable-add-btn" type="primary" @click="addHandler">
	      Add
	    </a-button>

	    <a-table bordered :data-source="dataSource" :columns="columns">
	      <template #name="text, record">
	        <editable-cell :text="text" @change="cellHandler(record.key, 'name', $event)" />
	      </template>
	      <template #operation="text, record">
	        <a-popconfirm
	          v-if="dataSource.length"
	          title="Sure to delete?"
	          @confirm="() => deleteHandler(record.key)" >
	          <a href="javascript:;">Delete</a>
	        </a-popconfirm>
	      </template>
	    </a-table>
	  </div>
  </div>	
</template>

<script>
import EditableCell from './EditableCell.vue'

export default {
  components: {
    EditableCell,
  },

	data() {
    return {

      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
        },
      ],
      count: 2,
      columns: [
        {
          title: 'name',
          dataIndex: 'name',
          width: '30%',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'age',
          dataIndex: 'age',
        },
        {
          title: 'address',
          dataIndex: 'address',
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },

  methods: {
    cellHandler(key, dataIndex, value) {
    	console.log(key)
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },

    deleteHandler(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },

    addHandler() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`,
      };
      this.dataSource = [newData, ...dataSource];
      this.count = count + 1;
    },
  },
}
	
</script>


<style>
.editable-add-btn {
  margin-bottom: 8px;
}
</style>
