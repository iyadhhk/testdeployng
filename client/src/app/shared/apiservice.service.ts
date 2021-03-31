import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mosquee } from '../trouvermosqueetunisie/mosquee';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private  BASE_URL = "http://localhost:3000/api/mosquees";
  constructor(private http:HttpClient) { }


  public getMosquees():Observable<Mosquee[]>
  {
    return this.http.get<Mosquee[]>(this.BASE_URL);
  }
  public getMosqueById(id:string)
  {
    return this.http.get<Mosquee>(this.BASE_URL+"/"+id);
  }

  public getQuranecrit()
  {
    return this.http.get("./assets/myjson/quranArFr.json");
  }

  sendService(to: string, association: string, president: string, prenom: string, adresse: string, telephone: string) {
    const body = new FormData();
    body.append('to', to);
    body.append('association', association);
    body.append('president', president);
    body.append('prenom', prenom);
    body.append('adresse', adresse);
    body.append('telephone', telephone);
    return this.http.post(this.BASE_URL+"/sendemail", body);
  }

  addService(
    nomMosquee:string,adresse:string,telephone:string, telephone1:string,email:string, facebook:string, file:File, ouvertureMosquee:string, imamMosquee:string, nomGestionnaire:string,
    sallePriereFemmes:string, mosqueeSallePriere:string, fermetureExeptionnelle:string, siteWeb:string, associationMosquee:string, lat:string,
    lng:string, openingHours:string, municipality:string
   ){
    const body = new FormData();
    body.append('nomMosquee', nomMosquee);
    body.append('adresse', adresse);
    body.append('telephone', telephone);
    body.append('telephone1',telephone1)
    body.append('email', email);
    body.append('facebook', facebook);
    body.append('file', file);
    body.append('ouvertureMosquee', ouvertureMosquee);
    body.append('imamMosquee', imamMosquee);
    body.append('nomGestionnaire', nomGestionnaire);
    body.append('sallePriereFemmes', sallePriereFemmes);
    body.append('mosqueeSallePriere',mosqueeSallePriere)
    body.append('fermetureExeptionnelle',fermetureExeptionnelle)
    body.append('siteWeb',siteWeb)
    body.append('associationMosquee',associationMosquee)
    body.append('lat',lat)
    body.append('lng',lng)
    body.append('openingHours',openingHours)
    body.append('municipality',municipality)

    return this.http.post(this.BASE_URL, body);
   }
}
