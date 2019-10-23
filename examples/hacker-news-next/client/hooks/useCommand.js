import { useCallback } from 'react';

const COMMAND_API_URL = 'http://localhost:3000/api/commands';

const useCommand = () => {
  const executeCommand = useCallback(async (command) => {
    await fetch(COMMAND_API_URL, {
      body: command
    });
  }, []);

  return [executeCommand];
};

export default useCommand;
