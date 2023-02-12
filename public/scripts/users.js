// Client facing scripts here
$(() => {
  $('#fetch-users').on('click', () => {

    $.get('/api/users', function(users) {
      const $usersList = $('#users');
      $usersList.empty();

      for (const user of users.users) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });


  });
});
