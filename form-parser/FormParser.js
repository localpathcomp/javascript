/** Class for Parsing HTML5 forms with ease. */

export default class FormParser {

    /**
     * @author Garrick Crouch
     * @description On success will clear form and reset formData object. On error will log response.
     * @param {string} formSelector - The string identifier for the class applied to all forms.
     * @summary Instantiate class, call init.
     */

    formData = {};
    formSelector = '';

    constructor(formSelector) {
        this.formSelector = formSelector;
    }

    async apiFetch(url = '', method = '', data = {}) {
        const response = await fetch(url, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    init() {
        document.querySelectorAll(this.formSelector).forEach((form) => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                [...e.target.elements].forEach((el) => {
                    this.formData[el.name] = el.value;
                });
                this.apiFetch(e.target.action, e.target.method, this.formData)
                    .then((data) => {
                        if (data.response === 'success') {
                            e.target.reset();
                            this.formData = {};
                        } else {
                            console.log(data.response);
                        }
                    });
            });
        });
    }

}