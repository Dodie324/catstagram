$( document ).ready( function() {
  $( '[data-meow-button="create"]' ).on( 'submit', function( event ) {
    event.preventDefault();

    $form = $(event.currentTarget);

    $.ajax({
      type: "POST",
      url: $form.attr( 'action' ),
      dataType: "json",
      success: function( meow ) {
        //Create the string version of the form action
        action = '/posts/' + meow.post_id + '/meows/' + meow.id;

        //Create the new form
        $newForm = $( '<form>' ).attr({
          action: action,
          method: 'delete',
          'data-meow-button': 'delete'
        });

        //Create the new submit input
        $meowButton = $( '<input>' ).attr( { type: 'submit', value: 'Remove Meow' } );

        //Append the new submit input to the new form
        $newForm.append( $meowButton );

        //Replace the old create form with the new remove form
        $form.replaceWith( $newForm );
      }
    });
  });

  $( '[data-meow-button="delete"]' ).on( 'submit', function( event ) {
    event.preventDefault();

    $form = $( event.currentTarget );

    $.ajax({
      type: "DELETE",
      url: $form.attr( 'action' ),
      dataType: "json",
      success: function() {
        alert( "MEOW DELETED" );
      }
    });
  });
});

//Find all of the elements on the page that have
//data-meow-button attribute and listen for the 'submit'
//event. When a submit occurs, run an anonymous function
//(without a name), passing in the submit event itself
//as an argument. Inside the anonymous function we call
//event.preventDefault();, which basically says to prevent
//the default action of submitting the form, which would
//cause the page to be refreshed.

//event.currentTarget() will find that element that its
//the target of the event that is passed into the function.

//We're using the jQuery .ajax function to send a POST request
//to the URL specified in the action attribute of the form, and
//we're specifying that it's going to be a 'json' request.
