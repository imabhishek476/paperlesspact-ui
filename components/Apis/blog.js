import axios from 'axios';
import Cookies from 'js-cookie';

export const getBlogs = async (court, type, pageNumber, pageSize, language) => {
  try {
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization:
        'Bearer eyJyb2xlIjpbIlJPTEVfTEFXWUVSIiwiUk9MRV9BRE1JTiJdLCJpZCI6IjY0ZTVlNGUwNzlhOTczZjM2ZTc4ZWY5ZSIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5ODc2NTQzMjEwIiwiaWF0IjoxNjk0MDgxMjcxLCJleHAiOjIwMDk3MDA0NzF9.Q5uHDj7U_LH-bEAzpXidkwIKRCupor4NFv1pyfpUONnEdxnzqggbTs-MoCbsy1tyGQWUtBayVjk2kllHZhh7dQ',
    };
    const url = `https://api.easedraft.com/api/v1/judgments`;

    const params = new URLSearchParams();
    params.append('page', pageNumber);
    params.append('isActive', 1);
    params.append('size', pageSize);

    if (court) {
      params.append('court', court);
    }
    console.log(type);
    if (type) {
      params.append('isJudgement', type);
      params.append('type', type);
    }
    if (language) {
      console.log(language);
      params.append('language', language);
    }
    const urlWithParams = `${url}?${params.toString()}`;
    console.log(urlWithParams);
    const response = await axios.get(urlWithParams, { headers });

    // console.log(response);
    if (response.status === 200) {
      // console.log("case report fetched", response);
      return response?.data;
    }
  } catch (e) {
    console.log(e);
  }
};
export const getBlogsById = async (id, type) => {
  try {
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization:
        'Bearer eyJyb2xlIjpbIlJPTEVfTEFXWUVSIiwiUk9MRV9BRE1JTiJdLCJpZCI6IjY0ZTVlNGUwNzlhOTczZjM2ZTc4ZWY5ZSIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5ODc2NTQzMjEwIiwiaWF0IjoxNjk0MDgxMjcxLCJleHAiOjIwMDk3MDA0NzF9.Q5uHDj7U_LH-bEAzpXidkwIKRCupor4NFv1pyfpUONnEdxnzqggbTs-MoCbsy1tyGQWUtBayVjk2kllHZhh7dQ',
    };
    let urlWithParams;
    if (type === 'Judgement') {
      urlWithParams = `https://api.easedraft.com/api/v1/judgments/${id}?isJudgement=Judgement`;
    } else {
      urlWithParams = `https://api.easedraft.com/api/v1/judgments/${id}?isJudgement=None`;
    }
    const response = await axios.get(urlWithParams, { headers });

    // console.log(response);
    if (response.status === 200) {
      // console.log("case report fetched", response);
      return response?.data;
    }
  } catch (e) {
    console.log(e);
  }
};
export const createBlogs = async (body) => {
  try {
    const accessToken = Cookies.get('accessToken');
    // var myHeaders = new Headers();
    const headers = {
      'x-api-key': '449772DE-2780-4412-B9F7-E49E48605875',
      Authorization: `Bearer ${accessToken}`,
      // 'Content-Type': 'multipart/form-data',
    };
    let formdata = new FormData();
    formdata.append('coverImg', body.coverImg);
    formdata.append('title', body.title);
    formdata.append('thumbnail', body.thumbnail);
    formdata.append('authorProfile', body.authorProfile);
    formdata.append('type', JSON.stringify(body.category));
    formdata.append('desc', body.des);
    formdata.append('content', JSON.stringify(body.content));
    formdata.append('user', body.author);
    formdata.append('htmlContent', body.htmlContent);
    formdata.append('isActive', '1');
    formdata.append('isPublished', body.isPublished);
    formdata.append('seoLink', body.seoLink);
    formdata.append('userSocial', body.authorSocial);

    const response = await axios.post(
      `https://api.lawinzo.com/api/v1/easedraft/blogs/create`,
      // `http://api.lawinzo.com/api/v1/easedraft/blogs/create`,
      formdata,
      {
        headers,
      }
    );

    if (response.status === 200) {
      const { data } = response.data;
      console.log('Blog created:', data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllBlogs = async (pageNumber, pageSize) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    // const url = `https://api.easedraft.com/api/v1/judgments`;
    const params = new URLSearchParams();
    params.append("pageNumber", pageNumber);
    params.append("pageSize", pageSize);
    const urlWithParams = `${`https://api.lawinzo.com/api/v1/easedraft/blogs/postsByUser`}?${params.toString()}`;
    const response = await axios.get(urlWithParams, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteBlog = async (blogId) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    const urlWithParams = `${`https://api.lawinzo.com/api/v1/easedraft/blogs/posts`}/${blogId}`;
    const response = await axios.delete(urlWithParams, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const publishBlog = async (blogId) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    const urlWithParams = `${`https://api.lawinzo.com/api/v1/easedraft/blogs/publishPosts`}/${blogId}`;
    const response = await axios.post(urlWithParams, {}, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getBlogByLink = async (blogLink) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    const urlWithParams = `${`https://api.lawinzo.com/api/v1/easedraft/blogs/postsByLink`}/${blogLink}`;
    const response = await axios.get(urlWithParams, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllBlogsAll = async (pageSize) => {
  try {
    // const accessToken = Cookies.get('accessToken');
    // const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    // const headers = {
    //   'x-api-key': apiHeader,
    //   Authorization: `Bearer ${accessToken}`,
    // };
    // const url = `https://api.easedraft.com/api/v1/judgments`;
    const params = new URLSearchParams();
    params.append('pageNumber', 1);
    // params.append('isActive', 1);
    params.append('pageSize', pageSize);
    const urlWithParams = `${`https://api.lawinzo.com/api/v1/easedraft/blogs/posts`}?${params.toString()}`;
    const response = await axios.get(urlWithParams);
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateBlog = async (blogId, body) => {
  try {
    console.log(body);
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };


    let formdata = new FormData();
    formdata.append('coverImg', body.coverImg);
    formdata.append('title', body.title);
    formdata.append('thumbnail', body.thumbnail);
    formdata.append('authorProfile', body.authorProfile);
    formdata.append('type', JSON.stringify(body.category));
    formdata.append('desc', body.des);
    formdata.append('content', JSON.stringify(body.content));
    formdata.append('user', body.author);
    formdata.append('htmlContent', body.htmlContent);
    formdata.append('isActive', '1');
    formdata.append('isPublished', body.isPublished);
    formdata.append('seoLink', body.seoLink);
    formdata.append('userSocial', body.authorSocial);



    const urlWithParams = `${`https://api.lawinzo.com/api/v1/easedraft/blogs/posts`}/${blogId}`;
    const response = await axios.post(urlWithParams, formdata, { headers });
    if (response.status === 200) {
      console.log(response?.data);
      return response?.data;
    }
  } catch (error) {
    console.log('Error in editing blog : ', error);
  }
};
export const getBlogsByIds = async (blogId) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    const urlWithParams = `${`https://api.lawinzo.com/api/v1/easedraft/blogs/posts`}/${blogId}`;
    const response = await axios.get(urlWithParams, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log('Error in editing blog : ', error);
  }
};
