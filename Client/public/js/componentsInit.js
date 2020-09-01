document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
    var elems1 = document.querySelectorAll('select');
    var instances1 = M.FormSelect.init(elems1, {});
  });

  // Or with jQuery

 /* $(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
  });*/

