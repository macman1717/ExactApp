import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class EditContentService {
  environment = environment;
  constructor(private http: HttpClient) {
  }

  updatePageHTML(content: HTMLElement | null, webpage : string) {
    return this.http.put(
      `${environment.apiURL}/api/editContent/${webpage}`,content);
  }

  addPageHTML(content: HTMLElement | null, webpage: string, section: number) {
    var html = content?.innerHTML;
    var webpageContent = { webpage : webpage ,html : content?.innerHTML, section : section};

    var leftIndex = webpageContent.html?.indexOf("<button");
    var rightIndex = webpageContent.html?.indexOf("/button>");
    if (leftIndex != null) {
      if (rightIndex != null) {
        webpageContent.html = webpageContent.html?.substring(rightIndex + 8);
      }
    }

    return this.http.post(
      `${environment.apiURL}/api/editContent/${webpage}/${section}`,webpageContent).subscribe();
  }

  getPageContent(webpage: String, sectionNum: number) {
    return this.http.get(
      `${environment.apiURL}/api/editContent/getPageContent/${webpage}/${sectionNum}`
    );
  }
}
