import axios from 'axios';
import Cookies from 'js-cookie';
const apiURL = 'https://api.lawinzo.com/api/v1/easedraft';

export const getAllCategory =async(pageNumber=1, pageSize=3,published)=>{
    const accessToken = Cookies.get('accessToken');
    try {
        const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization:
      `Bearer ${accessToken}`,
        };

        const url=`${apiURL}/category/all`
        const params = new URLSearchParams();
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
    if(published){
        params.append('published',published)
    }

    const urlWithParams = `${url}?${params.toString()}`;
    console.log(urlWithParams);

        const response = await axios.get(
            urlWithParams,
            {headers}
        )
        console.log(response)
        if (response.status === 200) {
            return response?.data;
          }




    } catch (error) {
        console.log(error)
    }
}
export const getAllSubCategory =async(pageNumber=1, pageSize=3,published)=>{
    const accessToken = Cookies.get('accessToken');
    try {
        const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization:
      `Bearer ${accessToken}`,
        };

        const url=`${apiURL}/subCategory/all`
        const params = new URLSearchParams();
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
    if(published){
        params.append(published)
    }

    const urlWithParams = `${url}?${params.toString()}`;
    console.log(urlWithParams);

        const response = await axios.get(
            urlWithParams,
            {headers}
        )
        console.log(response)
        if (response.status === 200) {
            return response?.data;
          }

    } catch (error) {
        console.log(error)
    }
}

export const getCategoryById = async(categoryId)=>{
    const accessToken = Cookies.get('accessToken');
    try {
        const apiHeader = '449772DE-2780-4412-B9F7-E49E48605875';
    const headers = {
      'x-api-key': apiHeader,
      Authorization:
      `Bearer ${accessToken}`,
        };

        const url=`${apiURL}/category/`
        const params = new URLSearchParams();
    params.append('categoryId', categoryId);

    const urlWithParams = `${url}?${params.toString()}`;
    console.log(urlWithParams);

        const response = await axios.get(
            urlWithParams,
            {headers}
        )
        console.log(response)
        if (response.status === 200) {
            return response?.data;
          }
    } catch (error) {
        console.log(error)
    }
}

export const createTemplate = async (body) => {
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken)
    console.log(body);
    try {
      const myHeaders = new Headers();
      myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${accessToken}`);
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow',
      };
      const response = await fetch(
        `${apiURL}/folders/create/folder`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
};
export const createCategory = async (body) => {
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken)
    console.log(body);
    try {
      const myHeaders = new Headers();
      myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${accessToken}`);
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow',
      };
      const response = await fetch(
        `${apiURL}/category/create`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
};
export const createSubCategory = async (body) => {
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken)
    console.log(body);
    try {
      const myHeaders = new Headers();
      myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${accessToken}`);
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow',
      };
      const response = await fetch(
        `${apiURL}/subCategory/create`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
};

export const updateCategoryById = async(body)=>{
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken)
    console.log(body);
    try {
      const myHeaders = new Headers();
      myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${accessToken}`);
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow',
      };
      const response = await fetch(
        `${apiURL}/category/update`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
}
export const updateSubCategoryById = async(body)=>{
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken)
    console.log(body);
    try {
      const myHeaders = new Headers();
      myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${accessToken}`);
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow',
      };
      const response = await fetch(
        `${apiURL}/subCategory/update`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
}


  
export async function deleteNode(id) {
    try {
        const accessToken = Cookies.get('accessToken');
        const headers = {
            "Authorization": `Bearer ${accessToken}`,
            "x-api-key": '449772DE-2780-4412-B9F7-E49E48605875',
            "Content-Type": "application/json"
        }
        const response = await axios.post(
            `${apiURL}/folders/delete`,
            // `http://localhost:4000/api/v1/easedraft/folders/delete`,
            {id:id},
            {headers}
        );

        if (response.status === 200) {
            return response.data;
        }

        return null;
    } catch (err) {
        console.log(err);
    }
}
export async function deleteCategory(id) {
    try {
        const accessToken = Cookies.get('accessToken');
        const headers = {
            "Authorization": `Bearer ${accessToken}`,
            "x-api-key": '449772DE-2780-4412-B9F7-E49E48605875',
            "Content-Type": "application/json"
        }
        const response = await axios.post(
            `${apiURL}/category/delete?categoryId=${id}`,
            {},
            {headers}
        );

        if (response.status === 200) {
            return response.data;
        }

        return null;
    } catch (err) {
        console.log(err);
    }
}
export async function deleteSubCategory(id) {
    try {
        const accessToken = Cookies.get('accessToken');
        const headers = {
            "Authorization": `Bearer ${accessToken}`,
            "x-api-key": '449772DE-2780-4412-B9F7-E49E48605875',
            "Content-Type": "application/json"
        }
        const response = await axios.post(
            `${apiURL}/subCategory/delete?subCategoryId=${id}`,
            {},
            {headers}
        );

        if (response.status === 200) {
            return response.data;
        }

        return null;
    } catch (err) {
        console.log(err);
    }
}
  
