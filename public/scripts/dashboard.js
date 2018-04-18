const addToCart = (obj) => {
  fetch(`/api/add_to_cart/${obj.id}`, {
    method: 'GET',
    credentials: 'include'
  }).then( res => {
    const button = document.getElementById(obj.id);
    button.classList.add('btn-success');
    button.classList.remove('btn-outline-primary');
    button.innerText = 'added to cart';
    button.classList.toggle('disabled');
    button.disabled = true;
  }).catch( reason => {
    console.log(reason)
  })
}

const init =  (bag) => {
  bag.forEach( item=>{
    const button = document.getElementById(item._id);
    button.classList.add('btn-success');
    button.classList.remove('btn-outline-primary');
    button.innerText = 'added to cart';
    button.classList.toggle('disabled');
    button.disabled = true;
  })
}