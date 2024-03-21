document.addEventListener('DOMContentLoaded', () => {
    let customForm = document.querySelector('.custom-form__container');

    if (customForm) {
        let submitBtn = customForm.querySelector('.custom-form__button');
        let formInputs = customForm.querySelectorAll('.custom-form__input');

        submitBtn.addEventListener('click', () => {
            let formData = { items: [] };
            formInputs.forEach(input => {
                if (input.value > 0) formData.items.push({ id: input.getAttribute('data-variant-id'), quantity: input.value });
            })

            if (formData.items.length > 0) {
                fetch(window.Shopify.routes.root + 'cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(response => {
                        window.location = window.routes.cart_url;
                        return response.json();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        })
    }
})