import { Client } from "./client";
import { Produit } from "./produit";

export class CommenterProduit {
    public id:number;
    public titre:string;
    public contenu:string;
    public client:Client;
    public produit:Produit;
    public nbrEtoile:number;

    public set $nbrEtoile(x:number){
        this.$nbrEtoile=x;
    }

    public set $id(x:number){
        this.$id=x;
    }
    public set $titre(x:string){
        this.$titre=x;
    }
    public set $contenu(x:string){
        this.$contenu=x;
    }
    public set $client(x:Client){
        this.$client=x;
    }
    public set $produit(x:Produit){
        this.$produit=x;
    }
}
