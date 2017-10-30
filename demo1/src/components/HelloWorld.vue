<template>
  <div class="hello">
    <p>{{ msg }}</p>
    <button v-on:click="increment">Click Count: {{ clickCount }}</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello World',
      clickCount: 0,
    }
  },
  methods: {
    increment() {
      this.clickCount++;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello[scoped] p{
  font-weight: bold;
}
</style>
