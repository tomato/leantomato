$(document).ready(function(){
  $('.logo').lettering();
  $('.menu-container a').click(function(e){
    var $linkId = $(this).data('link')
    var $target = $('#' + $linkId)
    if($linkId.length > 0 && $target.length > 0) {
      $("html, body").animate({ scrollTop: $target.offset().top - 50}, 1000);
      e.preventDefault();
    }
  })
}); 
