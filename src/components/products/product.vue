<template>
  <div class="pl-4 pr-4 pt-2 pb-1">

    <v-layout>
      <v-flex lg12>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ $t("label.product.title1") }}</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
       <form enctype="multipart/form-data">
      <v-dialog v-model="dialog" max-width="1000px" scrollable transition="dialog-bottom-transition">

        <v-btn slot="activator" @click="showdialog(false)" color="primary" dark class="mb-2">{{ $t("label.product.newitem") }}</v-btn>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            <span class="headline">{{ dialogtitle }}</span>
              <v-spacer></v-spacer>
            <v-btn color="warning darken-1" @click.native="close">{{ $t("button.cancel") }}</v-btn>
            <v-btn color="success darken-1" @click.native="save">{{ $t("button.save") }}</v-btn>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex lg6 md4>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.code" :label="scode('code')"></v-text-field>
                </v-flex>
              </v-layout>
               <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.name1" :label="scode('name1')"></v-text-field>
                </v-flex>
               </v-layout>
                <v-layout wrap>
                 <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tags" :label="scode('tags')"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.brandcode" :label="scode('brandcode')"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.price" :label="scode('price')"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.size" :label="scode('size')"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.color" :label="scode('color')"></v-text-field>
                </v-flex>
                 <v-flex xs12 sm6 md4>
                  <v-autocomplete
                  v-model="editedItem.unitcode"
                  :items="items"
                  :label="scode('unitcode')"
                  item-text="name"
                  item-value="code"
                  ></v-autocomplete>
                </v-flex>
                 <v-flex xs12 sm6 md4>
                 <v-switch
              v-model="editedItem.activestatus"
              :label="checkstatus()"
              color="success"
              hide-details
            ></v-switch>
                 </v-flex>
              </v-layout>
                </v-flex>
                <v-flex lg6 md4>
                  <div class="font-size:11px"><span>Picture</span></div>
                  <div class="pl-4 pt-1 pb-4">
                  <vue-dropzone ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                  v-model="editedItem.pictures"
                  v-on:vdropzone-removed-file="removeFile"
                  v-on:vdropzone-success="uploadSucess"



                  ></vue-dropzone>
                  </div>
                </v-flex>
              </v-layout>
             <v-divider></v-divider>

            </v-container>
          </v-card-text>

          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">{{ $t("button.cancel") }}</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">{{ $t("button.save") }}</v-btn>
          </v-card-actions> -->
        </v-card>
      </v-dialog>
       </form>
    </v-toolbar>

    <v-data-table
               :headers="headers(true)"
               :items="desserts"
               item-key="code"
               :pagination.sync="pagination"
               :total-items="totalDesserts"
               :loading="loading"
               :search="search"
               expand
               hide-actions
               class="elevation-2">
   <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
  <template slot="items" slot-scope="props">
    <tr @click.stop=" dialog ===false ? props.expanded = !props.expanded : false">
       <td>{{ props.item.code }}</td>
        <td>{{ props.item.name1 }}</td>
        <td class="text-xs-right">{{ parseDate(props.item.lastbuydate) }} </td>
        <td class="text-xs-right">{{ parseDate(props.item.lastsaledate) }}</td>
        <td class="text-xs-right">{{ props.item.tags }}</td>
        <td class="text-xs-right">{{ props.item.brandcode }}</td>
        <td class="text-xs-right">{{ props.item.stockqty }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <!-- <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon> -->
        </td>
    </tr>
  </template>
  <template slot="expand" >
    <v-card class="elevation-10">
      <v-card-text>

        <v-data-table :headers="subHeaders()"
                      :items="subItems"
                      item-key="color"
                      hide-actions
                      class="elevation-10">
          <template slot="items" slot-scope="props">
            <td class="text-xs">{{ props.item.color }}</td>
            <td class="text-xs">{{ props.item.value }}</td>
          </template>
        </v-data-table>

      </v-card-text>
    </v-card>
  </template>
   <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
 </v-data-table>
  <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" total-visible="7" :length="pages"></v-pagination>
    </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import { get, sync, call } from 'vuex-pathify';
import OrderForm  from './../../api/order';
import swal from 'sweetalert2';
import util from './../../api/util';
import ap from './../../api/stock';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name: 'product-app',
  components: {
    // vueDropzone: vue2Dropzone
  },
  data: () => ({
    dialog: false,
    exp: false,
    pagination: { rowsPerPage: 30 },
    totalDesserts: 0,
    desserts: [],
    pictures: [],
    loading: true,
    subItems: [
      { code: 'Red', value: '1' },
      { code: 'Green', value: '2' },
      { code: 'Blue', value: '3' },
      { code: 'Black', value: '4' }
    ],

    editedIndex: -1,
    editedItem: {
      code: '',
      name1: '',
      brancode: '',
      price: 0,
      size: '',
      color: '',
      tags: '',
      unitcode: '',
      pictures: []
    },
    defaultItem: {
      code: '',
      name1: '',
      brancode: '',
      price: 0,
      size: '',
      color: '',
      tags: '',
      unitcode: '',
      pictures: []
    },
    items: [],
    dropzoneOptions: {
      url: `${ap.url}photos/upload`,
      thumbnailWidth: 150,
      chunkSize: true,
      maxFiles: 4,
      maxFilesize: 0.5,
      addRemoveLinks: true,
      destroyDropzone: true,
      uploadMultiple: true,
      headers: { 'x-access-token': localStorage.getItem('token') }
      // previewTemplate: '<div> Long template here </div>',
    },

    isRemove: false,
    dialogtitle: '',
    search: ''
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    keypress: {
      get () {
        return this.$store.getters['keypress'];
      },
      set (key) {
        this.$store.set('keypress', key);
      }
    },
    globalsearch: {
      get () {

        return this.$store.getters['globalsearch'];
      }
      // ,
      // set (val) {
      //   this.$store.set('globalsearch', val);
      // }
    },
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
    reqheaders () {

      return { 'x-access-token': localStorage.getItem('token') };

    }
  },
  watch: {
    dialog (val) {
      val || this.close();
      // this.dialogtitle = this.$t('label.product.edititem');
      // console.log(this.dialogtitle);
    },
    pagination: {
      handler () {
        this.searchDataFromApi(this.globalsearch)
          .then(data => {
            this.desserts = data.items;
            this.totalDesserts = data.total;
          });
      },
      deep: true
    },
    keypress (val) {
      this.KeyPress(val);
    },
    globalsearch ()
    {

      // this.search = this.globalsearch;
      this.searchDataFromApi(this.globalsearch)
        .then(data => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });

      // console.log(this.search);
      // this.globalSearch();
    }
  },
  mounted () {
    // this.getDataFromApi()
    //   .then(data => {
    //     // console.log(data.items);
    //     this.desserts = data.items;
    //     this.totalDesserts = data.total;
    //   });
    this.keypress = this.$store.getters['keypress'];
  },
  created () {
    this.initialize();
    util.getUnit()
      .then(res => {
        // console.log(res);
        // this.items = res.rows;
        // const dump = this.items.find(item => {
        //   // console.log(item.code, this.model);
        //   return item.code === typeof this.$store.getters['orderproduct'].apcode === 'object' ? this.$store.getters['orderproduct'].apcode.code : this.$store.getters['orderproduct'].apcode;
        // });
        this.items = JSON.parse(JSON.stringify(res.data.rows));

        // this.search = dum.name1;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { this.isLoading = false });
    this.dialogtitle = this.$t('label.product.newitem');
  },

  methods: {

    initialize () {
      this.searchDataFromApi(this.globalsearch);
    },
    headers (show) {
      //
      let head = JSON.parse(JSON.stringify(this.$t('label.product.headers')));
      if (show) {
        head = JSON.parse(JSON.stringify(this.$t('label.product.headers'))).filter(element => {
          // console.log(element);
          return element.show === true;
        });
      }
      // console.log(head);
      return head;// JSON.parse(JSON.stringify(this.$t('label.product.headers')));
    },
    subHeaders () {
      return JSON.parse(JSON.stringify(this.$t('label.product.subHeaders')));
    },
    scode (field) {
      let menu = this.headers(false).filter(element => element.value === field);

      return menu[0].text;
    },
    searchDataFromApi (val) {
      // console.log(val);
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;


        this.getItem(val).then(rows => {
          let items = rows;

          const total = items.length;

          if (this.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy];
              const sortB = b[sortBy];

              if (descending) {
                if (sortA < sortB) return 1;
                if (sortA > sortB) return -1;
                return 0;
              } else {
                if (sortA < sortB) return -1;
                if (sortA > sortB) return 1;
                return 0;
              }
            });
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
          }
          // console.log(items);
          setTimeout(() => {
            this.loading = false;
            resolve({
              items,
              total
            });
          }, 100);
        });

      });
    },
    getDesserts (val) {

      return ap.getAll(val).then(res => {
        // console.log(JSON.parse(JSON.stringify(res.rows)));
        return JSON.parse(JSON.stringify(res.rows));
      }).catch(err => {
        console.log(err);
      });

    },
    getItem (val) {
      // console.log(val);
      return ap.getItem(val).then(res => {
        // console.log(JSON.parse(JSON.stringify(res.rows)));
        return JSON.parse(JSON.stringify(res.rows));
      }).catch(err => {
        console.log(err);
      });

    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
      this.exp = false;
      this.dialogtitle = this.$t('label.product.edititem');
      const url = ap.img_url;

      // this.$refs.myVueDropzone.setOption('headers', { 'x-access-token': localStorage.getItem('token') });
      if (item.picfilename1 !== null) {
        this.$refs.myVueDropzone.manuallyAddFile({ size: 123, name: item.picfilename1 }, url + item.picfilename1);
        this.$refs.myVueDropzone.manuallyAddFile({ size: 123, name: item.picfilename2 }, url + item.picfilename2);
        this.$refs.myVueDropzone.manuallyAddFile({ size: 123, name: item.picfilename3 }, url + item.picfilename3);
        this.$refs.myVueDropzone.manuallyAddFile({ size: 123, name: item.picfilename4 }, url + item.picfilename4);
      }
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item);
      // confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);

      this.dialog = false;
      this.exp = true;
    },

    close () {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    refresh () {
      this.searchDataFromApi(this.globalsearch)
        .then(data => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
    },
    save () {


      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        // .then(data => {
        // console.log(this.pictures);

        this.editedItem.picfilename1 = this.pictures[0];
        this.editedItem.picfilename2 = this.pictures[1];
        this.editedItem.picfilename3 = this.pictures[2];
        this.editedItem.picfilename4 = this.pictures[3];
        // console.log(this.editedItem.picfilename1, this.pictures[0]);
        ap.updateItem(this.editedItem)
          .then(res => {
            this.refresh();
          }).catch();
        // console.log('update');
        // });
      } else {
        this.editedItem.picfilename1 = this.pictures[0];
        this.editedItem.picfilename2 = this.pictures[1];
        this.editedItem.picfilename3 = this.pictures[2];
        this.editedItem.picfilename4 = this.pictures[3];

        this.desserts.push(this.editedItem);
        // .then(data => {
        // console.log('insert');
        // console.log(this.pictures);
        ap.insertItem(this.editedItem)
          .then(res => {
          // swal.showdialog('');
            this.globalsearch();
          }).catch();

        // });

      }
      this.close();
    },
    parseDate (date) {
      // console.log('step3', date);
      if (!date) return null;

      const [year, month, day] = date.split('-');
      // console.log(day.substr(0, 2).padStart(2, '0'));
      return `${day.substr(0, 2).padStart(2, '0')}/${month.padStart(2, '0')}/${this.localize === 'th' ? parseInt(year, 0) - 543 : parseInt(year, 0) + 543}`;
    },
    onChanged (image) {
      console.log('New picture selected!');
      if (image) {
        console.log('Picture loaded.');
        this.image = image;
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },
    beforeDestroy () {
      this.removeFile = true;
    },
    removeFile (file)
    {
      if (this.isRemove) {
        return;
      }
    },
    uploadSucess (file, response) {
      // console.log(response[0].filename);
      this.pictures.push(response[0].filename);

    },
    showdialog () {
      this.dialogtitle = this.$t('label.product.newitem');
      // console.log(this.dialogtitle);
    },
    checkstatus () {
      let lb = '';
      // console.log(this.editedItem.activestatus);
      // if (this.editedIndex > -1) {
      this.editedItem.activestatus === false || this.editedItem.activestatus === 0 ? lb = 'ไม่ทำงาน' : lb = 'ทำงาน';
      // this.editedItem.activestatus === 0 ? lb = 'ไม่ทำงาน' : lb = 'ทำงาน';
      // console.log(this.desserts[this.editedIndex]);
      // }
      return lb;
    },
    KeyPress (event) {

      switch (event.keyCode) {
        case 121:
          // this.submit();
          // console.log(event.keyCode);
          if (this.dialog) {
            this.save();
          }
          break;
        case 27:
          // this.clear();
          if (this.dialog) {
            this.$refs.myVueDropzone.removeAllFiles(true);


            this.close();
          }
          break;
      }
    },

  }
};
</script>
