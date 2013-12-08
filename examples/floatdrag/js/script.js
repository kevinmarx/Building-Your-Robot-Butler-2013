/* 
Author: Kristofer Joseph
Float dragging. 
Update float and clear while user drags
*/

(function($) {
	
  var topOffset = 0;
  
  $('#first').dragon({'showMetrics': true});
  $('#second').dragon({'showMetrics': true});
  $('#third').dragon({'showMetrics': true});

  var floating;
  $('#float').click(function() {
    floating = !floating;
    var floatz;

    if (floating) {
      floatz = 'left';
    } else {
      floatz = 'none';
    }

    $('.item').css({
      'float': floatz
    });

  });

  $('#clear').click(function() {
    console.log('clear');
    $('.item').addClass('clearfix');
  });
  
})(window.jQuery);
