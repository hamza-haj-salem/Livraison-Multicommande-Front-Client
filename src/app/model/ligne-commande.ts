import { Produit } from './produit';
import { Commande } from './commande';

export class LigneCommande {
    public idLigneCommande:number;
    public produit:Produit;
    public commande:Commande;
    public quantite:number;
    public prixParQuantite:number;

    constructor(){}

    public set $prixParQuantite(x:number){
        this.$prixParQuantite=x;
    }

    public set $idLigneCommande(x:number){
        this.$idLigneCommande=x;
    }
    public set $produit(x:Produit){
        this.$produit=x;
    }
    public set $commande(x:Commande){
        this.$commande=x;
    }
    public set $quantite(x:number){
        this.$quantite=x;
    }
}
