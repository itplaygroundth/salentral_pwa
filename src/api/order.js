export default class OrderForm {

  constructor (data) {
    
    this.originalData = data;
    for (let field in data) {
      if (field) {
        this[field] = data[field];
      }
    }
  }

  data () {
    let data = {};
    for (let property in this.originalData) {
      if (property) {
        data[property] = this[property];
        
        return data;
      }
    }
  }

  reset () {
    for (let field in this.originalData) {
      if (field) {
        this[field] = '';
      }
    }
  }

  post (url) {
    return this.submit('post', url);
  }

  delete (url) {
    return this.submit('delete', url);
  }

  submit (requestType, url) {
    return new Promise((resolve, reject) => {
      this.axios[requestType](url, this.data())
        .then(response => {
          this.onSuccess(response.data);
          resolve(response.data);
        })
        .catch(error => {
          this.onFail(error.response.data.data);
          reject(error.response.data.data);
        });
    });
  }

  onSuccess (data) {
    //
  }

  onFail (errorResponse) {
    //
  }
}