import DeliveryForm from '../DeliveryForm';

export default function DeliveryFormExample() {
  return (
    <DeliveryForm 
      onSubmit={async (data) => {
        console.log('Delivery form submitted:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }}
    />
  );
}
