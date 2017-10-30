<template>
  <div id="app">
    <q-layout :left-class="{'bg-primary': true}">
      <q-toolbar slot="header">
        <q-toolbar-title>
          Bookstore
          <span slot="subtitle">Get your favorite book</span>
        </q-toolbar-title>
      </q-toolbar>
      <Bookstore/>
    </q-layout>
  </div>
</template>

<script>
import {QLayout, QToolbarTitle, QToolbar} from 'quasar-framework';
import Bookstore from './components/Bookstore'

export default {
  name: 'app',
  components: {
    Bookstore,
    QLayout,
    QToolbarTitle,
    QToolbar
  }
}
</script>
