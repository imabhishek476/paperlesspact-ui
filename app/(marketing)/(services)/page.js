import Footer from '../../../components/Footer/Footer';
import AiFeature from '../../../components/Sections/AIFeature/AiFeature';
import FeatureBlock from '../../../components/Sections/Features/FeatureBlock';
import FeatureGallery from '../../../components/Sections/Features/FeatureGallery';
import Blogs from '../../../components/Sections/Features/Blogs';
import Faq from '../../../components/Sections/Features/Faq';
import FaqAccordion from '../../../components/Sections/Features/FaqAccordion'
import Hero from '../../../components/Sections/Hero/Hero';
import Hero2 from '../../../components/Sections/Hero/Hero2';
import PricingComponent from '../../../components/Sections/Pricing/PricingComponent';
import Stats from '../../../components/Sections/Stats/Stats';
import TestimonialWrapper from '../../../components/Sections/Testimonial/TestimonialWrapper';
import Testinomial from '../../../components/Sections/Testimonial/Testinomial';
import UseCases from '../../../components/Sections/UseCases/UseCases';
import LexicalEditor from '../../../components/Lexical/index';

export default async function Home() {
  const data = await fetch(
    'https://plp-home-ui.s3.ap-south-1.amazonaws.com/landingpage.json',
    { cache: 'no-store' }
  );
  const document = await data.json();
  return (
    <main>
      {true && <Hero2 />}
      {/* <CreateBlogs /> */}
      {/* <LexicalEditor /> */}
      <FeatureGallery />
      <Stats stats={document.stats} />
      <UseCases usecases={document.usecases} />
      <FeatureBlock
        featureBlock={[document.feature1, document.feature2, document.feature3]}
        />
      {/* <AiFeature aifeature={document.aifeature} /> */}
      <TestimonialWrapper testinomial={document.testimonial} />
      <Blogs/>
      {/* <FaqAccordion/> */}
      <Faq/>
    </main>
  );
}
