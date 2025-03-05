import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call another method
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
            //toast error;
        }
    }
    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
            // toast error
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
            // toast error
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions();
            //there are 2 different methods deleteSession and deleteSessions explore them. i think deleteSessions will logout user from every browser or every device from where user has been loged in.
        } catch (error) {
            throw error;
            //toast error
        }
    }
}

const authService = new AuthService();
export default authService

//we have done same work here as in documentation but we modified it using knowledge of javascript and appwrite documentation. I just created a class here and then created and exported its object.