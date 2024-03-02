import React, {useEffect} from 'react';

export default function Experience(props) {

  const {prefix} = props;

  return (
    <div className="w-full h-96 top-0 left-0 border-b border-white">
      <div id={`${prefix}/HEL Researcher`} className='h-48'>
        HEL Researcher
      </div>
      <div id={`${prefix}/CS160 TA`} className='h-20'>
        CS160 TA
      </div>
      <div id={`${prefix}/SWE Intern`} className='h-20'>
        Software Engineer Intern
      </div>
    </div>
  );
}