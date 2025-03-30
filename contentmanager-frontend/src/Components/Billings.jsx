import React from 'react';
import '../Styles/Billings.css';

const Billings = () => {
  const plans = [
    { name: "Basic", price: "$10/month", features: ["1 user", "Basic features"] },
    { name: "Pro", price: "$30/month", features: ["5 users", "Advanced features"] },
    { name: "Enterprise", price: "$80/month", features: ["Unlimited users", "Premium support"] }
  ];

  return (
    <div className="billings-content">
      <h2 className="billings-title">Choose Your Plan</h2>
      <div className="billings-plans">
        {plans.map((plan, index) => (
          <div key={index} className="billings-card">
            <h3>{plan.name}</h3>
            <p className="billings-price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="billings-btn">Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Billings;