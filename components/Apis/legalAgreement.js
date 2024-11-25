import axios from 'axios';
import Cookies from 'js-cookie';

const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875'; //use env
const accessToken = Cookies.get('accessToken');

export const createRentalAgreement = async (accessToken, data, pageNo) => {
  try {
    if (!accessToken || !data || !pageNo) {
      throw Error('Missing required parameters in create rental agreement');
    }
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };

    const body = {
      ...data,
    };
    console.log(body);
    const response = await axios.post(
      `https://api.lawinzo.com/legalAgreement/rental?pageNo=${pageNo}`,
      body,
      {
        headers,
      }
    );

    if (response.status === 200) {
      const { data } = response.data;
      console.log('Rental Agreement created:', data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRentalAgreementById = async (accessToken, id) => {
  try {
    if (!accessToken || !id) {
      throw Error('Missing required parameters in  rental agreement by id');
    }
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(
      `https://api.lawinzo.com/node/legalAgreement/rentalById?id=${id}`,
      {
        headers,
      }
    );
    // console.log(response);

    if (response.status === 200) {
      const { data } = response.data;
      console.log('Rental Agreement fetched:', data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const signAgreement = async (id, userType, index, documentId) => {
  try {
    const accessToken = Cookies.get('accessToken');
    console.log(id, userType, index, accessToken);
    if (!accessToken || !id || !userType || !index) {
      throw Error('Missing required parameters in  rental agreement signing');
    }
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    let url = 'https://api.lawinzo.com/node/legalAgreement/rental/sign';
    let body = {
      rentalId: id,
      userType,
      index: parseInt(index),
    };
    if (userType === 'party1' || userType === 'party2') {
      url = 'https://api.lawinzo.com/node/legalAgreement/sign';
      body = {
        agreementId: id,
        userType,
        index: parseInt(index),
        documentId: documentId,
      };
    }
    const response = await axios.post(url, body, {
      headers,
    });

    if (response.status === 200) {
      const { data } = response.data;
      console.log('Rental Agreement signed', data);
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const notifyUnsigned = async (id, accessToken, agreementType) => {
  try {
    console.log(id, agreementType);
    if (!id || !agreementType) {
      throw Error('Missing required parameters in   agreement signing');
    }
    const headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    let url =
      'https://api.lawinzo.com/node/legalAgreement/rental/notifyUnsigned';
    let body = {
      rentalId: id,
    };
    if (agreementType !== 'rental') {
      url = 'https://api.lawinzo.com/node/legalAgreement/notifyUnsigned';
      body = {
        agreementId: id,
      };
    }
    const response = await axios.post(url, body, {
      headers,
    });

    if (response.status === 200) {
      const { data } = response.data;
      console.log('Notification sent', data);
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const createGeneralAgreement = async (data, pageNo) => {
  try {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken || !data || !pageNo) {
      throw Error('Missing required parameters in create  agreement');
    }
    let headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
    };
    let body = {
      ...data,
    };
    // if (pageNo === "1") {
    //   headers = {
    //     ...headers,
    //     'Content-Type': 'multipart/form-data',
    //   }

    //   const {documents,agreementId,stampAmount,title,agreementType} = data;
    //   const formData = new FormData();
    //   formData.append("agreementId", agreementId);
    //   formData.append("title", title);
    //   console.log(documents);
    //   if(documents&&documents.length>0){
    //     // documents.map((document)=>{
    //     //   formData.append("agreementUrls",document);
    //     // });
    //     formData.append("agreementUrls",document);
    //   }
    //   if(agreementType){
    //     formData.append("agreementType",agreementType);
    //   }

    //   body=formData;
    // }

    console.log(body);
    const response = await axios.post(
      `https://api.lawinzo.com/legalAgreement?pageNo=${pageNo}`,
      body,
      {
        headers,
      }
    );

    if (response.status === 200) {
      const { data } = response.data;
      console.log('Agreement created:', data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createAgreementDocument = async (documentObject) => {
  const accessToken = Cookies.get('accessToken');
  try {
    if (!accessToken || !documentObject) {
      throw Error('Required Params missing');
    }
    const blobUrl = documentObject?.document[0];
    let stampUrl = '';
    if (documentObject?.stampFile) {
      stampUrl = documentObject?.stampFile[0];
    }
    const formData = new FormData();
    if (documentObject?.document) {
      // formData.append("pdf",documentObject.document);
      formData.append('pdf', blobUrl);
    }
    if (documentObject?.name) {
      formData.append('name', documentObject?.name);
    }
    if (documentObject?.stampAmount) {
      formData.append('stampAmount', documentObject?.stampAmount);
    }
    if (stampUrl) {
      formData.append('stampFile', stampUrl);
    }
    console.log(formData.keys());
    let headers = {
      'x-api-key': apiHeader,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    };
    const response = await axios.post(
      'https://api.lawinzo.com/legalAgreement/addDocument',
      formData,
      {
        headers,
      }
    );
    if (response.status === 200) {
      return response?.data?.data;
    }
    return null;
  } catch (err) {
    console.log(err);
  }
};
