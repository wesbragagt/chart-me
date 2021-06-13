import React from 'react'
import Button from '@material-ui/core/Button'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'

export const Authentication: React.FC = ({ children }) => {
    return (
        <Auth0Provider
            domain={process.env.REACT_APP_DOMAIN as string}
            clientId={process.env.REACT_APP_CLIENT_ID as string}
            redirectUri={window.location.origin}
            returnTo={window.location.origin}
            cacheLocation="localstorage"
            useRefreshTokens
        >
            {children}
        </Auth0Provider>
    )
}

export const SignIn: React.FC = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <Button
            size="small"
            variant="contained"
            onClick={() => loginWithRedirect()}
        >
            Sign In to save your charts
        </Button>
    )
}

export const SignOut: React.FC = () => {
    const { logout } = useAuth0()
    return (
        <Button size="small" variant="contained" onClick={() => logout()}>
            Sign Out
        </Button>
    )
}
