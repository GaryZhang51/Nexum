"use client";
import {
    FunctionComponent,
    PropsWithChildren,
    createContext,
    useState,
} from "react";

interface AppContext {
    filter: Filter;
}

interface Filter {
    search: string;
    setSearch: (arg0: string) => void;
    tags: string[];
    setTags: (arg0: string[]) => void;
}

const AppContext = createContext<AppContext>({
    filter: { search: "", setSearch: () => {}, tags: [], setTags: () => {} },
});

const AppContextProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    return (
        <AppContext.Provider
            value={{
                filter: {
                    search,
                    setSearch,
                    tags,
                    setTags,
                },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
export { AppContextProvider };
