import React, { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';

function Quicksight() {
  const dashboardRef = useRef(null); // Corrigido para usar null ao invés de []
  const [embeddedDashboard, setEmbeddedDashboard] = useState(null);
  const [dashboardUrl, setDashboardUrl] = useState(null);
  const [embeddingContext, setEmbeddingContext] = useState(null);

  // Fetch the URL for the QuickSight dashboard
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch("https://s2ipunu7rd.execute-api.us-east-1.amazonaws.com/dev/generate-embed-url");
        if (!response.ok) {
          console.log(response);
          throw new Error('Failed to fetch dashboard URL');
        }
        const data = await response.json();
        if (!data.EmbedUrl) {
          console.log(data);

          throw new Error('No EmbedUrl in response');
        }
        setDashboardUrl(data.EmbedUrl);
      } catch (error) {
        

        console.error('Error fetching dashboard URL:', error);
      }
    };

    fetchUrl();
  }, []);

  // Create embedding context
  useEffect(() => {
    const createContext = async () => {
      if (dashboardUrl) {
        try {
          const context = await createEmbeddingContext();
          setEmbeddingContext(context);
        } catch (error) {
          console.error('Error creating embedding context:', error);
        }
      }
    };

    createContext();
  }, [dashboardUrl]);

  // Embed the dashboard
  useEffect(() => {
    const embedDashboard = async () => {
      if (embeddingContext && dashboardUrl) {
        try {
          const options = {
            url: dashboardUrl,
            container: dashboardRef.current,
            height: "500px",
            width: "600px",
          };

          const newEmbeddedDashboard = await embeddingContext.embedDashboard(options);
          setEmbeddedDashboard(newEmbeddedDashboard);
        } catch (error) {
          console.error('Error embedding dashboard:', error);
        }
      }
    };

    embedDashboard();
  }, [embeddingContext, dashboardUrl]);

  // Cleanup embedded dashboard on component unmount
  useEffect(() => {
    return () => {
      if (embeddedDashboard) {
        embeddedDashboard.close();
      }
    };
  }, [embeddedDashboard]);

  return (
    <>
      <header>
        <h1>Embedded <i>QuickSight</i> Dashboard</h1>
      </header>
      <main>
        <div ref={dashboardRef} style={{ height: '500px', width: '600px' }} />
      </main>
    </>
  );
}

export default Quicksight;
