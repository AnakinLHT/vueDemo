<template>
  <div>
      <div class="layout-padding">
        <div class="row gutter wrap justify-stretch content-center">
          <div class="col-4">
            <router-link :to="'/genre'">Genre</router-link>
          </div>
        </div>
        <div class="row gutter wrap justify-stretch content-center">
          <div class="col-4">
            <div>
              <q-list highlight>
                <q-list-header>Checkout</q-list-header>
                <span v-for="book in cart">
                  <q-item>
                    <q-item-main>
                      <q-item-tile label class="bookInCart">{{book.bookname}}</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                      <div>
                        <span>@ ${{book.price}} x{{book.quantity}}</span>
                      </div>
                    </q-item-side>
                    <q-item-side right>
                      <div>
                        <span>${{book.price * book.quantity}}</span>
                      </div>
                    </q-item-side>
                  </q-item>
                </span>
                <span>
                  <q-item>
                    <q-item-main>
                      <q-item-tile label style="font-weight: bold">Total: </q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                      <div>
                        <span>${{totalPrice}}</span>
                      </div>
                    </q-item-side>
                  </q-item>
                </span>
                <q-item-separator inset/>
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

export default {
  name: 'Order',
  computed: {
    totalPrice() {
      if(this.cart && this.cart.length){
        return R.sum(R.map((it) => it.price * it.quantity, this.cart))
      }
      return 0
    },
    cart() {
      return this.$store.state.bookStore.cart
    },
    availableBooksByGenre(){
      return this.$store.state.bookStore.availableBooksByGenre;
    },
    genre(){
      return R.keys(this.availableBooksByGenre);
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
