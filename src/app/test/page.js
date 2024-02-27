"use client"

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const ScrollToChangeURL = () => {
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
    // Get the heights of sections on the page
    const originalUrlSection = document.getElementById('original-url');
    const newUrlSection = document.getElementById('new-url');

    if (!originalUrlSection || !newUrlSection) return;

    const scrollTop = window.scrollY;
    const originalUrlSectionTop = originalUrlSection.offsetTop;
    const newUrlSectionTop = newUrlSection.offsetTop;

    // Example logic: If scroll position is in the first section, update URL to '#original-url', 
    // and if in the second section, update URL to '#new-url'.
    if (scrollTop < newUrlSectionTop) {
        console.log('scrollTop', scrollTop, "newUrlSectionTop", newUrlSectionTop, "originalUrlSectionTop", originalUrlSectionTop);
        // router.replace('#original-url');
        window.history.replaceState({}, '', '#original-url');
    } else {
    //   router.replace('#new-url');
        window.history.replaceState({}, '', '#new-url');
    }
  };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [router]);

  return (
    <div>
      <div id="original-url" style={{ height: '1000px' }}>
        Scroll down to change URL
        </div>
        <div id="new-url"style={{ height: '1000px' }}>
        Scroll down to change URL 2
        </div>
        <div style={{ height: '1000px' }}>
        Scroll down to change URL 3
        </div>
    </div>
  );
};

export default ScrollToChangeURL;