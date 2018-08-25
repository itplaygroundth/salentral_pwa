import config from './config.js';
import login from './login';
import Axios from '../../node_modules/axios';

const Util = {

  shortthmonth: [{
    '01': 'ม.ค.',
    '02': 'ก.พ.',
    '03': 'มี.ค.',
    '04': 'เม.ย',
    '05': 'พ.ค.',
    '06': 'มิ.ย.',
    '07': 'ก.ค.',
    '08': 'ส.ค.',
    '09': 'ก.ย.',
    '10': 'ต.ค.',
    '11': 'พ.ย.',
    '12': 'ธ.ค.',
  }],
      
  fullthmonth: [
    { 'code': '01', 'name': 'มกราคม' },
    { 'code': '02', 'name': 'กุมภาพันธ์' },
    { 'code': '03', 'name': 'มีนาคม' },
    { 'code': '04', 'name': 'เมษายน' },
    { 'code': '05', 'name': 'พฤษภาคม' },
    { 'code': '06', 'name': 'มิถุนายน' },
    { 'code': '07', 'name': 'กรกฎาคม' },
    { 'code': '08', 'name': 'สิงหาคม' },
    { 'code': '09', 'name': 'กันยายน' },
    { 'code': '10', 'name': 'ตุลาคม' },
    { 'code': '11', 'name': 'พฤศจิกายน' },
    { 'code': '12', 'name': 'ธันวาคม' }
  ],
  getdThai (d)
  {
    let now = new Date(); 
    let thday = ['อาทิตย์', 'จันทร์',
      'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์']; 
    let thmonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม',
      'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน',
      'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    return thday[d];
  },
  getmThai (m)
  {
    let now = new Date(); 
    let thday = ['อาทิตย์', 'จันทร์',
      'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์']; 
    let thmonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม',
      'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน',
      'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    return thmonth[m];
  },
  getMonthByCode (code) {
    return this.fullthmonth.filter(
      function (data) { return data.code === code }
    );
  },
  getUnit () {
    const requestOptions = {
      method: 'GET',
      headers: login.getAuthHeader()
    };
    
    return Axios.get(`${config.API_URL}util/unit/all`, requestOptions).then(this.handleResponse);
  },
};
export default Util;