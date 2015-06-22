(function(document, $){

  var expandColumn = function()
  {
    var $clickedE = $(this);
    var $otherE = $('.intro .column').not($clickedE);

    var rotateTitle = function($element){
      $($element)
        .velocity({
          rotateZ: "90deg",
          'transform-origin': 'bottom left',
          translateY: "-30px",
          translateX: "-30px",
          width: "800px"
        });
    };

    var unRotateTitle = function($element){
      $($element)
        .velocity({
          rotateZ: "0deg",
          'transform-origin': 'bottom left',
          translateY: "0px",
          translateX: "0px",
          width: "400px"
        });
    };

    var equaliseDivision = function($toExpand,$toShrink ){
      $toShrink.add($toExpand)
        .velocity({ width: '47%'})
        .removeClass('shrunk expanded');
    };

    var expandDivision = function($toExpand,$toShrink ){
      $toShrink.velocity({ width: '10%'}).addClass('shrunk');
      $toExpand.velocity({ width: '85%'}).addClass('expanded');
    };

    var expand = function($toExpand,$toShrink){
      expandDivision($toExpand, $toShrink);
      rotateTitle($('h2',$toShrink));
      $('.hide-when-collapsed',$toShrink).velocity("fadeOut");
      $('.show-when-expanded',$toExpand).velocity("fadeIn");
    };

    var equalise = function($shrunk,$expanded){
      equaliseDivision($expanded, $shrunk);
      unRotateTitle($('h2',$shrunk));
      $('.hide-when-collapsed',$shrunk).velocity("fadeIn");
      $('.show-when-expanded').velocity("fadeOut");
    };

    if(!$clickedE.hasClass('expanded'))
    {
      if($clickedE.hasClass('shrunk'))
        equalise($clickedE, $otherE);
      else
        expand($clickedE, $otherE);
    }
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
  });


})(document, jQuery);
