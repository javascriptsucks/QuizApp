
$(() => {
  // GET PATHNAME
  const pathName=window.location.pathname;

  // CHECK PATHNAME
  // UPDATE PATH
  if (pathName.startsWith('/quizzes/update/')) {
    const pathArr = pathName.split('/');
    const quizId = Number(pathArr.at(-1));

    getQusByIdAndRender(quizId);
  // NEW PATH
  } else if (pathName.startsWith('/quizzes/new')) {
    flexRenderInputs();
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





// USER INPUT ESCAPE
const escapeFnc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const getQusByIdAndRender = function(quizId) {
  $('#new-quiz-number').on('change', function(e) {
    const selectVal = this.value;

    $.get(`/api/quizzes/update/${quizId}`, function(questions) {

      let loopInput = '';
      const {questions: res} = questions;
      for (let i=1;i<=selectVal;i++) {

        // SET QUESTION VALUE FROM DB
        // IF NOT FIND GIVE VALUE AS ''
        // AND GET USER INPUT sanitization
        let question = (typeof res[i-1]?.question === 'undefined') ? '' : res [i-1].question;
        question=escapeFnc(question);

        // SET ANSWER VALUE FROM DB
        // IF NOT FIND GIVE VALUE AS ''
        // AND GET USER INPUT sanitization
        let answer=(typeof res[i-1]?.answer === 'undefined') ? '' : res[i-1].answer;
        answer=escapeFnc(answer);

        let questionId=(typeof res[i-1]?.question_id==='undefined')? '':res[i-1].question_id;

        loopInput += `
        <div class="form-row">
          <div class="form-group col-md-6">
            <input name="question_id${i}" type="hidden" value="${questionId}" style="display:none;"></input>
            <label>Question ${i}</label>
            <input name="question${i}" type="text" class="form-control" value='${question}'>
          </div>
          <div class="form-group col-md-6">
            <label>Answer</label>
            <input name="answer${i}" type="text" class="form-control" value='${answer}'>
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
  });

};


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


