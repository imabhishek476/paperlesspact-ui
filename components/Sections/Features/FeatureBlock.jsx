import React from 'react';
import Feature from './Feature';

function FeatureBlock({ featureBlock }) {
  console.log(featureBlock);
  return (
    <div className="lg:py-20 py-10">
      {featureBlock.map((e, i) => {
        if (i % 2 === 0) {
          return <Feature key={i} feature={e} />;
        } else {
          return <Feature key={i} feature={e} reverse={true} />;
        }
      })}
    </div>
  );
}

export default FeatureBlock;
