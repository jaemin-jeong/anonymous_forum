import db from '../models/index.cjs';
import sequelize, { Op, QueryTypes } from 'sequelize';
import { encrypt } from '../util/encrypt.js'
import { postRegistAlert } from '../util/alert.js'
import { convertDateFormat } from '../util/converter.js'

const community = {};

community.getPosts = async (req, res) => {
  const { query } = req;
  const whereQuery = {};
  
  try {
    if (query['title']) {
      whereQuery['title'] = {
        [Op.like]: '%' + query['title'] + '%'
      };
    }
  
    if (query['writer']) {
      whereQuery['writer'] = {
        [Op.like]: '%' + query['writer'] + '%'
      };
    }
  
    let {rows, count} = await db['tb_post'].findAndCountAll({
      attributes: ['idx', 'title', 'content', 'writer', 'create_date', 'up_date'],
      where: whereQuery,
      offset: Number(query['offset']),
      limit: Number(query['limit'])
    });
  
    rows = rows.map(row => {
      let item = row['dataValues'];
      item['create_date'] = convertDateFormat(item['create_date']);
      item['up_date'] = convertDateFormat(item['up_date']);
  
      return item;
    });
  
    res.send({ postList: rows, count });
  } catch(e) {
    console.error(e)
  }
}

community.createPost = async (req, res) => {
  const { body } = req;

  try {
    const pw = await encrypt(body['pw'], undefined);

    const createPost = await db['tb_post'].create({ 
      title: body['title'], 
      content: body['content'], 
      writer: body['writer'], 
      pw: pw['pawssword'],
      salt: pw['salt']
    });

    createPost['idx'] && postRegistAlert(body['title'] + ' ' + body['content'], createPost['idx']);

    res.send({ postIdx: createPost['idx'] });
  } catch(e) {
    console.error(e)
  };
}

community.editPost = async (req, res) => {
  const { params, body } = req;

  try {
    const findPost = await db['tb_post'].findByPk(params['idx']);
    const dataValue = findPost['dataValues']
    const inputPw = await encrypt(body['pw'], dataValue['salt']);

    if (inputPw['pawssword'] !== findPost['pw']) {
      res.status(401).send({ postIdx: findPost['idx'], isSuccess: 0, error: 'password is not correct' });
      return;
    };

    const editPost = await db['tb_post'].update({ 
      title: body['title'], 
      content: body['content'], 
      up_date: new Date() 
    }, {
      where: {
        idx: params['idx']
      }
    });

    res.send({ postIdx: findPost['idx'], isSuccess: editPost[0] });
  } catch(e) {
    console.error(e)
  }
}

community.deletePost = async (req, res) => {
  const { params, body } = req;

  try {
    let findPost = await db['tb_post'].findByPk(params['idx']);
    const inputPw = await encrypt(body['pw'], findPost['salt']);
  
    if (inputPw['pawssword'] !== findPost['pw']) {
      res.status(401).send({ postIdx: findPost['idx'], isSuccess: 0, error: 'password is not correct' });
      return;
    };
  
    const deletePost = await db['tb_post'].destroy({
      where: {
        idx: params['idx']
      }
    });
  
    res.send({ isSuccess : deletePost });
  } catch(e) {
    console.error(e)
  }
}

community.getComments = async (req, res) => {
  const { params, query } = req;
  let commentList = [];

  try {
    let { rows, count } = await db['tb_comment'].findAndCountAll({
      where: {
        post_idx: params['idx'],
        parent_idx: 0
      },
      offset: Number(query['offset']),
      limit: Number(query['limit'])
    });
  
    if (count === 0) {
      res.send({ commentList, count }); 
      return;
    };
  
    commentList = rows.map(row => {
      row['dataValues']['create_date'] = convertDateFormat(row['dataValues']['create_date']);
      row['dataValues']['up_date'] = convertDateFormat(row['dataValues']['up_date']);
  
      return row['dataValues'];
    });
  
    let childCommentList = await db['tb_comment'].findAll({
      where: {
        post_idx: params['idx'],
        parent_idx: {
          [Op.in]: commentList.map(item => item['idx'])
        },
      },
    });
  
    if (childCommentList.length) {
      childCommentList = childCommentList.map(item => {
        item['dataValues']['create_date'] = convertDateFormat(item['dataValues']['create_date']);
        
        return item['dataValues'];
      });
  
      const groupByParentIdx = childCommentList.reduce((prev, curr) => {
        if(!prev[curr['parent_idx']]) {
          prev[curr['parent_idx']] = [];
        };
  
        prev[curr['parent_idx']].push(curr);
  
        return prev;
      }, {});
  
      commentList = commentList.map(item => {     
        item['child_list'] = groupByParentIdx[item['idx']] ? groupByParentIdx[item['idx']] : [];
  
        return item;
      });
    }
  
    res.send({ commentList, count });
  } catch(e) {
    console.error(e);
  }
}

community.createComment = async (req, res) => {
  const { params, body } = req;

  try {
    const createComment = await db['tb_comment'].create({ 
      post_idx: params['idx'],
      parent_idx: body['parentIdx'],
      comment: body['comment'], 
      writer: body['writer']
    });
  
    if (createComment['idx']) {
      postRegistAlert(body['comment'], params['idx']);
    };
  
    const isSuccess = createComment['idx'] ? 1 : 0;
    res.send({ isSuccess });
  } catch(e) {
    console.error(e);
  }
};

export default community;