export const getcompletedTemplateList = async (filter, pageNumber, size,timeFilter) => {
try {
    const accessToken= Cookies.get('accessToken');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("x-api-key", '449772DE-2780-4412-B9F7-E49E48605875');
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    };
    console.log(filter)
    const params = new URLSearchParams();
    if (filter?.isApproval===1) {
    console.log("hey",filter.isApproval);
    params.append("isApproval", '1');
    }
    if(filter?.isGlobal){
    params.append("isGlobal", '1')
    }
    if (timeFilter) {
    console.log("hey",timeFilter);
    params.append("timeFilter", timeFilter);
    }
    if (filter?.isApprovalneeded) {
    params.append("isApprovalneeded", "1");
    }
    if (filter?.isApproved === 1) {
    params.append("isApproved", "1");
    }
    if (filter?.isSuggested === 1) {
    params.append("isSuggested", "1");
    }
    if (filter?.isViewed === 1) {
    params.append("isViewed", "1");
    }
    if (filter?.isRejected === 1) {
    params.append("isRejected", "1");
    }
    if (filter?.timeFilter === 1) {
    params.append("timeFilter", "1");
    }
    // console.log(filter?.isActive);
    params.append("pageNumber", pageNumber);
    params.append("pageSize", size);
    const url = `${apiURL}/folders/templatesDashboard`;
    const urlWithParams = `${url}?${params.toString()}`;

    const res = await fetch(urlWithParams, requestOptions);
    const data = await res.json();
    if (data.success) {
    console.log(data)
    return data.data;
    }
} catch (error) {
    console.log(error.message);
}
};

export const publishTemplateById = async(body)=>{
const accessToken = Cookies.get('accessToken');
console.log(accessToken)
console.log(body);
try {
    const myHeaders = new Headers();
    myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${accessToken}`);
    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: 'follow',
    };
    const response = await fetch(
    `${apiURL}/folders/handlePublish`,
    requestOptions
    );
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
    return data;
    }
} catch (error) {
    console.log(error);
}
}
export const publishCategoryById = async(body)=>{
const accessToken = Cookies.get('accessToken');
console.log(accessToken)
console.log(body);
try {
    const myHeaders = new Headers();
    myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${accessToken}`);
    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: 'follow',
    };
    const response = await fetch(
    `${apiURL}/category/handlePublish`,
    requestOptions
    );
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
    return data;
    }
} catch (error) {
    console.log(error);
}
}
export const publishSubCategoryById = async(body)=>{
const accessToken = Cookies.get('accessToken');
console.log(accessToken)
console.log(body);
try {
    const myHeaders = new Headers();
    myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${accessToken}`);
    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: 'follow',
    };
    const response = await fetch(
    `${apiURL}/subCategory/handlePublish`,
    requestOptions
    );
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
    return data;
    }
} catch (error) {
    console.log(error);
}
}