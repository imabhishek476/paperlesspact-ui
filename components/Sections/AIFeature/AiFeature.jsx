import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Check, ChevronRightIcon, MoveRight } from 'lucide-react';
import React from 'react';

const aifeature = {
  topic: 'The power of Artificial Intelligence',
  title: 'Meet your AI-contract colleague Ada',
  description:
    'Unleash Ada’s award-winning artificial intelligence: save time by errorless analysing & digitising contracts in under 1 minute.',
  list: [
    'No more manual errors',
    'No more repetitive tasks-overload',
    'Reducing administrative tasks by 50%',
  ],
  cta1: 'Schedule a demo',
  cta2: 'More about ADA',
  cta3: "What's Ada?",
};

function AiFeature({ aifeature }) {
  return (
    <div className="lg:py-20 py-10 hidden">
      <div className="container">
        <div className="flex justify-center">
          <Badge className="text-lg text-primary">{aifeature.topic}</Badge>
        </div>
        <div className="flex justify-center mt-5">
          <h2 className="lg:text-5xl text-2xl text-center lg:w-3/4">
            {aifeature.title}
          </h2>
        </div>
        <div className="lg:mx-20 mt-10">
          <div className="w-full aspect-[2/.8] lg:p-16 p-8 gap-5 border lg:rounded-3xl rounded-lg bg-gradient-to-b from-[#e6e6fc] to-[#e1f6ed] flex lg:flex-row flex-col items-center">
            <div className="w-full lg:w-[85%]">
              <p>{aifeature.description}</p>
              <ul className="mt-5">
                {aifeature.list.map((e, i) => {
                  return (
                    <li key={i} className="flex gap-2">
                      <Check size={24} className="text-primary" />{' '}
                      <p className="font-bold lg:text-lg">{e}</p>
                    </li>
                  );
                })}
              </ul>
              <div className="flex lg:flex-row flex-col mt-8 lg:items-center w-fit lg:w-full gap-2">
                <Button size="lg" className="font-bold w-full group py-6">
                  {aifeature.cta1}{' '}
                  <ChevronRightIcon
                    size={18}
                    className="relative group-hover:left-2 left-0 transition-all"
                  />
                </Button>
                <Button
                  variant="link"
                  className="gap-3 w-full group px-0 lg:px-3"
                >
                  {aifeature.cta2}{' '}
                  <MoveRight className="relative group-hover:left-2 left-0 transition-all" />
                </Button>
              </div>
            </div>
            <div className="w-full  relative lg:h-full top-14 lg:top-0">
              <div className="w-full aspect-video bg-background rounded-lg border relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-right-40">
                <video autoPlay={true} loop muted className="rounded-lg">
                  <source src={aifeature.vid} />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiFeature;
