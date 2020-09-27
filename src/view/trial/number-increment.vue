<template>
	<div class="animate">
		<h1>This is an animate page</h1>

		<p class="countRunning" v-countRunning :data-target='target'>0</p>

		<div class="countRunning">{{numTween}}</div>
	</div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'

export default {
	
	components: {
		
	},
	data() {
		return {
			target: 4254,
			num: 0,
            numTween: 0
		}
	},
    watch: {
        num (newValue, oldValue) {
            new TWEEN.Tween({
                number: oldValue
            })
            .to({
                number: newValue
            }, 1000)
            .onUpdate(tween => {
                this.numTween = tween.number.toFixed(0)
            })
            .start()
            function animate() {
                    if (TWEEN.update()) {
                            requestAnimationFrame(animate);
                    }
            }
            animate()
        }
    },
    mounted: function () {
	  this.num = this.target
	},
	methods: {

	},
	directives: {
		countRunning: {
			bind(el, binding, vnode, oldVnode) {
		        var timer = null;
		        const targetDomCount = el.getAttribute('data-target'); //data-target为目标值
		        let nowCount = parseInt(el.innerHTML); //当前页面显示值
		        timer = setInterval(() => {
		            if (nowCount < targetDomCount) {
		                nowCount++;
		            } else {
		                clearInterval(timer);
		                timer = null;
		            }
		            el.innerHTML = nowCount;
		        }, 1);
		    }
		}
	}
}
</script>


<style>
	.countRunning {
		font-size: 44px;
		font-weight: bold;
	}
</style>
