document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button').addEventListener('click', function() {
    if (this.className.indexOf('btn-danger') >= 0) {
      this.className = 'btn btn-success'
    } else {
      this.className = 'btn btn-danger'
    }
  })
})
