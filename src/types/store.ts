export interface Store {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface UserStore {
    stores: Store[];
    authToken: string;
}