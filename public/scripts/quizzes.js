// Client facing scripts here
$(() => {
  $('#fetch-quizzes').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/quizzes'
    })
      .done((response) => {
        const $quizzesList = $('#quizzes');
        $quizzesList.empty();

        for (const user of response.users) {
          $(`<li class="user">`).text(user.name).appendTo($quizzesList);
        }
      });
  });
});
