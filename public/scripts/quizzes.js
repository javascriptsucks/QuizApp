// Client facing scripts here

const getQusByIdAndRender = function(quizId) {
  $('#new-quiz-number').on('change', function(e) {
    const selectVal = this.value;

    $.get(`/api/quizzes/update/${quizId}`, function(questions) {

      let loopInput = '';
      console.log(quizId);
      const {questions: res} = questions;
      if (res) {
        for (let i = 1; i <= selectVal; i++) {
          let question = (typeof res[i - 1]?.question === 'undefined') ? '' : res[i - 1].answer;
          let answer = (typeof res[i - 1]?.answer === 'undefined') ? '' : res[i - 1].answer;
          console.log(question, answer);
          loopInput += `
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>Question ${i}</label>
              <input name="question${i}" type="text" class="form-control" value=${question}>
            </div>
            <div class="form-group col-md-6">
              <label>Answer</label>
              <input name="answer${i}" type="text" class="form-control" value=${answer}>
            </div>
          </div>
        `;
        }
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

};


const flexRenderInputs = function(questions) {
  $('#new-quiz-number').on('change', function(e) {
    const selectVal = this.value;

    let loopInput = '';
    console.log(questions.length);

    if (questions) {
      for (let i = 1; i <= questions.length; i++) {
        console.log(1);
        loopInput += `
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>Question ${i}</label>
              <input name="question${i}" type="text" class="form-control" value=${questions[i - 1].question}>
            </div>
            <div class="form-group col-md-6">
              <label>Answer</label>
              <input name="answer${i}" type="text" class="form-control" value=${questions[i - 1].answer}>
            </div>
          </div>
        `;
      }
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

};

$(() => {
  // flexRenderInputs();
  const pathName = window.location.pathname;

  if (pathName.startsWith('/quizzes/update/')) {
    const pathArr = pathName.split('/');
    const quizId = Number(pathArr.at(-1));

    getQusByIdAndRender(quizId);

  } else if (pathName.startsWith('/quizzes/new')) {
    // flexRenderInputs();
  }


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
