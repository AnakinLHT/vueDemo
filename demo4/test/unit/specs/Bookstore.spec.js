import Vue from 'vue'
import Quasar from 'quasar-framework'
import { mount } from 'vue-test-utils';
import { expect } from 'chai';
import Bookstore from '@/components/Bookstore'
import * as R from 'ramda';

Vue.use(Quasar)

const __THEME = 'mat';

describe('Bookstore.vue', () => {

  const bookSelectionOptionsSelector = '.q-popover .q-list .q-item-label';
  const anotherBookSelectionOptionsSelector = '.q-item-label';
  const bookInCartSelector = '.bookInCart';
  const bookInCartRemovalButtonSelector = '.bookInCartRemoval';
  const addToCartButtonSelector = '#add-to-cart';

  it('should can select book - vanillia Vue', (done) => {
    const BookstoreConstructor = Vue.extend(Bookstore)
    const vm = new BookstoreConstructor({
      data: function(){
        return {
          cart: [],
          availableBooks: [
              "Book A",
              "Book B"
            ],
          selectedBook: ''
        };
      }
    }).$mount()

    expect(R.map((it) => it.textContent, vm.$el.querySelectorAll(bookSelectionOptionsSelector))).to.deep.equal(['Book A', 'Book B'])

    vm.$children[1].$emit('input', 'Book A')
    vm.$el.querySelector(addToCartButtonSelector).click()


    Vue.nextTick(() => {
      try{
        const bookSelector = vm.$children[1].$children[0]
        bookSelector.$el.click()
        var bookSelectionOptions = bookSelector.$children;
        expect(bookSelectionOptions).to.have.lengthOf(1)
        expect(bookSelectionOptions[0].$el.querySelector(anotherBookSelectionOptionsSelector).textContent).to.equal('Book B')
        vm.$el.querySelector(bookInCartRemovalButtonSelector).click()
        Vue.nextTick(() => {
          try{
            expect(R.map((it) => it.textContent, vm.$el.querySelectorAll(bookSelectionOptionsSelector))).to.deep.equal(['Book A', 'Book B'])
            expect(bookSelectionOptions).to.have.lengthOf(0)
          } catch(anotherErr){
            done(anotherErr)
          }
        })
      } catch(err){
        done(err)
      }
      done()
    })
  })

  it('should can select book - with test util', () => {
    const wrapper = mount(Bookstore);
    wrapper.setData({
      cart: [],
      availableBooks: [
          "Book A",
          "Book B"
        ],
      selectedBook: ''
    });

    expect(R.map((it) => it.text(), wrapper.findAll(bookSelectionOptionsSelector).wrappers)).to.deep.equal(['Book A', 'Book B'])

    wrapper.vm.$children[1].$emit('input', 'Book A')
    wrapper.find(addToCartButtonSelector).element.click()
    wrapper.update();
    expect(R.map((it) => it.text(), wrapper.findAll(bookSelectionOptionsSelector).wrappers)).to.deep.equal(['Book B'])
    expect(R.map((it) => it.text(), wrapper.findAll(bookInCartSelector).wrappers)).to.deep.equal(['Book A'])

    wrapper.find(bookInCartRemovalButtonSelector).element.click()
    wrapper.update();
    expect(R.map((it) => it.text(), wrapper.findAll(bookSelectionOptionsSelector).wrappers)).to.deep.equal(['Book A', 'Book B'])
    expect(R.map((it) => it.text(), wrapper.findAll(bookInCartSelector).wrappers)).to.be.an('array').that.is.empty
  })
})
