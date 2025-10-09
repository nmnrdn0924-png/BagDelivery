import AdvertiserSection from '../AdvertiserSection';

export default function AdvertiserSectionExample() {
  return (
    <AdvertiserSection 
      onSubmit={async (data) => {
        console.log('Advertiser form submitted:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }}
    />
  );
}
