$( document ).ready( function() {

  $( '[data-meow-count]' ).data( 'post.meows.count', 0 )
  var meowCount = $( '[data-meow-count]' ).data( 'post.meows.count' )

  $( '[data-post-id]' ).on( 'submit', '[data-meow-button="create"]', function( event ) {
    event.preventDefault();

    $form = $(event.currentTarget);


    $.ajax({
      type: "POST",
      url: $form.attr( 'action' ),
      data: { totalMeow: meowCount },
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

        $( '[data-meow-count]' ).data( 'post.meows.count', meowCount++ )
      }
    });
  });

  $( '[data-post-id]' ).on( 'submit', '[data-meow-button="delete"]', function( event ) {
    event.preventDefault();

    $form = $( event.currentTarget );


    $.ajax({
      type: "DELETE",
      url: $form.attr( 'action' ),
      data: { totalMeow: meowCount ) },
      dataType: "json",
      success: function() {
        //Find the parent wrapper div so that we can use its data-post-id
        $post = $form.closest( '[data-post-id]' );
        //Create the String version of the form action
        action = '/posts/' + $post.data( 'post-id' ) + '/meows';
        //Create the new form for creating a Meow
        $newForm = $( '<form>' ).attr({
          action: action,
          method: 'post',
          'data-meow-button': 'create'
        });
        //Create the new submit input
        $meowButton = $( '<input>' ).attr({
          type: 'submit',
          value: 'Meow'
        });
        //Append the new submit input to the new form
        $newForm.append( $meowButton );
        //Replace the old create form with the new remove form
        $form.replaceWith( $newForm );

        $( '[data-meow-count]' ).data( 'post.meows.count', meowCount-- )

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
