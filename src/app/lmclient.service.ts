import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from './model/produit';
@Injectable({
  providedIn: 'root'
})
export class LMClientService {

  constructor(private http: HttpClient,) { }
  //PRODUIT
  getListeProduits() {
    return this.http.get('http://localhost:8080/listeProduits');
  }
  ListProduitByTitreSousCategorie(titreSousCat: string) {
    return this.http.get('http://localhost:8080/listeProduitsByTitreSousCategorie/' + titreSousCat);
  }
  ListProduitByTitre(titreProd: string) {
    return this.http.get('http://localhost:8080/listeProduitsByTitre/' + titreProd);
  }
  ListProduitByPrix(prixMin:number, prixMax: number) {
    return this.http.get('http://localhost:8080/listeProduitsByPrix/' + prixMin +'/'+prixMax);
  }
  ListProduitByNature(natureProd:string) {
    return this.http.get('http://localhost:8080/listeProduitsByNature/' + natureProd);
  }
  addProduit(p: any) {
    return this.http.post('http://localhost:8080/ajouterProduit', p);
  }

  //CATEGORIE
  
  getListeSousCategories() {
    return this.http.get('http://localhost:8080/listeSousCategorie');
  }
  

  //CLIENT
  findClientByEmail(emailClient: string) {
    return this.http.get('http://localhost:8080/findClientByEmail/' + emailClient);
  }
  verifierCordonneesClient(client: any) {
    return this.http.get('http://localhost:8080/verifierCordonneesClient', client);
  }
  ajouterClient(client: any) {
    return this.http.post('http://localhost:8080/ajouterClient', client);
  }

  //COMMANDE

  ajouterCommande(c: any) {
    return this.http.post('http://localhost:8080/ajouterCommande/', c);
  }
  modifierCommande(c: any) {
    return this.http.post('http://localhost:8080/modifierCommande', c);
  }


 
 
  

  

  getCommandeByClient(idCl: number) {
    return this.http.get('http://localhost:8080/getCommandeByClient/' + idCl);

  }

  //LIGNE COMMANDE
  getLigneCommandeById(idLigneCommande: number) {
    return this.http.get('http://localhost:8080/getLigneCommandeById/' + idLigneCommande);
  }
  ajouterQuantiteLigneCommande(c: any) {
    return this.http.post('http://localhost:8080/ajouterQuantiteLigneCommande', c);
  }
  retirerQuantiteLigneCommande(l: any) {
    return this.http.post('http://localhost:8080/retirerQuantiteLigneCommande', l);
  }
  supprimerLigneCommande(l: any){
    return this.http.delete('http://localhost:8080/supprimerLigneCommande', l);
  }
  

  //COMMENTER
  ajouterCommenter(cp: any) {
    return this.http.post('http://localhost:8080/ajouterCommenter', cp);
  }
  listeCommentaireProduit(idProduit: number) {
    return this.http.get('http://localhost:8080/listeCommentaireProduit/' + idProduit);
  }
  //MESSAGE
  listeAdminstrateur(){
    return this.http.get('http://localhost:8080/listeAdminstrateur' );
  }
  getListMessageEnvByUtilisateur(id:number,idUEnCours:number) {
    return this.http.get('http://localhost:8080/listeMessageByUtilisateur/'+id+'/'+idUEnCours);
  }
  ajouterMessage(m:any){
    return this.http.post('http://localhost:8080/ajouterMessage',m);
  }
  //FAVORIS
  ajouterFavoris(idClient:number,produit:any) {
    return this.http.post('http://localhost:8080/ajouterFavoris/'+ idClient,produit);
  }
  //UTILISATEUR
  getUtilisateurById(id:number) {
    return this.http.get('http://localhost:8080/UtilisateurById/'+id);
  }
}
