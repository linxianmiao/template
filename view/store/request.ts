
const DefineHeaders = {
    'content-type': 'application/json',
};

function buildOpts(options: any): any {
    const result = { ...options };
    const { headers } = result;
    if (!headers) {
        result.headers = { ...DefineHeaders };
    } else {
        result.headers = {
            ...DefineHeaders,
            ...headers,
        };
    }

  

    return result;
}

function exec(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const opts = buildOpts(options);
        const { method, url, headers, data } = opts;

        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        console.info(`Request: [${method}] ${url}`);

        if (headers) {
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
        }

        xhr.onerror = function (err) {
            reject(err);
        };
        xhr.ontimeout = function (err) {
            reject(err);
        };

        xhr.onreadystatechange = function () {
            const { readyState, status } = xhr;
            if (readyState === XMLHttpRequest.DONE) {
                let error: any = null;
                let data: any = xhr.responseText;
                if (xhr.getResponseHeader('content-type')?.indexOf('application/json') !== -1) {
                    try {
                        data = JSON.parse(xhr.responseText);
                    } catch (err) {
                        console.error(err);
                        error = err;
                    }
                }

                if (status >= 200 && status <= 300) {
                    resolve(data);
                } else {
                    reject({
                        xhr,
                        data,
                        error,
                    });
                }
            }
        };

        xhr.send(data ? JSON.stringify(data) : null);
    });
}

function fileUpload(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const { url, headers, fromData, onProgress } = options;

        const xhr = new XMLHttpRequest();

        xhr.ontimeout = (err: any) => reject(err);
        xhr.onerror = (err: any) => reject(err);

        if (onProgress) {
            xhr.upload.onprogress = onProgress;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let error: any = null;
                let data: any = xhr.responseText;
                if (xhr.getResponseHeader('content-type')?.indexOf('application/json') !== -1) {
                    try {
                        data = JSON.parse(xhr.responseText);
                    } catch (err) {
                        console.error(err);
                        error = err;
                    }
                }

                if (xhr.status >= 200 && xhr.status <= 300) {
                    resolve(data);
                } else {
                    reject({
                        xhr,
                        data,
                        error,
                    });
                }
            }
        };

        xhr.open('POST', url, true);
        if (headers) {
            Object.keys(headers).forEach(k => xhr.setRequestHeader(k, headers[k]));
        }
        xhr.timeout = 0;

        xhr.send(fromData);
    });
}

const get = function (url: string, headers?: any) {
    return exec({
        method: 'GET',
        url,
        headers,
    });
};

const post = function (url: string, body?: any, headers?: any) {
    return exec({
        method: 'POST',
        url,
        headers,
        data: body,
    });
};

const upload = function (url: string, fromData: any, headers?: any, onProgress?: any) {
    return fileUpload({
        url,
        headers,
        fromData,
        onProgress,
    });
};

export default {
    get,
    post,
    upload,
};
