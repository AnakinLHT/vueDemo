<template>
  <div id="app">
    <ComputedName/>
  </div>
</template>

<script>
import ComputedName from './components/ComputedName'

export default {
  name: 'app',
  components: {
    ComputedName
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
