import PricingComponent from '../../../components/Sections/Pricing/PricingComponent';

export default async function Pricing() {
  const pricingJson = await fetch(
    'https://plp-home-ui.s3.ap-south-1.amazonaws.com/subscription.json',
    { cache: 'no-store' }
  );
  const pricingData = await pricingJson.json();
  console.log(pricingData);
  return (
    <>
      <PricingComponent data={pricingData} />
    </>
  );
}
