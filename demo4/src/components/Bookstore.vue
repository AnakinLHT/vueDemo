<template>
  <div>
      <div class="layout-padding">
        <div class="row gutter wrap justify-stretch content-center">
          <div class="col-8">
            <div class="row">
              <div class="col-3">
                genre {{$route.params.genre}}
                <q-field
                  icon="book"
                  label="Select book"/>
              </div>
              <div class="col-8" ref="bookStore">
                <q-select
                  v-model="selectedBook"
                  filter
                  float-label="Click the chevron icon to add to cart"
                  filter-placeholder="book name"
                  :options="booksForSelection"
                />
              </div>
              <div class="col-1 text-center">
                <a @click="addToCart" id="add-to-cart"><q-icon name="chevron_right" color="green" size="4em"/></a>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div>
              <q-list highlight>
                <q-list-header>Cart</q-list-header>
                <span v-for="book in cart">
                  <q-item>
                    <q-item-main>
                      <q-item-tile label class="bookInCart">{{book}}</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                      <a @click="removeFromCart($event, book)" class="bookInCartRemoval"><q-item-tile icon="indeterminate_check_box" color="red" /></a>
                    </q-item-side>
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
import {QList, QListHeader, QItem, QItemMain, QItemTile, QItemSeparator, QItemSide, QSelect, QField, QIcon} from 'quasar-framework';
import * as R from 'ramda';

import availableBooksByGenre from '../books/availableBooksByGenre';

export default {
  name: 'Bookstore',
  computed: {
    booksForSelection(){
      var cart = this.cart;
      var availableBooks = this.availableBooks;
      return R.map((it) => {
        return {
          label: it,
          value: it
        }
      }, R.filter((it) => !R.contains(it, cart), availableBooks));
    },
    availableBooks(){
      if(availableBooksByGenre[this.$route.params.genre]){
          if(this.$route.query.contains){
            if(Array.isArray(this.$route.query.contains)){
              const keywordsInLowerCase = R.map((it) => it.toLowerCase(), this.$route.query.contains);
              return R.filter(
                (book)=> R.reduce(R.and, true,
                    R.map(
                      (keyword) => book.toLowerCase().includes(keyword)
                    , keywordsInLowerCase)
                )
              , availableBooksByGenre[this.$route.params.genre])
            }
            return R.filter((it)=>it.toLowerCase().includes(this.$route.query.contains.toLowerCase()), availableBooksByGenre[this.$route.params.genre])
          }
        return availableBooksByGenre[this.$route.params.genre];
      }
      return [];
    }
  },
  data () {
    return {
      cart: [],
      selectedBook: '',
    }
  },
  methods:{
    addToCart(){
      if(R.isEmpty(this.selectedBook)){
        return;
      }
      this.cart.push(this.selectedBook);
    },
    removeFromCart(event, book){
      this.cart = R.reject((it) => it === book, this.cart);
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
    QSelect,
    QField,
    QIcon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h3{
  font-weight: normal;
  margin: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.order {
  display: flex;
  flex-direction:column;
}
</style>
