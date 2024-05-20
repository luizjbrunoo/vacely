import './App.css';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';

 function Quicksight() {
  const dashboardRef = useRef([]);
  const [embeddedDashboard, setEmbeddedDashboard] = useState(null);
  const [dashboardUrl, setDashboardUrl] = useState(null);
  const [embeddingContext, setEmbeddingContext] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch("https://s2ipunu7rd.execute-api.us-east-1.amazonaws.com/dev/generate-embed-url"
      ).then((response) => response.json()
      ).then((response) => {
        setDashboardUrl(response.EmbedUrl)
      })
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  const createContext = async () => {
    const context = await createEmbeddingContext();
    setEmbeddingContext(context);
  }

  useEffect(() => {
    if (dashboardUrl) { createContext() }
  }, [dashboardUrl])

  useEffect(() => {
    if (embeddingContext) { embed(); }
  }, [embeddingContext])

  const embed = async () => {

    const options = {
      url: dashboardUrl,
      container: dashboardRef.current,
      height: "500px",
      width: "600px",
    };

    const newEmbeddedDashboard = await embeddingContext.embedDashboard(options);
    setEmbeddedDashboard(newEmbeddedDashboard);
  };

  return (
    <>
      <header>
        <h1>Embedded <i>QuickSight</i>: Build Powerful Dashboards in React</h1>
      </header>
      <main>
        <div ref={dashboardRef} />
      </main>
    </>
  );
};

export default Quicksight