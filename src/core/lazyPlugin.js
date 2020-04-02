import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

Vue.use(VueStorage, config.storageOptions)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')