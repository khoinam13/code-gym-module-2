
class Customer {
    constructor(id, name, phone, address, email) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
    }
}

class CustomerManagement {
    constructor() {
        this.customers = [];
    }

    addCustomer(customer) {
        this.customers.push(customer);
        this.displayCustomers()
    }

    displayCustomers() {
        const customerRows = this.customers.map(customer => {
            return `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.address}</td>
                <td>${customer.email}</td>
            </tr>
        `;
        }).join('');
        document.getElementById('data-user').innerHTML = customerRows;
    }
}


const customerManagement = new CustomerManagement();

const customer1 = new Customer(1, "Nguyễn Văn A", "0901234567", "Hà Nội", "nguyenvana@gmail.com");
const customer2 = new Customer(2, "Trần Thị B", "0912345678", "TP. Hồ Chí Minh", "tranthib@gmail.com");

customerManagement.addCustomer(customer1);
customerManagement.addCustomer(customer2);

customerManagement.displayCustomers();

const form = document.getElementById('customer-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    const customerId = customerManagement.customers.length + 1;

    const newCustomer = new Customer(customerId, name, phone, address, email);
    customerManagement.addCustomer(newCustomer);
    form.reset();
});
