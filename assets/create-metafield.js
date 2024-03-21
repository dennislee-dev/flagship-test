const axios = require('axios');

// const shop = 'store.myshopify.com';
// const accessToken = 'token';

const createOrUpdateProductMetafield = async () => {
    try {
        const { data: { metafields } } = await axios.get(`https://${shop}/admin/api/2024-01/metafields.json?namespace=global&key=test`, {
            headers: {
                'X-Shopify-Access-Token': accessToken,
            },
        });

        let value = 0;

        if (metafields.length > 0) {
            const currentValue = parseInt(metafields[0].value, 10);
            value = currentValue + 1;

            await axios.put(`https://${shop}/admin/api/2024-01/metafields/${metafields[0].id}.json`, {
                metafield: {
                    id: metafields[0].id,
                    value: value.toString(),
                },
            }, {
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                },
            });
        } else {
            await axios.post(`https://${shop}/admin/api/2024-01/metafields.json`, {
                metafield: {
                    namespace: 'global',
                    key: 'test',
                    value: value.toString(),
                    value_type: 'integer',
                },
            }, {
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                },
            });
        }

        console.log('success');
    } catch (error) {
        console.error(error.response.data);
    }
};

createOrUpdateProductMetafield();