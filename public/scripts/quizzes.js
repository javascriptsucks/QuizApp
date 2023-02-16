// Client facing scripts here

const getQusByIdAndRender = function(quizId) {
  $('#new-quiz-number').on('change', function(e) {
    const selectVal = this.value;

    $.get(`/api/quizzes/update/${quizId}`, function(questions) {

      let loopInput = '';
      const {questions: res} = questions;
      for (let i = 1; i <= selectVal; i++) {
        let question=(typeof res[i-1]?.question==='undefined')? '':res[i-1].question;
        let questionEscap=$('<div/>').text(question).html();
        console.log(questionEscap);
        let answer = (typeof res[i - 1]?.answer === 'undefined') ? '' : res[i - 1].answer;
        console.log(question, answer);
        loopInput += `
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Question ${i}</label>
            <input name="question${i}" type="text" class="form-control" value="${question}">
          </div>
          <div class="form-group col-md-6">
            <label>Answer</label>
            <input name="answer${i}" type="text" class="form-control" value="${answer}">
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

};


const flexRenderInputs = function() {
  $('#new-quiz-number').on('change', function(e) {
    const selectVal = this.value;

    let loopInput = '';

    if (questions) {
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
  // flexRenderInputs();
  const pathName = window.location.pathname;

  if (pathName.startsWith('/quizzes/update/')) {
    const pathArr = pathName.split('/');
    const quizId = Number(pathArr.at(-1));

    getQusByIdAndRender(quizId);

  } else if (pathName.startsWith('/quizzes/new')) {
    flexRenderInputs();
  }


});
