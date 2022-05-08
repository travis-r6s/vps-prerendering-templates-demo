<template>
  <div>
    <p>Posts template!</p>
    <br>
    <h1>{{ data.title }}</h1>
    <a href="">{{ data.slug }}</a>
    <br>
    <div v-if="data.content" v-html="data.content"></div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const data = inject('page-data')
</script>


<page-query>
query Post ($id: ID!) {
  post (id: $id) {
    id
    title
    slug
    content
  }
}
</page-query>

<style>
h1 {
  color: tomato;
}
</style>
