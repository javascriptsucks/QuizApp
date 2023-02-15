// Client facing scripts here
$(() => {

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

    console.log(loopInput);

    const renderInput = `
          <span>
            <h4><u>Fill Out Questions Here:</u></h4>
          </span>
          ${loopInput}
          <button type="submit" class="btn btn-primary">Submit New Quiz</button>
    `;
    $('#new-quiz-content').removeAttr('style').empty().append(renderInput).stop().slideDown();
  });


});
