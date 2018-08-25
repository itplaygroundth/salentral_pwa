<template>
 <transition name="slide-fade" mode="in-out">
            <router-view ></router-view>
        </transition>
</template>
<script>
import orderproduct from './orderproduct';
import product from './product';


export default {
  components: {
    // 'orderp-app': orderproduct,
    // 'product-app': product,


  },
  data: () => ({

    transitionName: 'slide-left'
  }),

  computed: {
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
    headback () {
      return this.$store.getters['headback'];
    },
    '$route' (to, from) {
      // console.log(this.headback);
      const toDepth = to.path.split('/').length;
      // console.log(this.transitionName);
      const fromDepth = from.path.split('/').length;

      this.transitionName = this.transitionName === 'slide-right' ? 'slide-left' : 'slide-right';
    }
  },
  mounted () {
    this.headback = this.$store.getters['headback'];
  },
  methods: {
    gotoPage (item) {
      // console.log(`${this.$route.name}/${item}`);
      this.$route.name = item;
      this.$route.push({ name: `${item}` });
    }
  }
};
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-active {
    opacity: 0
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(500px);
  opacity: 0;
}
</style>
