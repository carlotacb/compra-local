var $document = $(document.body);


$(function(){

  clickedButtons();

});


function clickedButtons() {
  $(".nav-link").click(function(){
    $(".nav-link").removeClass('active');
    $(this).addClass('active');
  });
}
