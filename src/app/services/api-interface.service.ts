import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APiInterfaceService {
  private url: string;
  private data: any;
  private params: any;

  constructor() {
    this.url = "http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php"
    this.data = null;
  }

  private async makeRequest(params: Map<string, string>) {
    let args = ""
		params.forEach( (v, k) => {
			args += v != "" ? `${k}=${encodeURIComponent(v)}&` : `${k}&`;
		});
    args = args.replace(/&$/, "");

    let result = await fetch(`${this.url}?${args}`);
    return await result.json();
  }

  async connection(login: string, passwd: string) {
    let params = new Map()
      .set('connexion', "")
      .set('login', login)
      .set('mdp', passwd);

    const data = await this.makeRequest(params);

    if(data.resultat == "OK") {
      params.delete("connexion");
      this.params = params;
      await this.refreshData();
      return {success: true, error: false};
    }
    else {
      return {success: false, error: data.error}
    }
  }

  async refreshData() {
    const data = await this.makeRequest(this.params);
    
    if(data.erreur) {
      return {data: null, error: data.erreur};
    }
    else {
      this.data = data;
      return  {data: data, error: false};
    }
  }

  getData() {
    return this.data;
  }
}
