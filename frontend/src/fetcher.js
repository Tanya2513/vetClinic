function updateOptions(options) {
    const update = { ...options };
    if (localStorage.jwt) {
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${localStorage.jwt}`,
        };
    }
    return update;
}

export default async function fetcher(url, options) {

    return fetch(url, updateOptions(options)).then(async (response) => {
        const ResponseJSON = await response.json();
        if (ResponseJSON.statusCode === 401) {
            window.location = 'http://localhost:3000/login';
        }
        return ResponseJSON;
    })
}