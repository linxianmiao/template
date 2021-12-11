import React from 'react';

export const MobXProviderContext = React.createContext<any>({});


export function Provider(props: any) {
    const { children, ...stores } = props
    const parentValue = React.useContext(MobXProviderContext)
    const mutableProviderRef = React.useRef({ ...parentValue, ...stores })
    const value = mutableProviderRef.current

    return <MobXProviderContext.Provider value={value}>{children}</MobXProviderContext.Provider>
}
Provider.displayName = "MobXProvider"


export function useStores() {
    const storeCtx = React.useContext(MobXProviderContext)

    return storeCtx;
}