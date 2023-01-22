import React, { useState, useEffect } from "react";

type User = {
  username: string;
};

const ApiFetch = () => {
  const [user, setUser] = useState<User>({ username: "" });
  useEffect(() => {
    (async () => {
      const response = await fetch("/users", { method: "GET" });
      const data: User = await response.json();
      setUser(data);
    })();
  }, []);
  return (
    <div>
      <p>{user.username}</p>
    </div>
  );
};

export default ApiFetch;
