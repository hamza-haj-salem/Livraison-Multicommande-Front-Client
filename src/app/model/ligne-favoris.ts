import { Favoris } from "./favoris";
import { Produit } from "./produit";

export class LigneFavoris {
    public idLigneFavoris:number;
    public produit:Produit;
    public favoris:Favoris;

    constructor(){}

    public set $idLigneFavoris(x:number){
        this.$idLigneFavoris=x;
    }
    public set $produit(x:Produit){
        this.$produit=x;
    }
    public set $favoris(x:Favoris){
        this.$favoris=x;
    }
}
