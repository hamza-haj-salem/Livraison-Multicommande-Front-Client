import { LigneFavoris } from './ligne-favoris';
import { Client } from './client';
export class Favoris {
    public idFavoris:number;
    public ligneFavoris: LigneFavoris[];
    public client: Client;

    constructor(){}
    
    public set $idFavoris(x:number){
        this.$idFavoris=x;
    }
    public set $ligneFavoris(x:LigneFavoris[]){
        this.$ligneFavoris=x;
    }
    public set $client(x:Client){
        this.$client=x;
    }
}
