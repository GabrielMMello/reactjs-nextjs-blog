import React from 'react';

// username/repo format
const REPO_NAME = 'GabrielMMello/reactjs-nextjs-blog';

export const useUtterances = (commentNodeId: string): void => {
  React.useEffect(() => {
    const scriptParentNode = document.getElementById(commentNodeId);
    if (!scriptParentNode) return;

    // docs - https://utteranc.es/
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js'
    script.async = true;
    script.setAttribute('repo', REPO_NAME);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment :speech_balloon:');
    script.setAttribute('theme', 'photon-dark');
    script.setAttribute('crossorigin', 'anonymous');

    scriptParentNode.appendChild(script);

    const cleanup = (): void => {
      // cleanup - remove the older script with previous theme
      scriptParentNode.removeChild(scriptParentNode.firstChild as Node);
    };

    return cleanup;
  }, [commentNodeId]);
};

// Thanks to deadcoder0904 on https://github.com/utterance/utterances/issues/161
