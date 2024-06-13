import { defineStore } from 'pinia';
import { Auth } from '@/auth';
import FetchService from "@/fetchService";
import type { User } from '@/types/user';

const baseUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
const fetchService = new FetchService(baseUrl, authToken);

interface State {
  email: string;
  remember: boolean;
  loggedIn: boolean;
  token: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    email: localStorage.getItem('email') || sessionStorage.getItem('token') || '',
    remember: true,
    loggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || ''
  }),
  getters: {
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.loggedIn
  },

  actions: {
    signIn(email: string, password: string, remember: boolean) {
      const auth = new Auth(remember)
      auth.signIn(
        email,
        password,
        () => {
          this.updateCredentials(email, remember),
          this.router.push('/account'),
          this.$state.loggedIn = true
        },
        () => { this.$state.loggedIn = false, console.log("Não foi dessa vez!") }
      )
    },
    signOut() {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('token');
      this.$state.email = '';
      this.$state.token = '';
      this.$state.loggedIn = false;
      this.router.push("/")
    },
    updateCredentials(email: string, remember: boolean) {
      this.$state.email = email;
      this.$state.remember = remember;
      this.$state.token = localStorage.getItem('token') || sessionStorage.getItem('token')
    },
	async fetchUserId() {
		const data: User = await fetchService.fetchAll<User>("me");	
		return data
	}
  }  
});
