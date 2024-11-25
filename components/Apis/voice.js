import axios from 'axios';
import Cookies from 'js-cookie';

export const createAudio = async (body) => {
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
    formdata.append('audio', body.audio);
    formdata.append('image', body.image);
    formdata.append('categories', JSON.stringify(body.category));
    formdata.append('language', JSON.stringify(body.language));
    formdata.append('gender', body.gender);
    formdata.append('age', body.age);

    const response = await axios.post(
      `https://api.lawinzo.com/voice/create`,
      formdata,
      {
        headers,
      }
    );

    if (response.status === 200) {
      const { data } = response.data;
      console.log('Voice created:', data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAudio = async (pageNumber, pageSize) => {
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
    const urlWithParams = `${`https://api.lawinzo.com/voice/audio`}?${params.toString()}`;
    const response = await axios.get(urlWithParams, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAudio = async (voiceId) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    const urlWithParams = `${`https://api.lawinzo.com/voice/delete`}/${voiceId}`;
    const response = await axios.delete(urlWithParams, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const publishAudio = async (voiceId) => {
  try {
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    const urlWithParams = `${`https://api.lawinzo.com/voice/publishAudio`}/${voiceId}`;
    const response = await axios.post(urlWithParams, {}, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateAudio = async (voiceId, body) => {
  try {
    console.log('Api', body);
    const accessToken = Cookies.get('accessToken');
    const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };

    let formdata = new FormData();
    formdata.append('name', body.name);
    formdata.append('audio', body.audio);
    formdata.append('image', body.image);
    formdata.append('categories', body.category);
    formdata.append('language', body.language);
    formdata.append('gender', body.gender);
    formdata.append('age', body.age);

    const urlWithParams = `${`https://api.lawinzo.com/voice/updateAudio`}/${voiceId}`;
    const response = await axios.post(urlWithParams, formdata, { headers });
    if (response.status === 200) {
      console.log(response?.data);
      return response?.data;
    }
  } catch (error) {
    console.log('Error in editing voice : ', error);
  }
};
