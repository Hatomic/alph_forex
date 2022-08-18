'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let url = 'https://pro.ip-api.com/json';

    const params = new URL(document.location).searchParams;

    const magic = params.get('magic_ip');

    if (magic) url += '/' + magic;

    const targetCountries = {
        EG: 'Egypt',
        SA: 'Saudi Arabia',
        QA: 'Qatar',
        KW: 'Kuwait',
        OM: 'Oman',
        JO: 'Jordan',
        AE: 'United Arab Emirates',
    };

    let removeTable = true;

    const updateTable = () => {
        if (removeTable) jQuery('.country-table').hide();
        if (!removeTable) jQuery('.generic-table').hide();
    };

    jQuery.ajax(url, {
        success: (data) => {
            removeTable = targetCountries[data.countryCode] === undefined;
        },
        complete: updateTable,
        data: {
            key: 'joo1Uvji06yDxFg', // token
            fields: 'countryCode', // ISO 3166-1 alpha-2
        },
    });
});