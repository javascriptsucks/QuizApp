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

  // EVENT LISTENER FOR COPY LINK BUTTONS

  $('.copy-message').hide();

  $('.copy-link').on('click', function(e) {
    e.preventDefault();

    $('.copy-message').fadeOut(300);

    navigator.clipboard.writeText($(this).siblings('.hidden-link').html());
    $(this).siblings('.copy-message').fadeIn(300);
  });

});
