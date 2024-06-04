import AppSheetAPI from "../appsheet/index"

interface ContactPhoneRow {
    CountryPrefix: number,
    Phone: string,
    Priority: number,
    Description: string,
    PhoneTypeIds: string
}

const appId = 'a9b7a96c-b1d4-4482-9b0e-26873df66d5b';
const accessKey = 'V2-1SWf1-koMzG-GPZXe-DmCLp-nxrwm-CireE-wWpHh-U8EQW';
const appSheetAPI = new AppSheetAPI(appId, accessKey);

const newRow: ContactPhoneRow = {
    CountryPrefix: 54,
    Phone: "1159142278",
    Priority: 1,
    Description: "Sending via API modified",
    PhoneTypeIds: "77a484bf"
};
try {
    const response = await appSheetAPI.addRow('ContactPhones', newRow);
    console.log(response.statusCode);
    console.log(response.data);
} catch (error) {
    console.error(error);
}
