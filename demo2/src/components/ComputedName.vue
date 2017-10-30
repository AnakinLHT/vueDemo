<template>
  <div>
    <div class="left-align-column">
      <div class="left-align-row">Firstname: <input type="text" v-model.lazy="firstname"/></div>
      <div class="left-align-row">Middlename: <input type="text" v-model.lazy="middlename"/></div>
      <div class="left-align-row">Lastname: <input type="text" v-model.lazy="lastname"/></div>
      <div class="left-align-row">DOB: <input type="date" v-model.lazy="dob"/></div>
    </div>
    <div>
      {{fullname}} is of age {{age}}.
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ComputedName',
  data () {
    return {
      firstname: "Petrarca",
      lastname: "Erdrant",
      middlename: "Anne",
      dob: "2001-01-01"
    }
  },
  computed: {
    fullname(){
      console.log("computing fullname");
      return this.firstname + " " + this.middlename + " " + this.lastname;
    },
    age(){
      console.log("computing age");
      return moment().diff(this.dob, 'years');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-align-row{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.left-align-column{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
