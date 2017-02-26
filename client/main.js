var socket = io.connect('http://localhost:8080', {'forceNew':true});

socket.on('messages', function(data){
  console.log(data);
  render(data);
});

function render(data){
  // método map() recorrer lo que hay en el array de objetos 'data'
  var html = data.map(function(message, index){
    return (`
        <section class="message">
          <strong>${message.nickname}</strong>
          <p>${message.text}</p>
        </section>

      `);
  }).join(' ');

  var section_msgs = document.getElementById('messages');
  section_msgs.innerHTML = html;
  section_msgs.scrollTop = section_msgs.scrollHeight;
}

function addMessage(e){
  var message = {
    nickname: document.getElementById('nickname').value,
    text: document.getElementById('text').value
  };

  document.getElementById('nickname').style.display = 'none';
  socket.emit('add-message', message);

  return false;

}