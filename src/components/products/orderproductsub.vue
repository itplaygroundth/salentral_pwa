<template>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 md6>
            <v-toolbar>
                <v-icon>document</v-icon>
                <v-btn flat @click.stop="goback">{{ docno }}</v-btn>
                <v-spacer></v-spacer>
                 <v-toolbar-title>
        <h1>Order Sub Page</h1>
        
        <v-spacer></v-spacer>
                 </v-toolbar-title>
            </v-toolbar>
           
        </v-flex>
      </v-layout>
    </v-container>

</template>
<script>
import router from '../../router';
export default {

  name: 'orderpsub-app',
  props: {
    
  },
  data: () => ({
    docno: '',
  }),
  computed: {
    headback: {
      get () {
        return this.$store.getters['headback'];
      },
      set (key) {
        this.$store.set('headback', key);
      }
    },
  },
  
  watch: {
    headback () {
      return this.$store.getters['headback'];
    },
 
  },
  created () {
    this.docno = this.$store.getters['orderproduct'].docno;
  },
  mounted () {
    this.headback = this.$store.getters['headback'];
  },
  methods: {
    goback () {
      this.$store.set('headback', true);
      this.gotoPage('orderproduct');
    },
    gotoPage (item) {
      // console.log(`${this.$route.name}/${item}`);
      router.name = item;
      router.push({ name: `${item}` });
    }
  }
};
</script>
