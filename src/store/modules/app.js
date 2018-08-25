
import * as types from '../mutation-types';
import auth from '../../api/login';
import { make } from 'vuex-pathify';
import Route from '../../router';
import swal from 'sweetalert2';
// import VueSweetalert2 from '../../../node_modules/vue-sweetalert2';

const state = {
  keypress: '',
  token: !!localStorage.getItem('token'),
  authstatus: '',
  userslogin: '',
  orderproduct: {
    docdate: sessionStorage.getItem('docdate'),
    duedate: sessionStorage.getItem('duedate'),
    docno: sessionStorage.getItem('docno'),
    apcode: sessionStorage.getItem('apcode'),
    apname: sessionStorage.getItem('apname'),
  },
  globalsearch: '',
  headback: false
  
 
  
};
const mutations = make.mutations(state);
const actions = { 
  ...make.actions(state),
  logIN ({ commit, dispatch }, creds) {
    return new Promise((resolve, reject) => {
      auth.login(creds).then(
        res => {
          // console.log(creds);
          this.set('authstatus', true)
            .then(this.set('userslogin', creds.user))
            .then(this.set('token', localStorage.getItem('token')))
            .then(
              // console.log('token', localStorage.getItem('token')),
              Route.push('Dashboard')
            );
          resolve(res);
        }).catch(err => {
        let timerInterval;
        swal({
          type: 'error',
          title: 'Danger...',
          text: err,
          timer: 2000,
          onOpen: () => {
            swal.showLoading();
            timerInterval = setInterval(() => {
              // swal.getContent().querySelector('strong')
              //   .textContent = swal.getTimerLeft();
            }, 100);
          },
          onClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (
          // Read more about handling dismissals
            result.dismiss === swal.DismissReason.timer
          ) {
            // console.log('I was closed by the timer');
          }
        });
        localStorage.removeItem('token'); 
        // location.reload();// if the request fails, remove any possible user token if possible
        reject(err);
      });
    });
  },
  logOUT ({ commit, dispatch }) {
  //  console.log();
    
    this.set('userslogin', '')
      .then(localStorage.removeItem('token'))
      .then(this.set('authstatus'), false)
      .then(this.set('token', false)
        .then(window.getApp.$emit('APP_LOGOUT')));
  },
  saveOrderproduct ({ commit, dispatch }, form) {
    
     
    return new Promise((resolve, reject) => {
      let menu =  JSON.parse(JSON.stringify(form));
      menu.forEach(element => {
        
        this.set('orderproduct@docno', element.docno);
        sessionStorage.setItem('docno', element.docno);
        this.set('orderproduct@docdate', element.docdate);
        sessionStorage.setItem('docdate', element.docdate);
        this.set('orderproduct@apcode', element.apcode);
        sessionStorage.setItem('apcode', element.apcode);
        this.set('orderproduct@apname', element.apname);
        sessionStorage.setItem('apname', element.apname);
        this.set('orderproduct@duedate', element.duedate)
          .then(res => {
            sessionStorage.setItem('duedate', element.duedate);
          }).catch(err => {
            reject(err);
          });
      });
    });
  },
  

};
const getters = 
{
  ...make.getters(state),
  getKeypress () {
    return typeof this !== 'undefined' ? this.state.keypress : null;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
