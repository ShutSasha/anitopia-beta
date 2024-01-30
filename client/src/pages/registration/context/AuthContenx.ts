// AuthContext.tsx
import React, { Dispatch, SetStateAction } from "react";

type AuthContextType = {
	setUsername: Dispatch<SetStateAction<string>>;
	setEmail: Dispatch<SetStateAction<string>>;
	setPassword: Dispatch<SetStateAction<string>>;
	setRepeatPassword: Dispatch<SetStateAction<string>>;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
	undefined
);
