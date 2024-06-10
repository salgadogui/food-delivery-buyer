import { createStorage, type SimpleStorage } from '@/storage'

export class Auth {
    private storage: SimpleStorage

    constructor (persistent = false) {
        this.storage = createStorage(persistent)
    }

    async signIn(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
        console.log("Will sign in...");

        const body = {
            login: {
                email: email,
                password: password
            }
        };

        try {
            const response = await fetch("http://localhost:3000/sign_in", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-API-KEY": "pMzZsImP6EiKzqySwJ8mltFWSyI="
                },
                body: JSON.stringify(body)
            });

            if (response) {
                if (response.ok) {
                    this.success(response, onSuccess);
                } else {
                    this.failure(response, onFailure);
                }
            } else {
                console.error("No response received");
                onFailure();
            }
        } catch (error) {
            console.error("Error during sign in:", error);
            onFailure();
        }
    }

    success(response: Response, onSuccess: () => void) {
        response.json().then(
            (json) => {
                this.storage.store('token', json.token)
                this.storage.store('email', json.email)
                onSuccess()
            }
        )
    }

    failure(response: Response, onFailure: () => void) {
        onFailure()
    }

    loggedIn() {
        return Boolean(this.getFallback('token'))
    }

    currentUser() {
        if ( !this.loggedIn() ) {
            return null
        }

        return {
            email: this.getFallback('email')
        }
    }

    signOut(andThen = () => {}) {
        const transient = createStorage(false)
        const persistent = createStorage(true)

        transient.remove('token')
        transient.remove('email')
        persistent.remove('token')
        persistent.remove('email')

        andThen()
    }

    isLoggedIn() {
        return Boolean(this.getFallback('token'))
    }
    
    private getFallback(key:string):string | null {
        const transient = createStorage(false)
        const persistent = createStorage(true)

        return transient.get(key) || persistent.get(key)
    }

}
