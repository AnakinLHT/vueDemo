<template>
  <div>
      <div class="layout-padding">
        <div class="row gutter wrap justify-stretch content-center">
          <div class="col-4">
            <div>
              <q-list highlight>
                <q-list-header>Genre</q-list-header>
                <span v-for="type in genre">
                  <q-item>
                    <q-item-main>
                      <q-item-tile label>
                          <router-link :to="{ name: 'selectBooks', params: { genre: type }}">{{type}}</router-link>
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item-separator />
              </span>
              </q-list>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {QList, QListHeader, QItem, QItemMain, QItemTile, QItemSeparator, QItemSide} from 'quasar-framework';
import * as R from 'ramda';

import availableBooksByGenre from '../books/availableBooksByGenre';

export default {
  name: 'Genre',
  computed: {
    genre(){
      return R.keys(availableBooksByGenre);
    }
  },
  components: {
    QList,
    QListHeader,
    QItem,
    QItemMain,
    QItemTile,
    QItemSeparator,
    QItemSide,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
