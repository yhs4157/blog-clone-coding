import Post from '../../models/post';
import mongoose from 'mongoose'; 
import Joi from '@hapi/joi';
import { setMaxListeners } from 'events';

const {ObjectId} = mongoose.Types; 

export const getPostById = async (ctx, next) => {
    const {id} = ctx.params; 
    if(!ObjectId.isValid(id)) {
        ctx.status = 400; 
        return;
    }
    try {
        const post = await Post.findById(id); 
        if(!post) {
            ctx.status = 404; 
            return;
        }
        ctx.state.post = post; 
        return next();
    } catch(e) {
        ctx.throw(500, e); 
    }
    return next(); 
};

export const checkOwnPost = (ctx, next) => {
    const {user, post} = ctx.state; 
    if(post.user._id.toString() !== user._id) {
        ctx.status = 403; 
        return; 
    }
    return next(); 
};

// posts array init data
const posts = [
    {
        id: 1,
        title: "제목",
        body: "내용",
    },
];

/* 
post write 
POST /api/posts
{title, body}
*/
export const write = async ctx => {
// 검증과정 추가
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array()
            .items(Joi.string())
            .required(),
    });

//검증 후 실패 에러 처리
    const result = schema.validate(ctx.request.body);
    if(result.error) {
        ctx.status = 400; 
        ctx.body = result.error; 
        return;
    }
    
// 실제실행
    const {title, body, tags} = ctx.request.body; 
    const post = new Post({
        title, 
        body,
        tags,
        user: ctx.state.user,
    });
    try {
        await post.save(); 
        ctx.body = post; 
    } catch(e) {
        ctx.throw(500, e); 
    }
};

/*
post list read
GET /api/posts?username=&tag=&page=
*/
export const list = async ctx => {
    const page = parseInt(ctx.query.page || '1', 10);

    if(page < 1) {
        ctx.status = 400; 
        return;
    }

    const {tag, username} = ctx.query; 

    const query = {
        ...(username ? {'user.username': username} : {}),
        ...(tag ? {tags: tag} : {}),
    };

    try {
        const posts = await Post.find(query)
        .sort({_id: -1})
        .limit(10)
        .skip((page-1) * 10)
        .exec();

        const postCount = await Post.countDocuments(query).exec(); 
        ctx.set('Last-Page', Math.ceil(postCount/10)); 

        ctx.body = posts
        .map(post => post.toJSON())
        .map(post => ({
            ...post,
            body:
                post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`
        })); 
    } catch(e) {
        ctx.throw(500, e); 
    }
};

/*
id post read
GET /api/posts/:id
*/
export const read = async ctx => {
    ctx.body = ctx.state.post; 
};

/*
id post delete
DELETE /api/posts/:id
*/
export const remove = async ctx => {
    const {id} = ctx.params; 
    try {
        await Post.findByIdAndRemove(id).exec(); 
        ctx.status = 204; 
    } catch(e) {
        ctx.throw(500, e); 
    }
};

/*
post change
PUT /api/posts/:id
{title, body}
기본 내용을 새로 만듦. 
기존의 것이 날아감. 
62087258343f7c21770834af
*/
export const replace = ctx => {
    const {id} = ctx.params; 
    const index = posts.findIndex(element => element.id.toString() === id);
    
    if(index == -1) {
        ctx.status = 404; 
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    
    posts[index] = {
        id, 
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};

/*
post update
PATCH /api/posts/:id
{title, body}
기본 내용에 변경을 가함. 
변경이 없는 것들은 유지됨.
6208725c343f7c21770834b1 
*/
export const update = async ctx => {
    const {id} = ctx.params; 

    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array()
            .items(Joi.string()),
    });

    const result = schema.validate(ctx.request.body); 
    if(result.error) {
        ctx.status = 400; 
        ctx.body = result.error; 
        return; 
    }

    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true,
        }).exec(); 
        if(!post) {
            ctx.status = 404; 
            return;
        }
        ctx.body = post; 
    } catch(e) {
        ctx.throw(500, e); 
    }
};
