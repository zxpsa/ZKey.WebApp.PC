<template>
  <page-header-wrapper>
    <router-view />
  </page-header-wrapper>
</template>

<script>
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
export default {
  name: 'PageView',
  components:{
    PageHeaderWrapper
  }
}
</script>
