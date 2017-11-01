<template>
  <div>
      <div class="layout-padding">
        <div class="row gutter wrap justify-stretch content-center">
          <div class="col-3">
            <router-link :to="'/genre'">Genre</router-link>
          </div>
        </div>
        <div class="row gutter wrap justify-stretch content-center">
          <div class="col-8">
            <div class="row">
              <div class="col-3">
                <q-field
                  icon="book"
                  label="Select book"/>
              </div>
              <div class="col-8" ref="bookStore">
                  <div class="row gutter wrap justify-stretch content-center">
                    <div class="col-12" ref="bookQty">
                      <q-select
                        v-model="selectedBook"
                        filter
                        float-label="Books in stock"
                        filter-placeholder="book name"
                        :options="booksForSelection"
                      />
                    </div>
                </div>
                <div class="row gutter wrap justify-stretch content-center">
                  <div class="col-12" ref="rating">
                    <p class="caption">
                      <span>Rating</span>
                      <span style="padding: 1em;">
                        <q-knob
                           v-model="selectedBookDetail.ratings"
                           :min="0"
                           :max="100"
                           size="4em"
                           style="font-size: .5em; font-weight: bold;"
                           color="deep-orange-5"
                           readonly
                        >{{selectedBookDetail.ratings}}/100</q-knob>
                      </span>
                      <span>Stock: {{selectedBookDetail.availableStock}}</span>
                      <span v-if="selectedBookDetail.price">Price: ${{selectedBookDetail.price}}</span>
                      </span>
                    </p>
                    <p v-if="selectedBookDetail.availableStock">
                    Quantity: {{quantity}}<q-slider v-model="quantity" :min="0" :max="selectedBookDetail.availableStock" :step="1" :label-value="`${quantity}/${selectedBookDetail.availableStock}`" label snap markers :disable="!selectedBookDetail.availableStock"></q-slider>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-1 text-center">
                <a @click="addToCart" id="add-to-cart"><q-icon name="fa-plus" color="green" size="2em" style="padding: 0.5em"/></a>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div>
              <q-list highlight>
                <q-list-header>
                  <div class="row gutter wrap justify-between content-center">
                    <div class="col-4">
                      Cart
                    </div>
                    <div class="col-4" style="text-align: right">
                      <router-link :to="'/order'"><q-icon name="fa-shopping-cart" size="2em"/> Checkout</router-link>
                    </div>
                  </div>
                </q-list-header>
                <span v-for="book in cart">
                  <q-item>
                    <q-item-main>
                      <q-item-tile label class="bookInCart">{{book.bookname}}</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                      <div>
                        <span>@ ${{book.price}} x{{book.quantity}}</span>
                        <a @click="removeFromCart($event, book)" class="bookInCartRemoval"><q-item-tile icon="indeterminate_check_box" color="red" /></a>
                      </div>
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
import {QList, QListHeader, QItem, QItemMain, QItemTile, QItemSeparator, QItemSide, QSelect, QField, QIcon, QSlider, QChip, QKnob} from 'quasar-framework';
import * as R from 'ramda';

export default {
  name: 'Bookstore',
  computed: {
    selectedBook: {
      get(){
        return this.$store.state.bookStore.selectedBook
      },
      set(book){
        this.$store.dispatch('selectedBook', book)
      }
    },
    quantity: {
      get(){
        return this.$store.state.bookStore.quantity
      },
      set(quantity){
        this.$store.dispatch('changeQuantity', quantity)
      }
    },
    cart() {
      return this.$store.state.bookStore.cart
    },
    availableBooksByGenre(){
      return this.$store.state.bookStore.availableBooksByGenre;
    },
    selectedBookDetail(){


      if(!R.isEmpty(this.selectedBook) && R.find(R.propEq('bookname', this.selectedBook), this.availableBooksByGenre[this.$route.params.genre])){
        return R.find(R.propEq('bookname', this.selectedBook), this.availableBooksByGenre[this.$route.params.genre])
      }
      return {
        bookname: "No Book Selected",
        availableStock: 0,
        ratings: 0,
        price: 0
      }
    },
    booksForSelection(){
      var availableBooks = this.$store.getters.availableBooks(this.$route.params.genre, this.$route.query.contains);
      return R.map((it) => {
        return {
          label: it,
          value: it
        }
      }, R.filter((it) => !R.contains(it, R.map((cartItem) => cartItem.bookname, this.cart)), availableBooks));
    },
  },
  methods:{
    addToCart(){
      this.$store.dispatch('addToCart', {
        selectedBook: this.selectedBook,
        quantity: this.quantity,
        genre: this.$route.params.genre
      })
    },
    removeFromCart(event, book){
      this.$store.dispatch('removeFromCart', book)
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
    QIcon,
    QSlider,
    QChip,
    QKnob
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
