import availableBooksByGenre from '../../books/availableBooksByGenre';
import * as R from 'ramda';

const bookStoreModule = {
  state: {
    availableBooksByGenre: availableBooksByGenre,
    cart: [],
    selectedBook: '',
    quantity: 0
  },
  mutations: {
    selectBook(state, book){
      state.selectedBook = book;
    },
    changeQuantity(state, quantity){
      state.quantity = quantity;
    },
    addToCart(state, {selectedBook, quantity, genre}){
      const maybeExistingOrder = R.find((it) => it.bookname == selectedBook, state.cart);
      if(maybeExistingOrder){
        state.cart = R.reject((it) => it === maybeExistingOrder, state.cart);
      }

      state.cart.push(
        {
          bookname: selectedBook,
          quantity: quantity,
          price: R.find(R.propEq('bookname', state.selectedBook), state.availableBooksByGenre[genre]).price
        }
      );
    },
    removeFromCart(state, book){
      state.cart = R.reject((it) => it === book, state.cart);
    },
  },
  actions: {
    selectedBook({commit}, book){
      commit('selectBook', book)
      commit('changeQuantity', 0)
    },
    changeQuantity({commit}, quantity){
      commit('changeQuantity', quantity)
    },
    addToCart({commit}, payload){
      if(R.isEmpty(payload.selectedBook) || payload.quantity==0){
        return;
      }
      commit('addToCart', payload)
      commit('selectBook', "")
      commit('changeQuantity', 0)
    },
    removeFromCart({commit}, book){
      commit('removeFromCart', book)
    }
  },
  getters: {
    availableBooks: (state) => {
      return (genre, keywords) => {
          if(state.availableBooksByGenre[genre]){
              if(keywords){
                if(Array.isArray(keywords)){
                  const keywordsInLowerCase = R.map((it) => it.toLowerCase(), keywords);
                  return R.filter(
                    (book)=> R.reduce(R.and, true,
                        R.map(
                          (keyword) => book.toLowerCase().includes(keyword)
                        , keywordsInLowerCase)
                    )
                  , R.map((it)=> it.bookname, state.availableBooksByGenre[genre]))
                }
                return R.filter((it)=>it.toLowerCase().includes(keywords.toLowerCase()), R.map((it)=> it.bookname, state.availableBooksByGenre[genre]))
              }
            return R.map((it)=> it.bookname, state.availableBooksByGenre[genre]);
          }
          return [];
        }
      },
  }
}

export default bookStoreModule;
