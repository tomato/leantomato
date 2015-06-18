(function(document, $){

  var expand = function()
  {
    var $clickedE = $(this);
    var $otherE = $('.intro .column').not($clickedE);

    $otherE.velocity({ width: '20%'});
    $clickedE.velocity({ width: '75%'});
  };

  $(function(){
    $('.intro .column').click(expand);
  });


})(document, jQuery);
