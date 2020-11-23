<template>
  <div>
    <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
    <a-tree
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="treeData"
      @expand="onExpand"
    >
      <template slot="title" slot-scope="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div>
</template>

<script>
const x = 3;
const y = 2;
const z = 1;
const gData = [];
const treeData = [
  {
    title: '研发部',
    key: '1',
    children: [
      {
        title: '前端开发',
        key: '1-1',
        children: [
          { title: 'javascript', key: '1-1-1' },
          { title: 'vue', key: '1-1-2' },
        ],
      },
      {
        title: '后端开发',
        key: '1-2',
        children: [
          { key: '1-2-1', title: 'java' },
          { key: '1-2-2', title: 'php' }
        ],
      },
    ],
  }
];

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    const title = node.title
    dataList.push({ key, title });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(treeData);
console.log(dataList)
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
export default {
  data() {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: false,
      treeData,
    };
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      const value = e.target.value;
      if (value) {
          const expandedKeys = dataList
          .map(item => {
            if (item.title.indexOf(value) > -1) {
              return getParentKey(item.key, treeData);
            }
            return null;
          })
          .filter((item, i, self) => item && self.indexOf(item) === i);
        Object.assign(this, {
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
        });
      } else {
        Object.assign(this, {
          expandedKeys: [],
          searchValue: value,
          autoExpandParent: false,
        });
      }
    },
  },
};
</script>
