"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { PortfolioProfile } from "@/app/api/configuration/route";

interface ConfigurationContextType {
  configuration: PortfolioProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ConfigurationContext = createContext<
  ConfigurationContextType | undefined
>(undefined);

interface ConfigurationProviderProps {
  children: ReactNode;
}

export const ConfigurationProvider: React.FC<ConfigurationProviderProps> = ({
  children,
}) => {
  const [configuration, setConfiguration] = useState<PortfolioProfile | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfiguration = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/configuration");

      if (!response.ok) {
        throw new Error(
          `Failed to fetch configuration: ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (data && data.config && data.config.config) {
        // Parse the JSON string from the Appwrite document
        const parsedConfig = JSON.parse(data.config.config);
        setConfiguration(parsedConfig);
      } else {
        throw new Error("Invalid configuration data structure");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch configuration";
      setError(errorMessage);
      console.error("Configuration fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfiguration();
  }, []);

  const value: ConfigurationContextType = {
    configuration,
    loading,
    error,
    refetch: fetchConfiguration,
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = (): ConfigurationContextType => {
  const context = useContext(ConfigurationContext);

  if (context === undefined) {
    throw new Error(
      "useConfiguration must be used within a ConfigurationProvider",
    );
  }

  return context;
};
