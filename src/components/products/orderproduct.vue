<template>

<div id="page-forms">

  <v-flex>
  <form>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg6>

          <v-card class="mb-2">

           <v-toolbar color="success" dark flat dense cad>
              <v-toolbar-title class="subheading">{{ $t("label.orderproduct.title1") }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="">
              <div class="pl-1 pb-1">
                    <label>{{ $t('label.orderproduct.docdate') | translate }}</label>
                    </div>
         <v-menu
            ref="menu1"
            :close-on-content-click="false"
            v-model="menu1"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="dateFormatted"
              hint="DD/MM/YYYY format"
              persistent-hint
              prepend-icon="event"
              @blur="date = parseDate(dateFormatted)"
              :mask="mask"
              return-masked-value
            ></v-text-field>
            <v-date-picker v-model="date" @input="menu1 = false" :date-format="onChangeDate()" :locale="localize"></v-date-picker>
          </v-menu>
              <!-- <v-date-picker v-model="form.docdate" color="primary" reactive :date-format="onChangeDate()" :locale="localize" ></v-date-picker> -->

             <div class="pl-1 pt-4 pb-2">
             <label>{{ $t("label.orderproduct.duedate") }}</label>
            </div>
            <v-menu
            ref="menu2"
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="duedate"
              hint="DD/MM/YYYY format"
              persistent-hint
              prepend-icon="event"
              @blur="date2 = parseDate(duedate)"
              :mask="mask"
              return-masked-value
            >
            </v-text-field>
            <v-date-picker v-model="date2" @input="menu2 = false" :date-format="onChangeDate()" :locale="localize"></v-date-picker>
          </v-menu>


            </v-card-text>

          </v-card>

        </v-flex>
         <v-flex lg6>
          <v-card class="mb-4">
          <v-toolbar color="success" dark flat dense cad>
              <v-toolbar-title class="subheading">{{ $t("label.orderproduct.title2") }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>


            <v-card-text class="">

               <div class="pl-1 pb-1">
                     <label>{{ $t("label.orderproduct.apname") }}</label>
               </div>
               <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      clearable
      hide-details
      hide-selected
      item-text="name1"
      item-value="code"


    >

    </v-autocomplete>
            <div class="pl-1 pt-4 pb-4">

             <label>{{ $t("label.orderproduct.docno") }}</label>
             </div>

            <v-text-field prepend-icon="event" v-model="docno"></v-text-field>
             </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="pl-4 pt-1 pb-4">
     <v-btn @click="submit" color="success">{{ $t("button.save") }}</v-btn>
    <v-btn @click="clear" color="warning">{{ $t("button.cancel") }}</v-btn>
    </div>
  </form>
  </v-flex>

  <!-- <v-slide-x-transition >
   <orderpsub-app v-show="!headback"></orderpsub-app>
  </v-slide-x-transition>-->
  </div>

</template>

<script>
import ap from './../../api/ap';
import { get, sync, call } from 'vuex-pathify';
import OrderForm  from './../../api/order';
import swal from 'sweetalert2';
import router from '../../router';
// import orderproductsub from './orderproductsub';

export default {

  name: 'orderp-app',
  components: {
    // orderproductsub
  },
  props: {

  },
  data: () => ({
    loading: false,
    localize: 'th',
    date: '',
    menu: false,
    modal: false,
    menu1: false,
    menu2: false,
    docno: '',
    docdate: '',
    selectedDate: '',
    dateFormatted: '', // this.formatDate(this.$moment().format('YYYY-MM-DD')),
    duedate: '', // this.formatDate(this.$moment().format('YYYY-MM-DD')),
    date2: '', // this.$moment().format('DD/MM/YYYY'),
    mask: '##/##/####',

    isLoading: false,
    items: [],
    model: null,
    search: null,
    issubmit: false

  }),

  computed: {
    ...get('authstatus'),
    slabel () {

      return this.$t('label.orderproduct.apname');
    },
    keypress: {
      get () {
        return this.$store.getters['keypress'];
      },
      set (key) {
        this.$store.set('keypress', key);
      }
    },
    headback: {
      get () {
        return this.$store.getters['headback'];
      },
      set (key) {
        this.$store.set('headback', key);
      }
    }


  },
  watch: {
    date (val) {
      // console.log('step2', this.date);
      if (this.date === null) {
        this.dateFormatted = this.formatDate(this.$moment().format('DD/MM/YYYY'));

      } else {
        this.dateFormatted = this.formatDate(this.date);
      }
      // this.$store.dispatch('saveOrderproduct', [{ docno: val, docdate: this.date, duedate: this.duedate, apcode: this.model, apname: this.search }]);
      // console.log(this.$store.getters['orderproduct']);

    },
    menu1 (val) {
      // console.log('step1');
      this.localize = this.localize !== this.$i18n.locale() ? this.$i18n.locale() : this.localize;

    },
    date2 (val) {

      if (this.date2 === null) {
        this.duedate = this.formatDate(this.$moment().format('DD/MM/YYYY'));

      } else {
        this.duedate = this.formatDate(this.date2);
      }
      // this.$store.dispatch('saveOrderproduct', [{ docno: val, docdate: this.date, duedate: this.duedate, apcode: this.model, apname: this.search }]);

    },
    docno (val) {
      // this.$store.set('orderproduct@docno', val);
      // this.$store.dispatch('saveOrderproduct', [{ docno: val, docdate: this.date, duedate: this.duedate, apcode: this.model, apname: this.search }]);
      // console.log(this.$store.getters['orderproduct']);

    },
    keypress (val) {
      this.KeyPress(val);
    }
  },
  created () {

    // window.addEventListener('keydown', this.onkey);
    // this.model = this.$store.getters['orderproduct'].apcode !== '' ? this.$store.getters['orderproduct'].apcode : '';
    this.search = this.$store.getters['orderproduct'].apname !== '' ? this.$store.getters['orderproduct'].apname : '';
    this.docno = this.$store.getters['orderproduct'].docno !== '' ? this.$store.getters['orderproduct'].docno : '';
    this.dateFormatted = this.$store.getters['orderproduct'].docdate !== '' ? this.$store.getters['orderproduct'].docdate : this.formatDate(this.$moment().format('YYYY-MM-DD'));
    this.duedate = this.$store.getters['orderproduct'].duedate !== '' ? this.$store.getters['orderproduct'].duedate : this.formatDate(this.$moment().format('YYYY-MM-DD'));

    // this.keypress = this.$store.getters['keypress'];
    // console.log('step1');
    if (this.items.length > 0) return;

    this.isLoading = true;
    this.headback = true;
    // console.log(typeof this.$store.getters['orderproduct'].apcode);
    // Lazily load input items
    ap.getAll()
      .then(res => {

        this.items = res.rows;
        const dump = this.items.find(item => {
          // console.log(item.code, this.model);
          return item.code === typeof this.$store.getters['orderproduct'].apcode === 'object' ? this.$store.getters['orderproduct'].apcode.code : this.$store.getters['orderproduct'].apcode;
        });
        this.model = dump;
        // this.search = dum.name1;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { this.isLoading = false });
    // console.log({ docno: this.docno, docdate: this.dateFormatted, duedate: this.duedate, apcode: this.model, apname: this.search });

  },

  mounted () {

    // console.log('step2');
    let dum = this.items.find(item => {
      // console.log(item.code, this.model);
      return item.code === this.model ? item.name1 : '';
    });
    this.keypress = this.$store.getters['keypress'];


    // this.search = dum.name1;
  },
  updated () {


    // Lazily load input items
    const dump = this.items.find(item => {
      // console.log(item.code, this.model);
      return item.code === typeof this.model === 'object' ? this.model.code : this.model;
    });
    // this.model = dump;
    // console.log(this.model);
    // console.log({ docno: this.docno, docdate: this.dateFormatted, duedate: this.duedate, apcode: dump, apname: this.search });
    this.$store.dispatch('saveOrderproduct', [{ docno: this.docno, docdate: this.dateFormatted, duedate: this.duedate, apcode: dump, apname: this.search }]);

  },
  methods: {
    formatDate (date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      this.localize = this.localize === undefined ? this.currentLanguage() : this.localize;
      return `${day}/${month}/${this.localize === 'th' ? parseInt(year, 0) + 543 : year}`;
    },
    parseDate (date) {
      // console.log('step3', date);
      if (!date) return null;

      const [day, month, year] = date.split('/');
      return `${this.localize === 'th' ? parseInt(year, 0) - 543 : year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    checkmonth (month) {
      return month;
    },
    currentLanguage () {
      return this.$i18n.locale();
    },
    onChangeDate () {
      if (this.localize !== this.$i18n.locale()) {
        this.localize = this.$i18n.locale();

        this.dateFormatted = this.formatDate(this.date);
        this.duedate = this.formatDate(this.date2);
      }
    },
    customFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1;
    },
    submit () {
      let timerInterval;
      // swal({
      //   type: 'success',
      //   title: 'Save...',
      //   text: 'Success',
      //   timer: 2000,
      //   onOpen: () => {
      //     swal.showLoading();
      //     timerInterval = setInterval(() => {
      //       // swal.getContent().querySelector('strong')
      //       //   .textContent = swal.getTimerLeft();

      //     }, 100);
      //   },
      //   onClose: () => {
      //     clearInterval(timerInterval);
      //   }
      // }).then((result) => {
      //   if (
      //   // Read more about handling dismissals
      //     result.dismiss === swal.DismissReason.timer
      //   ) {
      //     this.issubmit = true;
      //     this.headback = false;
      //     // console.log('I was closed by the timer');
      //   }
      // });
      // this.clear();
      this.headback = true;
      this.gotoPage('orderproductsub');
    },
    clear () {
      this.initData();
      this.dateFormatted = '';
      this.docno = '';
      this.model = '';
      this.issubmit = false;
    },
    initData () {
      this.duedate = this.formatDate(this.$moment().format('YYYY-MM-DD'));
      this.date = this.$moment().format('YYYY-MM-DD');

      this.dateFormatted = this.formatDate(this.date);
    },
    fetchData () {
      return get('orderproduct').then(() => {
        this.initData();
      });
    },
    KeyPress (event) {

      switch (event.keyCode) {
        case 121:
          this.submit();
          break;
        case 27:
          this.clear();
          break;
      }
    },
    gotoPage (item) {
      // console.log(`${this.$route.name}/${item}`);
      router.name = item;
      router.push({ name: `${item}` });
    }

  }
};


</script>
<style scoped>


/* a container with flex-direction column */
.main-container {
  height: 75vh; /* or position:absolute; height:100%; */
  display: flex;
  flex-direction: column;
}

/* an arbitrary container of fixed height */
.fixed-container {
  height: 50px;
  padding: 20px;

}

/* this is the flex container that will take the rest of the height */
.content-wrapper {
  display: flex;
  flex: 1;
  min-height: 0px; /* IMPORTANT: you need this for non-chrome browsers */
}

/* the container for our overflowed content */
.overflow-container {
  flex: 1;
  overflow: auto;
}

/* the overflow content itself */
.overflow-content {
  height: auto;
  color: black;
  background-color: #ddd;
  padding: 20px;
}

code {
  font-weight: bold;
  color: darkred;
  margin: 0 5px;
}
.manual-v-layout {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  padding-bottom: 8px !important;
  padding-top: 8px !important;
}
</style>
