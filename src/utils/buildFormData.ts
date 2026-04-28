export function buildFormData(dataObject: any): FormData {
    const formData = new FormData();
    for (const key in dataObject) {
        if (dataObject[key] !== null && dataObject[key] !== undefined) {
            formData.append(key, dataObject[key]);
        }
    }
    return formData;
}