<template>
  <div class="container">
    <div>
      <p>{{ info }}</p>
    </div>
    <button @click='getInfo'>get</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      info :'init'
    }
  },
  // methods: {
  //   async getIp() {
  //     this.info = await this.$axios.$get('http://icanhazip.com')
  //   }
  // }
  methods: {
    async getInfo() {
      this.info = await this.$axios.$get('/api/hello')
      console.log(this.info)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
