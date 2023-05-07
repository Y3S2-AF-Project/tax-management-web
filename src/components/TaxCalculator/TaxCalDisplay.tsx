import { Card } from "antd";

const TaxCalDisplay: React.FC = () => {
  return (
    <div>
      <Card
        size="small"
        type="inner"
        title="Payments"
        style={{ width: '100%', justifyContent: "center"}}
      >
        <p>Monthly  : Rs.3000.00</p>
        <p>Annually : Rs.36,000.00</p>
      </Card>
    </div>
  );
};

export default TaxCalDisplay;
