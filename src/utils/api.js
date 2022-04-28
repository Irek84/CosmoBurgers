export const ROOT_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const getIngredients = async () => {
    const res = await fetch(ROOT_API_URL + '/ingredients');
    const data = await checkResponse(res);
    if (data?.success)
        return data.data;
    return Promise.reject(data);
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
    if (data?.success)
        return data.order.number;
    return Promise.reject(data);
}