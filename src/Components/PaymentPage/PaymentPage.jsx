import { useState } from 'react';
import { Input, Button, App } from 'antd';
import { useNavigate } from 'react-router';
import './Payment.css';

export function PaymentPage() {

    const navigate = useNavigate();
    const { message } = App.useApp();

    const [formData, setFormData] = useState({
        name: '',
        cardNo: '',
        expiry: '',
        cvv: '',
    });

    const price = JSON.parse(localStorage.getItem('total'));

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = () => {
        if (
            formData.name !== '' &&
            formData.cardNo.length === 16 &&
            formData.expiry.length === 5 &&
            formData.cvv.length === 3
        ) {
            navigate('/paymentsuccessful');
        } else {
            message.error('Please enter valid card details.');
        }
    };

    return (
        <div className="payment">

            <div className="pricePage">
                <p>TO PAY ONLY</p>
                <h1>Rs. {price} /-</h1>
            </div>

            <div className="paymentBox">
                <h1 id="mypay">Your card details</h1>

                <div className="paymentFields">
                    <Input size="large" id="name" placeholder="Name on card" onChange={handleChange} />
                    <Input size="large" id="cardNo" placeholder="Card number (16 digits)" maxLength={16} onChange={handleChange} />
                    <div className="paymentRow">
                        <Input size="large" id="expiry" placeholder="MM/YY" maxLength={5} onChange={handleChange} />
                        <Input.Password size="large" id="cvv" placeholder="CVV" maxLength={3} onChange={handleChange} />
                    </div>
                </div>

                <Button id="paymentBtn" type="primary" block size="large" onClick={handleSubmit}>
                    Pay Rs. {price} /-
                </Button>
            </div>

        </div>
    );
}
