var socket  = io();

let uname; // user name
const join = document.querySelector('#btn');
const send = document.querySelector('#send-message');
const mbox = document.querySelector('.message-you');
const dmess = document.querySelector('.message-by-me');
const exitbtn = document.querySelector('#exit-btn');

// for joining of new member
join.addEventListener('click',()=>{
   let username = document.querySelector('.inner-div #user-name').value; 
    if(username.length == 0){
        return ;
    }
    uname = username;
    document.querySelector('#user-join-message').innerHTML = 'you have joined the chat!';
    socket.emit('newuser',username); // emiting username
  
    let mainapp = document.querySelector('.app');
    let firstdiv = document.querySelector('.first-div');
    firstdiv.style.display = 'none';
    mainapp.style.display = 'block';
    document.querySelector('.heading-exit').style.display = 'flex';
    document.querySelector('.inner-div #user-name').value = "";
})

// for exiting of member
exitbtn.addEventListener('click',function(){
    console.log("clicked!");
    socket.emit('exituser',uname);
    let mainapp = document.querySelector('.app');
    let firstdiv = document.querySelector('.first-div');
    firstdiv.style.display = 'block';
    mainapp.style.display = 'none';
    document.querySelector('.heading-exit').style.display = 'none';

})

socket.on('chat',function(message){
    rendermessage('other',message);
});

socket.on('update',function(message){
    console.log(message);
    rendermessage('update',message);
})


// for send button
document.querySelector('.main-box #send-message').addEventListener('click',function(){
    let message = document.querySelector('.main-box #input-text').value;
    if(message == 0){
        return ;
    }
    rendermessage('my',{
        username: uname,
        message: message
    });

    socket.emit('chat',{
        username: uname,
        message: message
    });

    document.querySelector('.main-box #input-text').value = "";
});
// for enter key
document.addEventListener('keydown',sendMessage);
function sendMessage(event){
    if(event.key === "Enter"){
       let message = document.querySelector('.main-box #input-text').value;
       if(message == 0){
           return ;
       }
       rendermessage('my',{
           username: uname,
           message: message
       });
   
       socket.emit('chat',{
           username: uname,
           message: message
       });
   
       document.querySelector('.main-box #input-text').value = "";
   }
   }


   // message rendering .........
 function rendermessage(type,mess){
    if(type === "my"){
       let div = document.createElement('div');
       let mainapp = document.querySelector('.mainapp');
       div.innerHTML = ` <div class="message-by-me">
                <div class="messageme">
                    <p class="id-you">you </p>
                    <p class="message-you">${mess.message}</p>
                </div>    
            </div>
            </br>`
      mainapp.appendChild(div);

    }
    else if(type === "other"){
        let divv = document.createElement('div');
        let mainapp = document.querySelector('.mainapp');
        divv.innerHTML = ` <div class="message-by-other">
                 <div class="messageother">
                     <p class="id-other">${mess.username}</p>
                     <p class="message-other">${mess.message}</p>
                 </div>    
             </div>
             </br>`
       mainapp.appendChild(divv);
    }
    else if(type === "update"){
        let di = document.createElement('div');
        let mainapp = document.querySelector('.mainapp');
        di.innerHTML = `<center>${mess}</center>`;
        mainapp.appendChild(di);
    }
    // FOR SCROLLING DOWN ITSELF.....
    document.querySelector('.app').scrollTop = document.querySelector('.app').scrollHeight;
 }

 new MutationObserver(()=>{
    document.querySelector('.mainapp').scrollTop =  document.querySelector('.mainapp').scrollHeight;
 }).observe( document.querySelector('.mainapp'),{childList: true})



