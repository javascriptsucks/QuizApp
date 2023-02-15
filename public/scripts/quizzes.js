// Client facing scripts here

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
  $('.copy-message-quizzes').hide();


  $('.copy-link-quizzes-btn').on('click', function(e) {
    e.preventDefault();

    $('.copy-message-quizzes').fadeOut(300);

    navigator.clipboard.writeText($(this).siblings('.hidden-link-quizzes').html());
    $(this).siblings('.copy-message-quizzes').fadeIn(300);
  });

  ///////////////////////////////////////////////////////////////////////
  // EVENT LISTENER FOR COPY LINK BUTTON - QUIZ ATTEMPT PAGE
  ///////////////////////////////////////////////////////////////////////
  $('.copy-message-attempt').hide();

  $('.copy-link-attempt-btn').on('click', function(e) {
    e.preventDefault();

    navigator.clipboard.writeText($(this).siblings('.hidden-link-attempt').html());
    $(this).siblings('.copy-message-attempt').fadeIn(300);
  });

});
