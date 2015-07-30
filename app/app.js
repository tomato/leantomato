(function(document, $){

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

  var expandDivision = function($toExpand,$toShrink ){
    $toShrink.velocity({ width: '10%'}).addClass('shrunk');
    $toExpand.velocity({ width: '85%'}).addClass('expanded');
  };

  var expand = function($toExpand,$toShrink){
    expandDivision($toExpand, $toShrink);
    rotateTitle($('h2',$toShrink));
    $('.hide-when-collapsed',$toShrink).velocity("fadeOut");
    $('.show-when-expanded',$toExpand).velocity("fadeIn");
    $('.menu-content').velocity("fadeOut");
  };

  var equalise = function($elements){

    $shrunks = $elements.filter('.shrunk');

    $elements
      .velocity({ width: '47%'})
      .removeClass('shrunk expanded');

    $shrunks.each(function(i, e){
      $element = $(e);
      unRotateTitle($('h2',$element));
      $('.hide-when-collapsed',$element).velocity("fadeIn");
    });

    $('.show-when-expanded').velocity("fadeOut");
    $('.menu-content').velocity("fadeOut");
  };


  var expandColumn = function(){
    var $both = $('.intro .column');
    var $clickedE = $(this);
    var $otherE = $both.not($clickedE);


    if(!$clickedE.hasClass('expanded'))
    {
      if($clickedE.hasClass('shrunk'))
        equalise($both);
      else
        expand($clickedE, $otherE);
    }
  };

  var shrinkColumn = function($toShrink){
    $toShrink.velocity({ width: '10%'}).addClass('shrunk').removeClass('expanded');
    rotateTitle($('h2',$toShrink));
    $('.hide-when-collapsed',$toShrink).velocity("fadeOut");
  };

  var insertInCenter = function($insertedElement)
  {
    $('.show-when-expanded').velocity("fadeOut");
    shrinkColumn($('.intro .column'));
    $insertedElement.velocity('fadeIn');
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
    $('.about-us-link').click(function(){ insertInCenter($('.about-us-content')); });
  });


})(document, jQuery);
