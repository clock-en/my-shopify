import Hoge from './modules/Hoge';

const hoge = new Hoge('');

const message = document.getElementById('message');
message.innerText = `${hoge.greeting('太郎')}`;
