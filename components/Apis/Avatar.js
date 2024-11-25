import axios from 'axios';
import Cookies from 'js-cookie';

export const createAvatar = async (body) => {
  try {
    const accessToken = Cookies.get('accessToken');
    // var myHeaders = new Headers();
    const headers = {
      'x-api-key': '449772DE-2780-4412-B9F7-E49E48605875',
      Authorization: `Bearer ${accessToken}`,
      // 'Content-Type': 'multipart/form-data',
    };
    let formdata = new FormData();
    formdata.append('name', body.name);
    formdata.append('image', body.image);
    formdata.append('category', JSON.stringify(body.category));

    const response = await axios.post(
      `https://api.lawinzo.com/avatar/create`,
      formdata,
      {
        headers,
      }
    );

    if (response.status === 200) {
      const { data } = response.data;
      console.log('Avatar created:', data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAvatar = async (pageNumber, pageSize) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    const params = new URLSearchParams();
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
    const urlWithParams = `${`https://api.lawinzo.com/avatar/avatars`}?${params.toString()}`;
    const response = await axios.get(urlWithParams, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAvatar = async (avatarId) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    const urlWithParams = `${`https://api.lawinzo.com/avatar/delete`}/${avatarId}`;
    const response = await axios.delete(urlWithParams, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const publishAvatar = async (avatarId) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    const urlWithParams = `${`https://api.lawinzo.com/avatar/publishAvatar`}/${avatarId}`;
    const response = await axios.post(urlWithParams, {}, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateAvatar = async (avatarId, body) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };

    let formdata = new FormData();
    formdata.append('name', body.name);
    formdata.append('image', body.image);
    formdata.append('category', body.category);
    console.log('Api', formdata);

    const urlWithParams = `${`https://api.lawinzo.com/avatar/updateAvatar`}/${avatarId}`;
    const response = await axios.post(urlWithParams, formdata, { headers });
    if (response.status === 200) {
      console.log('Updated', response?.data);
      return response?.data;
    }
  } catch (error) {
    console.log('Error in editing avtar : ', error);
  }
};
