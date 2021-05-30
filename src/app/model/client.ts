export class Client {
    public id:number;
    public nom:string;
    public prenom:string;
    public email:string;
    public motDePasse:string;
    public libelle:string;
    public adresse:string;
    public image_id:string;
    
    constructor(){}

    public set $id(x:number){
        this.$id=x;
    }
    public set $nom(x:string){
        this.$nom=x;
    }
    public set $prenom(x:string){
        this.$prenom=x;
    }
    public set $email(x:string){
        this.$email=x;
    }
    public set $motDePasse(x:string){
        this.$motDePasse=x;
    }
    public set $libelle(x:string){
        this.$libelle=x;
    }
    public set $adresse(x:string){
        this.$adresse=x;
    }
    public set $image_id(x:string){
        this.$image_id=x;
    }
}
