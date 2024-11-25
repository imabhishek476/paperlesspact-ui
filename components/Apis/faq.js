import axios from 'axios';
import Cookies from 'js-cookie';




export const getAllFaq = async () => {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    const res = await axios.get("https://api.lawinzo.com/api/v1/faq/getAll", requestOptions);
    
    console.log(res);

    if (res) {
      return res;
    }
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error; // You might want to rethrow the error to handle it in the calling code
  }
};



export const getFaq = async (pageNumber, pageSize) => {
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
    const urlWithParams = `${`https://api.lawinzo.com/api/v1/faq/get`}?${params.toString()}`;
    const response = await axios.get(urlWithParams, { headers });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// export const postFaq = async (body) => {
//   try {
//     const Body = {
//       ...body,
//     };
//     const accessToken = Cookies.get('accessToken');
//     const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//       'x-api-key': apiHeader,
//     };

//     const response = await axios.post(
//       'https://api.lawinzo.com/api/v1/faq/create',
//       Body,
//       { headers }
//     );

//     if (response.status === 200) {
//       return response?.data;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };




export const postFaq = async (title, content, page) => {
    const accessToken = Cookies.get('accessToken');
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("x-api-key", "449772DE-2780-4412-B9F7-E49E48605875");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        "title": title,
        "message": content,
        "page": page
      });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const res = await fetch("https://api.lawinzo.com/api/v1/faq/create", requestOptions)
    console.log(res);
    if(res){
      const data = await res.json()
      console.log(data);
      return data;
    }
};

export const updateFaq = async (title, content, page, faqId) => {
    const accessToken = Cookies.get('accessToken');
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("x-api-key", "449772DE-2780-4412-B9F7-E49E48605875");
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
        "title": title,
        "message": content,
        "page": page
    });
    
    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const res = await fetch(`https://api.lawinzo.com/api/v1/faq/update/${faqId}`, requestOptions)
    console.log(res);
    if(res){
      const data = await res.json()
      console.log(data);
      return data;
    }
};


export const getFaqById = async (id) => {
    const accessToken = Cookies.get('accessToken');
    let myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${accessToken}`
    );
  myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const res = await fetch(
    `https://api.lawinzo.com/api/v1/faq/get/${id}`,
    requestOptions
  )
  console.log(res);
  if(res){
    const data = await res.json()
    console.log(data);
    return data;
  }
};


export const deleteFaq = async (faqId) => {
    const accessToken = Cookies.get('accessToken');
  let myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    `Bearer ${accessToken}`
  );
  myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');

  let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow',
  };

  const res = await fetch(
    `https://api.lawinzo.com/api/v1/faq/delete/${faqId}`,
    requestOptions
  )
  console.log(res);
  if(res){
    const data = await res.json()
    console.log(data);
    return data;
  }
};


