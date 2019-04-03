<template>
  <app-layout>
   <div slot="content">
      <h3 class="primary--text">Dashboard</h3>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from '../layouts/AppLayout'
export default {
  components: {
    AppLayout
  },
  data: () => ({
    dialog: false
  })
}
</script>

<style>

</style>
