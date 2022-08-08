// pages/index.js

import React, { useEffect, useRef } from "react";

export default function() {
  const containerRef = useRef(null);

  useEffect(() => {
    let instance, PSPDFKit:any;
    (async function() {
      PSPDFKit = await import("pspdfkit");
      instance = await PSPDFKit.unload({
        container: containerRef.current,
        document: "/example.pdf",
        baseUrl: `${window.location.protocol}//${window.location.host}/`
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(containerRef.current);
  }, []);

  return <div ref={containerRef} style={{ height: "100vh"}}/>
  
}