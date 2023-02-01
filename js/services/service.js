const postForm = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await res.json();
};
const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`${url}: ${res.status}`);
    }

    return await res.json();
};

export {postForm};
export {getResource};