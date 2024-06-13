import axios from 'axios';

interface RequestOptions {
    url: string;
    locationId: string;
    authorization: string;
    version: string;
    data?: any; //Data para un POST/PUT
}

export async function fetchData({ url, locationId, authorization, version }: RequestOptions): Promise<any> {
    const options = {
        method: 'GET',
        url: url,
        params: { locationId: locationId },
        headers: {
            Authorization: authorization,
            Version: version,
            Accept: 'application/json'
        }
    };
  
    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error('Error haciendo la solicitud GET:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        throw error;
    }
}


export async function postData({ url, locationId, authorization, version, data }: RequestOptions): Promise<any> {
    const options = {
        method: 'POST',
        url: url,
        params: { locationId: locationId },
        headers: {
            Authorization: authorization,
            Version: version,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: data
    };
  
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error haciendo la solicitud POST:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        throw error;
    }
}