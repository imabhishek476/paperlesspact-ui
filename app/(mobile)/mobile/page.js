import Hero3 from '../../../components/Sections/Hero/Hero3';

export default async function Home() {
  const data = await fetch(
    'https://plp-home-ui.s3.ap-south-1.amazonaws.com/landingpage.json',
    { cache: 'no-store' }
  );
  const document = await data.json();
  return (
    <main>
      <Hero3 />
    </main>
  );
}
