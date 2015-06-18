(function(document, $){

  var expandColumn = function()
  {
    var $clickedE = $(this);
    var $otherE = $('.intro .column').not($clickedE);

    $otherE.velocity({ width: '10%'});
    $clickedE.velocity({ width: '85%'});

    $('h2',$otherE).velocity({
      rotateZ: "90deg",
      'transform-origin': 'bottom left',
      translateY: "-30px",
      translateX: "-30px",
      width: "800px"
    });
  };

  var vTransform = function($element, transformation, apply)
  {
    var data = $element.data();

    if((!data.transforming) && data.transformed != apply)
    {
      //transformation($element);
      $element
        .data('transforming', true)
        .data('transformed', apply);

        $element
          .velocity("transition.flipYOut",
          {
            complete: transformation
          })
          .velocity("transition.flipYIn",
          {
            complete: function() {$element.data('transforming', false);}
          });
      }
  };

  var textEncrypt = function()
  {
    vTransform(
      $(this),
      function(element){
        $(element)
        .css('font-family','leantomato')
        .css('font-size','2em');
      }, true );
  };

  var textDecrypt = function()
  {
    vTransform(
      $(this),
      function(element){
        $(element)
        .css('font-family','')
        .css('font-size','');
      },false);
  };

  $(function(){
    $('.intro .column').click(expandColumn);
    $('.logo h1').on({ mouseover: textEncrypt, mouseout: textDecrypt });
    //$('.logo h1').hover(textEncrypt, textDecrypt);
  });


})(document, jQuery);
