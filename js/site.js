$(document).ready(function(){
	// Cache the Window object
	$window = $(window);
                
   $('[data-type="background"]').each(function(){
     var $bgobj = $(this); // assigning the object
                    
      $(window).scroll(function() {
        var yPos = -($window.scrollTop() / $bgobj.data('speed'));
        var coords = '50% '+ yPos + 'px';
        $bgobj.css({ backgroundPosition: coords });
    }); // window scroll Ends
  });	
}); 
