import { useCallback } from 'react';

const COMMAND_API_URL = 'http://localhost:3000/api/commands';

const useCommand = () => {
  const executeCommand = useCallback(async (command) => {
    await fetch(COMMAND_API_URL, {
      body: command
    });
  }, []);

  // const command = {
  //   "type":"createObjective",
  //   "aggregateId":"4c46fe8d-9a00-42ac-8bb5-cf4708d0b6fe",
  //   "aggregateName":"objective",
  //   "payload":{"title":"New Objective","orgUnitId":"d9c50423-c9c9-49cc-a2f6-440c49622fb0","period":"19.2"}
  // }

  return [executeCommand];
};

export default useCommand;
