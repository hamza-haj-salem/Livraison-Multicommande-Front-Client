import { SousCategorie } from "./sous-categorie";

export class Produit {
    public idProduit:number;
    public titre:string;
    public description:string;
    public imageUrl:string;
    public nature:string;
    public sousCategorie:SousCategorie;
    public prix:number;
    public stock:number;

    constructor(){}

    public set $stock(x:number){
        this.$stock=x;
    }

    public set $prix(x:number){
        this.$prix=x;
    }

    public set $idProduit(x:number){
        this.$idProduit=x;
    }
    public set $titre(x:string){
        this.$titre=x;
    }
    public set $description(x:string){
        this.$description=x;
    }
    public set $imageUrl(x:string){
        this.$imageUrl=x;
    }
    public set $nature(x:string){
        this.$nature=x;
    }
    public set $sousCategorie(x:SousCategorie){
        this.$sousCategorie=x;
    }
}   
