$(document).ready(() => {
  let seatsOccupied = [];

  $(".join").on('click', function() {
    socket.emit('join request', { user: 'guest', seat: $(this).parent().prop('id') });
  });

  socket.emit('game viewer');

  socket.on('new player', data => {
    $("#" + data.seat).html(data.html);
    seatsOccupied.push(data.seat);
  });

  socket.on('run game', data => {
    gameLoop(data.turn);
  });

  function gameLoop(turn) {
    $("#" + seatsOccupied[turn]).append("<button class='next-btn btn'>Next</button>");
    $(".next-btn").on('click', event => {
      event.preventDefault();
      $("#" + seatsOccupied[turn]).children('button').remove();
      socket.emit('next button');
    });
  }

});
