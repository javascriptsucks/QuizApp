// Client facing scripts here

$(() => {
  $('#fetch-users').on('click', () => {
    $.get('/api/users/:id', function(user) {
      const $usersList = $('#user');
      console.log(user);
      // $usersList.empty();
      $(`<li class="user"> ${user.user.name}  </li>`).appendTo($usersList);

    });

  });
});
