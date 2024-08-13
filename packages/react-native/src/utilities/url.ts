export const convertObjectToURLParams = (data: any) => {
    const params = Object.keys(data).map((key) => {
        const rc = data[key];

        if (rc !== undefined && rc !== null) {
            if (typeof rc !== 'string' && rc.length) {
                const arrayed_item = rc.map((value: string) => {
                    return `${key}[]=${encodeURIComponent(value)}`;
                }).join('&')

                return arrayed_item;
            } else if (typeof rc === 'boolean') {
                return `${key}=${encodeURIComponent(rc ? 1 : 0)}`;
            } else {
                return `${key}=${encodeURIComponent(rc)}`;
            }
        }
        return '';
    }).join('&');
    // console.log(params)
    return params;
}