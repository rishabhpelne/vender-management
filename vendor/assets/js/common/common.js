const $ = (params)=> {
    let element =  document.querySelector(params)?? {};
    this.val = ()=> element.value;
    this.html = ()=> element.innerHTML;
    this.src = (url)=> element.src = url;
    this.setHtml = (data) => element.innerHTML = data;
    return this;
}