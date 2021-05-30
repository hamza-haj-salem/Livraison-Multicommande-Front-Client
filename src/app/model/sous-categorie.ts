import { Categorie } from "./categorie";

export class SousCategorie {
    public id:number;
    public titre:string;
    public categorie:Categorie

    constructor(){}

    public set $id(x:number){
        this.$id=x;
    }
    public set $titre(x:string){
        this.$titre=x;
    }
    public set $categorie(x:Categorie){
        this.$categorie=x;
    }
}
