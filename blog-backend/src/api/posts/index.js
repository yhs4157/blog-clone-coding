import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router(); 

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write); 


const post = new Router(); 
post.get('/', postsCtrl.read);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);

posts.use('/:id', postsCtrl.getPostById, post.routes());

export default posts; 


/*
{
    "username": "hohoho",
    "password": "123123"
}
*/