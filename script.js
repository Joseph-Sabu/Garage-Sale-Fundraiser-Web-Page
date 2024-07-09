document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("garage_sale").addEventListener("submit", function(event) {
        
        event.preventDefault();
        
        
        reciept();
    });

    function validateInputs(){
        const errors = [];

        const nameInput = document.getElementById('name').value;
        const emailInput = document.getElementById('email').value;
        const creditNumber = document.getElementById('credit_card').value;
        const creditExpiryMonth = document.getElementById('credit_expiry_month').value;
        const creditExpiryYear = document.getElementById('credit_expiry_year').value;

        const table_lamp_val = document.getElementById('table_lamp').value;
        const carpet_val = document.getElementById('carpet').value;
        const coffee_table_val = document.getElementById('coffee_table').value;
        const flower_vase_val = document.getElementById('flower_vase').value;
        const golf_set_val = document.getElementById('golf_set').value;

        const table_lamp = parseInt(document.getElementById('table_lamp').value) || 0;
        const carpet = parseInt(document.getElementById('carpet').value) || 0;
        const coffee_table = parseInt(document.getElementById('coffee_table').value) || 0;
        const flower_vase = parseInt(document.getElementById('flower_vase').value) || 0;
        const golf_set = parseInt(document.getElementById('golf_set').value) || 0;

        const nameRegex = /^[a-zA-Z\s]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const creditNumberRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        const creditExpiryMonthRegex = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;
        //const creditExpiryMonthRegex = /^(0[1-9]|1[0-2])$/;
        const creditExpiryYearRegex = /^\d{4}$/;

        if (!nameInput) errors.push("Name is required");
        if (nameInput && !nameRegex.test(nameInput)) errors.push("Name is in the wrong format");

        if (!emailInput) errors.push("Email is required");
        if (emailInput && !emailRegex.test(emailInput)) errors.push("Email is in the wrong format");

        if (!creditNumber) errors.push("Card number is required");
        if (creditNumber && !creditNumberRegex.test(creditNumber)) errors.push("Card number is in the wrong format");

        if (!creditExpiryMonth) errors.push("Credit card expiry month required");
        if (creditExpiryMonth && !creditExpiryMonthRegex.test(creditExpiryMonth)) errors.push("Credit card expiry month is in the wrong format");

        if (!creditExpiryYear) errors.push("Credit card expiry year required");
        if (creditExpiryYear && !creditExpiryYearRegex.test(creditExpiryYear)) errors.push("Credit card expiry year is in the wrong format");

        if (isNaN(table_lamp_val)|| isNaN(carpet_val) || isNaN(coffee_table_val) || isNaN(flower_vase_val) || isNaN(golf_set_val)) errors.push("Enter a valid Quantity");
                

        const TotalItems = table_lamp + carpet + coffee_table + flower_vase + golf_set;
        if (TotalItems === 0) errors.push('Must buy at least one item for checkout');

        return errors;
    }

    function reciept() {
        const errors = validateInputs();
        const errors_section = document.getElementById('errors_div');
        const reciept_section = document.getElementById('reciept_div');

        errors_section.innerHTML = '';
        reciept_section.innerHTML = '';

        if (errors.length > 0) {
            errors_section.innerHTML = errors.join('<br>');
            return;
        }

        const nameInput = document.getElementById('name').value;
        const emailInput = document.getElementById('email').value;
        const creditNumber = document.getElementById('credit_card').value;
        const table_lamp = parseInt(document.getElementById('table_lamp').value) || 0;
        const carpet = parseInt(document.getElementById('carpet').value) || 0;
        const coffee_table = parseInt(document.getElementById('coffee_table').value) || 0;
        const flower_vase = parseInt(document.getElementById('flower_vase').value) || 0;
        const golf_set = parseInt(document.getElementById('golf_set').value) || 0;

        const Credit_card_hidden = creditNumber.slice(-4);
        const Final_Price = ((table_lamp * 15) + (carpet * 20) + (coffee_table * 30) + (flower_vase * 10) + (golf_set * 50));
        const Donation = Math.max(10, Final_Price * 0.1);
        const grand_total = Final_Price + Donation;

        let reciept_val = `
            <h1>Receipt</h1>
            <h2>Thank you for your purchase</h2>
            <div class="table_data">
            <table border="1">
                <tr>
                    <td><b>Name</td>
                    <td>${nameInput}</td>
                </tr>
                <tr>
                    <td> <b> Email</td>
                    <td>${emailInput}</td>
                </tr>
                <tr>
                    <td> <b> Credit Card Number</td>
                    <td>**** **** **** ${Credit_card_hidden}</td>
                </tr>
            </table>
            <br>
            <table border="1">
                <tr>
                    <td> <b> Item</td>
                    <td> <b> Quantity</td>
                    <td> <b> Unit Price</td>
                    <td> <b> Total Price</td>
                </tr>`;

        if (table_lamp) {
            reciept_val += `
                <tr>
                    <td>Table Lamp</td>
                    <td>${table_lamp}</td>
                    <td>$15</td>
                    <td>$${table_lamp * 15}</td>
                </tr>`;
        }
        if (carpet) {
            reciept_val += `
                <tr>
                    <td>Carpet</td>
                    <td>${carpet}</td>
                    <td>$20</td>
                    <td>$${carpet * 20}</td>
                </tr>`;
        }
        if (coffee_table) {
            reciept_val += `
                <tr>
                    <td>Coffee Table</td>
                    <td>${coffee_table}</td>
                    <td>$30</td>
                    <td>$${coffee_table * 30}</td>
                </tr>`;
        }
        if (flower_vase) {
            reciept_val += `
                <tr>
                    <td>Flower Vase</td>
                    <td>${flower_vase}</td>
                    <td>$10</td>
                    <td>$${flower_vase * 10}</td>
                </tr>`;
        }
        if (golf_set) {
            reciept_val += `
                <tr>
                    <td>Golf Set</td>
                    <td>${golf_set}</td>
                    <td>$50</td>
                    <td>$${golf_set * 50}</td>
                </tr>`;
        }
        
            reciept_val += `    
            <tr>
                <td colspan = "3"> <b> Donations ($10 or 10% of Total)</td>
                <td> <b> $${Donation.toFixed(2)} </td>
            </tr>`

            reciept_val +=`
            <tr>
                <td colspan = "3"> <b> Grand Total </td>
                <td> <b> $${grand_total.toFixed(2)} </td>
            </tr>
            </table>
            </div>`
        
        reciept_section.innerHTML = reciept_val;
       
    }
});
