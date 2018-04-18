const deliverItems = () => {
  alert('Order placed successfully!');
  fetch(`/api/deliverItems`, {
    method: 'GET',
    credentials: 'include'
  }).then( res => {
    document.location.reload();
  }).catch( err => {

  })
}