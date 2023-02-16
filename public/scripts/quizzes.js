// Client facing scripts here

///////////////////////////////////////////////////////////////////////
// CLIENT-SIDE HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////


const flexRenderInputs = function() {
  $('#new-quiz-number').on('change', function(e) {

    const selectVal = this.value;
    let loopInput = '';

    for (let i = 1; i <= selectVal; i++) {
      loopInput += `
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Question ${i}</label>
            <input name="question${i}" type="text" class="form-control">
          </div>
          <div class="form-group col-md-6">
            <label>Answer</label>
            <input name="answer${i}" type="text" class="form-control">
          </div>
        </div>
      `;
    }

    const renderInput = `
          <span>
            <h4><u>Fill Out Questions Here:</u></h4>
          </span>
          ${loopInput}
          <button type="submit" class="btn btn-primary">Submit New Quiz</button>
    `;
    $('#new-quiz-content').removeAttr('style').empty().append(renderInput).stop().slideDown();
  });

};

$(() => {
  flexRenderInputs();

  ///////////////////////////////////////////////////////////////////////
  // EVENT LISTENER FOR COPY LINK BUTTONS - HOME PAGE/MY QUIZZES PAGE
  ///////////////////////////////////////////////////////////////////////

  // HIDE COPY POP-UP MESSAGE ON LOAD
  $('.copy-message-quizzes').hide();

  $('.copy-link-quizzes-btn').on('click', function(e) {
    e.preventDefault();

    $('.copy-message-quizzes').fadeOut(300);

    // Copy link to clipboard on click
    navigator.clipboard.writeText($(this).siblings('.hidden-link-quizzes').html());
    $(this).siblings('.copy-message-quizzes').fadeIn(300);
  });

  ///////////////////////////////////////////////////////////////////////
  // EVENT LISTENER FOR COPY LINK BUTTON - QUIZ ATTEMPT PAGE
  ///////////////////////////////////////////////////////////////////////

  // HIDE COPY POP-UP MESSAGE ON LOAD
  $('.copy-message-attempt').hide();

  $('.copy-link-attempt-btn').on('click', function(e) {
    e.preventDefault();

    // Copy link to clipboard on click
    navigator.clipboard.writeText($(this).siblings('.hidden-link-attempt').html());
    $(this).siblings('.copy-message-attempt').fadeIn(300);
  });

  ///////////////////////////////////////////////////////////////////////
  // EVENT LISTENER FOR MY QUIZZES MODAL WINDOW
  ///////////////////////////////////////////////////////////////////////
  // $('.attempts-modal').on('shown.bs.modal', function() {
  //   $('attempts-modal-button').trigger('focus');
  // });

  $('.attempts-modal-btn').on('click', function(e) {
    e.preventDefault();

    $('.modal-title').html('');
    $('.modal-body').empty();

    const quizID = $(this).siblings('.hidden-quizID').html();

    $.get(`http://localhost:8080/api/quizzes/${quizID}`, function(quizData) {
      console.log(quizData);

      $('.modal-title').html(`Data for ${quizData.quiz_title.toUpperCase()} Quiz`);

      $('.modal-body')
        .append(`
            <p>Number Of Times Attempted: ${quizData.num_of_attempts}</p>
            <p>Average Score: ${quizData.average_score}</p>
          `);

    });

  });


});
