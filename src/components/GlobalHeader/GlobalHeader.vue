<template>
  <transition name="showHeader">
		<div :class="['top-nav-header-index', theme]">
			<div class="header-index-wide">
				<div class="header-index-left">
					<logo class="top-nav-header"/>
					<!-- <s-menu mode="horizontal" :menu="menus" :theme="theme" /> -->
				</div>
				<user-menu class="header-index-right"></user-menu>
			</div>
		</div>
  </transition>
</template>

<script>
import UserMenu from '../UserMenu'
import SMenu from '../Menu'
import Logo from '../Logo'

export default {
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo
  },
  props: {
    // mode: {
    //   type: String,
    //   // sidemenu, topmenu
    //   default: 'sidemenu'
    // },
    // menus: {
    //   type: Array,
    //   required: true
    // },
    // theme: {
    //   type: String,
    //   required: false,
    //   default: 'light'
    // }
  },
  data () {
    return {
      visible: true,
      oldScrollTop: 0,
			theme: 'light'
    }
  },
  mounted () {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    handleScroll () {
      if (!this.autoHideHeader) {
        return
      }
      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    toggle () {
      this.$emit('toggle')
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less">
@import '../index.less';
.header-animat{
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter, .showHeader-leave-to {
  opacity: 0;
}
</style>