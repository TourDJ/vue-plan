<template>
	<div class="container">
	  <div class="box" :class="eleindex == i?'eleactive':''" v-for="(ele,i) in piclist" 
	  	:key="i" 
	  	@mouseenter="enter(i)" 
	  	@mouseleave="out(i)">
	    <div>
	    	<button>abc</button>
	    	<p v-for="con in ele.content">{{con}}</p>
	    </div>
	    <span>{{ele.month}}</span>
  	</div>	
	</div>
</template>

<script>
export default {
	data () {
    return {
      eleindex: 0,
      piclist: [
        {
        	month: "1月",
        	content:[
        		'经过第五章的洗礼之后，你应该可以在Linux的指令列模式底下输入指令了吧？ 接下来，当然是要让你好好的浏览一下Linux系统里面有哪些重要的文件啰。 不过，每个文件都有相当多的属性与权限，其中最重要的可能就是文件的拥有者的概念了。所以，在开始文件相关信息的介绍前，鸟哥先就简单的(1)使用者及(2)群组与(3)非本群组外的其他人等概念作个说明吧～ 好让你快点进入状况的哩！ ^_^'
        	]
        },
        {
        	month: "2月",
        	content:[
        		'经过第五章的洗礼之后，你应该可以在Linux的指令列模式底下输入指令了吧？ 接下来，当然是要让你好好的浏览一下Linux系统里面有哪些重要的文件啰。 不过，每个文件都有相当多的属性与权限，其中最重要的可能就是文件的拥有者的概念了。所以，在开始文件相关信息的介绍前，鸟哥先就简单的(1)使用者及(2)群组与(3)非本群组外的其他人等概念作个说明吧～ 好让你快点进入状况的哩！ ^_^',
        		'经过第五章的洗礼之后，你应该可以在Linux的指令列模式底下输入指令了吧？ 接下来，当然是要让你好好的浏览一下Linux系统里面有哪些重要的文件啰。 不过，每个文件都有相当多的属性与权限，其中最重要的可能就是文件的拥有者的概念了。所以，在开始文件相关信息的介绍前，鸟哥先就简单的(1)使用者及(2)群组与(3)非本群组外的其他人等概念作个说明吧～ 好让你快点进入状况的哩！ ^_^',
        		'经过第五章的洗礼之后，你应该可以在Linux的指令列模式底下输入指令了吧？ 接下来，当然是要让你好好的浏览一下Linux系统里面有哪些重要的文件啰。 不过，每个文件都有相当多的属性与权限，其中最重要的可能就是文件的拥有者的概念了。所以，在开始文件相关信息的介绍前，鸟哥先就简单的(1)使用者及(2)群组与(3)非本群组外的其他人等概念作个说明吧～ 好让你快点进入状况的哩！ ^_^',
        		'经过第五章的洗礼之后，你应该可以在Linux的指令列模式底下输入指令了吧？ 接下来，当然是要让你好好的浏览一下Linux系统里面有哪些重要的文件啰。 不过，每个文件都有相当多的属性与权限，其中最重要的可能就是文件的拥有者的概念了。所以，在开始文件相关信息的介绍前，鸟哥先就简单的(1)使用者及(2)群组与(3)非本群组外的其他人等概念作个说明吧～ 好让你快点进入状况的哩！ ^_^',
        		'经过第五章的洗礼之后，你应该可以在Linux的指令列模式底下输入指令了吧？ 接下来，当然是要让你好好的浏览一下Linux系统里面有哪些重要的文件啰。 不过，每个文件都有相当多的属性与权限，其中最重要的可能就是文件的拥有者的概念了。所以，在开始文件相关信息的介绍前，鸟哥先就简单的(1)使用者及(2)群组与(3)非本群组外的其他人等概念作个说明吧～ 好让你快点进入状况的哩！ ^_^',
        		'经过第五章的洗礼之后，你应该可以在Linux的指令列模式底下输入指令了吧？ 接下来，当然是要让你好好的浏览一下Linux系统里面有哪些重要的文件啰。 不过，每个文件都有相当多的属性与权限，其中最重要的可能就是文件的拥有者的概念了。所以，在开始文件相关信息的介绍前，鸟哥先就简单的(1)使用者及(2)群组与(3)非本群组外的其他人等概念作个说明吧～ 好让你快点进入状况的哩！ ^_^',
        		'经过第五章的洗礼之后，你应该可以在Linux的指令列模式底下输入指令了吧？ 接下来，当然是要让你好好的浏览一下Linux系统里面有哪些重要的文件啰。 不过，每个文件都有相当多的属性与权限，其中最重要的可能就是文件的拥有者的概念了。所以，在开始文件相关信息的介绍前，鸟哥先就简单的(1)使用者及(2)群组与(3)非本群组外的其他人等概念作个说明吧～ 好让你快点进入状况的哩！ ^_^'	
        	]
        },
        {
        	month: "3月",
        	content:[

        	]
        },
        {
        	month: "4月",
        	content:[

        	]
        },
        {
        	month: "5月",
        	content:[

        	]
        },
        {
        	month: "6月",
        	content:[

        	]
        },
        {
        	month: "7月",
        	content:[

        	]
        },
        {
        	month: "8月",
        	content:[

        	]
        },
        {
        	month: "9月",
        	content:[

        	]
        },
        {
        	month: "10月",
        	content:[

        	]
        },
        {
        	month: "11月",
        	content:[

        	]
        },
        {
        	month: "12月",
        	content:[

        	]
        }
      ]
    }
  },

  methods: {
  	enter: function (i) {
      console.log(i)
      this.eleindex = i
      // if (this.eleindex === i) {
      //   this.eleindex = -1
      // } else {
      //   this.eleindex = i
      // }
    },
    out: function (i) {
      this.imgindex = -1
    }
  }
}
</script>

<style>
	/*手风琴样式*/
	.container {
	  display: flex;
	  width: 100%;
	  height: 80vh;
	  padding: 4% 2%;
	  box-sizing: border-box;
	}

	.box {
	  flex: 1;
	  overflow: scroll;
	  transition: .5s;
	  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
	}

	.box > div {
	  width: 100%;
	  height: calc(100% - 10vh);
	  -o-object-fit: cover;
	  object-fit: cover;
	  transition: .5s;
	}

	.box > span {
	  font-size: 3.8vh;
	  display: block;
	  text-align: center;
	  height: 10vh;
	  line-height: 2.6;
	}

	.eleactive {
	  flex: 1 1 80%;
	}

	.eleactive > aa {
	  width: 100%;
	  height: 100%;
	}	
</style>
