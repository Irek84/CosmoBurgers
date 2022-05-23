export const ROOT_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const checkSuccess = (data) =>{
    if (data?.success)
        return data;
    else
        return Promise.reject(data);
}

export const getIngredients = async () => {
    const res = await fetch(ROOT_API_URL + '/ingredients');
    const data = await checkResponse(res);
    return (await checkSuccess(data)).data;
}

export const createOrder = async (ingredientIds) => {
    const res = await fetch(ROOT_API_URL + "/orders", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ingredients": ingredientIds
        })
    });
    const data = await checkResponse(res);
    return await checkSuccess(data);
}