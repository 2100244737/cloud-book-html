<template>
    <div>
    <router-view/>
    <SwTabbar />
    </div>
</template>

<script>
import SwTabbar from '@/components/tab-bar'
export default {
  name: 'layout',
  components: {
    SwTabbar
  }
}
</script>

<style scoped>

</style>
