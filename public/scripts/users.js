// Client facing scripts here
$(() => {
  $('#fetch-users').on('click', () => {

    const $usersList=$('#user');
    const $userName = <%= user.name %>
    $usersList.empty();
    $(`<li class="user"> ${$userName}  </li>`).appendTo($usersList);
  });
});
