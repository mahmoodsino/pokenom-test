export const getHeader = (
    isMultipart: boolean = false,
    extra: object = {}
): object => {
    const base = {
        Accept: 'application/json',
        'Content-Type': isMultipart
            ? 'multipart/form-data; boundary=<calculated when request is sent>'
            : 'application/json',
    };

    return {
        ...base,
        extra,
    };
};
