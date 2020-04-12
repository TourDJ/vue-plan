<template>
  <a-layout :class="['layout']">
      <!-- layout header -->
<!--      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      /> -->
			<a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', padding: '0' }">
				<global-header />
      </a-layout-header>

      <a-layout :style="{ height: '100%', margin: '24px 24px 0', paddingTop: '64px'}">
        <a-layout-sider v-if="visible" width="300" style="background: #fff">
					<div :style="{padding: '4px', fontSize: '20px'}">
						<a-icon type="menu-fold" @click="onCollapse"/>
						<a-divider type="vertical" />
						<a-button type="link">今日事项</a-button>
					</div>
					<a-divider>日期选择</a-divider>
					<div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
						<a-calendar :fullscreen="false" @panelChange="onPanelChange" />
					</div>
				</a-layout-sider>
				<a-layout-sider v-if="!visible" width="30" style="background: #fff">
					<div :style="{padding: '4px', fontSize: '20px'}">
						<a-icon type="menu-unfold"  @click="onCollapse"/>
						<a-icon type="home" />
					</div>
				</a-layout-sider>
				
				<!-- layout content -->
				<a-layout-content 
					:style="{ height: '100%', margin: '0 10px 0 0px'}"
					>
					<div style="background: #FFF">
						<transition name="page-transition">
							<router-view />
						</transition>	
					</div>
				</a-layout-content>
			</a-layout>
			

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>
			
  </a-layout>

</template>

<script>
import { mapState, mapActions } from 'vuex'
// import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
// import { convertRoutes } from '@/utils/routeConvert'
export default {
  name: 'BasicLayout',
  // mixins: [mixin, mixinDevice],
  components: {
    GlobalHeader,
    GlobalFooter
  },
  data () {
    return {
      production: config.production,
      collapsed: false,
      menus: [],
			visible: true,
			text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
			activeKey: ['1'],
    }
  },
	watch: {
		activeKey(key) {
			console.log(key);
		},
	},
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft () {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      return '80px'
    }
  },
  created () {
    // const routes = convertRoutes(this.mainMenu.find(item => item.path === '/'))
    // this.menus = (routes && routes.children) || []
  },
  mounted () {
  },
  methods: {
		onPanelChange(value, mode) {
			console.log(value, mode);
		},
		onCollapse(value) {
			this.visible = !this.visible
			this.collapsed = !this.collapsed
		},
  }
}
</script>

<style lang="less">
/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */
.page-transition-enter {
  opacity: 0;
}
.page-transition-leave-active {
  opacity: 0;
}
.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>