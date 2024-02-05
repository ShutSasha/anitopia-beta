// AuthContext.tsx
import React, { Dispatch, SetStateAction } from "react";

type AuthContextType = {
	setUsername: Dispatch<SetStateAction<string>>;
	setPassword: Dispatch<SetStateAction<string>>;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
	undefined
);
