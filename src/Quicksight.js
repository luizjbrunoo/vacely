// import React, { useEffect, useRef, useState } from 'react';
// import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';

// function Quicksight() {
//   const dashboardRef = useRef(null); // Corrigido para usar null ao invés de []
//   const [embeddedDashboard, setEmbeddedDashboard] = useState(null);
//   const [dashboardUrl, setDashboardUrl] = useState(null);
//   const [embeddingContext, setEmbeddingContext] = useState(null);

//   // Fetch the URL for the QuickSight dashboard
//   useEffect(() => {
//     const fetchUrl = async () => {
//       try {
//         const response = await fetch("https://s2ipunu7rd.execute-api.us-east-1.amazonaws.com/dev/generate-embed-url");
//         if (!response.ok) {
//           console.log(response);
//           throw new Error('Failed to fetch dashboard URL');
//         }
//         const data = await response.json();
//         if (!data.EmbedUrl) {
//           console.log(data);

//           throw new Error('No EmbedUrl in response');
//         }
//         setDashboardUrl(data.EmbedUrl);
//       } catch (error) {
        

//         console.error('Error fetching dashboard URL:', error);
//       }
//     };

//     fetchUrl();
//   }, []);

//   // Create embedding context
//   useEffect(() => {
//     const createContext = async () => {
//       if (dashboardUrl) {
//         try {
//           const context = await createEmbeddingContext();
//           setEmbeddingContext(context);
//         } catch (error) {
//           console.error('Error creating embedding context:', error);
//         }
//       }
//     };

//     createContext();
//   }, [dashboardUrl]);

//   // Embed the dashboard
//   useEffect(() => {
//     const embedDashboard = async () => {
//       if (embeddingContext && dashboardUrl) {
//         try {
//           const options = {
//             url: dashboardUrl,
//             container: dashboardRef.current,
//             height: "500px",
//             width: "600px",
//           };

//           const newEmbeddedDashboard = await embeddingContext.embedDashboard(options);
//           setEmbeddedDashboard(newEmbeddedDashboard);
//         } catch (error) {
//           console.error('Error embedding dashboard:', error);
//         }
//       }
//     };

//     embedDashboard();
//   }, [embeddingContext, dashboardUrl]);

//   // Cleanup embedded dashboard on component unmount
//   useEffect(() => {
//     return () => {
//       if (embeddedDashboard) {
//         embeddedDashboard.close();
//       }
//     };
//   }, [embeddedDashboard]);

//   return (
//     <>
//       <header>
//         <h1>Embedded <i>QuickSight</i> Dashboard</h1>
//       </header>
//       <main>
//         <div ref={dashboardRef} style={{ height: '500px', width: '600px' }} />
//       </main>
//     </>
//   );
// }

// export default Quicksight;


// import React, { useEffect, useRef, useState } from 'react';

// function Quicksight() {
//   const dashboardRef = useRef(null);
//   const [embeddedDashboard, setEmbeddedDashboard] = useState(null);

//   // Função para buscar a URL do dashboard
//   const fetchDashboardUrl = async () => {
//     try {
//       const response = await fetch("https://API_ENDPOINT/dev/generate-embed-url", {
//         method: 'GET',
//         headers: {
//           'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Substituir YOUR_ACCESS_TOKEN pelo token real
//         }
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to fetch dashboard URL');
//       return data.EmbedUrl;
//     } catch (error) {
//       console.error('Error:', error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     fetchDashboardUrl().then(embedUrl => {
//       const iframe = document.createElement('iframe');
//       iframe.src = embedUrl;
//       iframe.style.width = '600px';
//       iframe.style.height = '500px';
//       dashboardRef.current.appendChild(iframe);
//       setEmbeddedDashboard(iframe);
//     }).catch(console.error);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (embeddedDashboard) {
//         embeddedDashboard.remove();
//       }
//     };
//   }, [embeddedDashboard]);

//   return (
//     <div>
//       <h1>Embedded QuickSight Dashboard</h1>
//       <div ref={dashboardRef} />
//     </div>
//   );
// }

// export default Quicksight;


import React, { useEffect, useRef, useState } from 'react';

function Quicksight({ accessToken }) {  // Adiciona accessToken como prop
  const dashboardRef = useRef(null);
  const [embeddedDashboard, setEmbeddedDashboard] = useState(null);

  const fetchDashboardUrl = async () => {
    console.log("accessToken", accessToken);
    try {
      const response = await fetch("https://s2ipunu7rd.execute-api.us-east-1.amazonaws.com/dev/generate-embed-url", {
        method: 'GET',
        headers: {
          'Authorization': accessToken // Usa o accessToken passado como prop
        }
      });
      const data = await response.json();
      console.log(data)
      if (!response.ok) throw new Error(data.message || 'Failed to fetch dashboard URL');
      return data.EmbedUrl;
    } catch (error) {
      console.error('Error fetching dashboard URL:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDashboardUrl()
  }, []); 

  useEffect(() => {
    if (accessToken) {  // Certifica-se de que o accessToken está disponível
      fetchDashboardUrl().then(embedUrl => {
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.style.width = '100%';  // Ajusta a largura para ocupar todo o espaço disponível
        iframe.style.height = '100%';  // Ajusta a altura para ocupar todo o espaço disponível
        dashboardRef.current.appendChild(iframe);
        setEmbeddedDashboard(iframe);
      }).catch(console.error);
    }
  }, [accessToken]);  // Adiciona accessToken como dependência do useEffect

  useEffect(() => {
    return () => {
      if (embeddedDashboard) {
        embeddedDashboard.remove();
      }
    };
  }, [embeddedDashboard]);

  return (
    <div style={{ width: '100%', height: '100%' }}>  // Ajusta o estilo para ocupar todo o espaço disponível
      <h1>Embedded QuickSight Dashboard</h1>
      <div ref={dashboardRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default Quicksight;
